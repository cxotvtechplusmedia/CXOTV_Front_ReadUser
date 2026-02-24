// middleware.js
import { NextResponse } from 'next/server';

// Existing layout mapping kept as-is
const LAYOUT_MAPPING = {
    technology: 'm',
    business: 'c',
    science: 'm',
    finance: 'c',
    'emea-talks-with-kalpana': 'm',
    'emea-marketing-monday': 'm',
    'trending-news': 'm',
    'talks-with-kalpana': 'm',
    interviews: 'm',
    'marketing-mondays': 'm',
    'apac-talks-with-kalpana': 'm',
    'cxo-talk': 'm',
    'apac-marketing-monday': 'm',
    'ceo-talk': 'm',
    trending: 'm',
    'cfo-playbook': 'm',
    'tech-thursday': 'm',
    'tech-priorities': 'm',
    'cyber-security': 'm',
    policy: 'm',
    mobility: 'm',
    'cloud-computing': 'm',
    innovation: 'm',
    feature: 'h',
    'health-business': 'h',
    // 'medical-technology': 'h',
    'health-interviews': 'h',
    'health-news': 'h',
    'health-webinars': 'h',
    pharma: 'h',
    diagnostic: 'h',
    'education-cxo-talk': 'e',
    'education-news': 'e',
    'digital-learning': 'e',
    'education-policy': 'e',
    'education-interview': 'e',
    'education-feature': 'e',
    'skill-development': 'e',
    'steam-career-education': 'e',
    'm-learning': 'e',
    manufacturing: 'm',
    'retail-ecommerce': 'm',
    telecommunication: 'm',
    'energy-utility': 'm',
    'transportation-logistics': 'm',
    'government-public-sector': 'm',
    'defense-aviation': 'm',
    'media-entertainment': 'm',
    'data-centre': 'm',
    rpa: 'm',
    'ar-vr': 'm',
    blockchain: 'm',
    data: 'm',
    'edge-computing': 'm',
    'quantum-computing': 'm',
    npl: 'm',
    developers: 'm',
    cyberwatch: 'm',
    "what's-popular": 'm',
    "editor's-choice": 'm',
    'search-definition': 'm',
    'budget-stories': 'm',
    'daily-news-capsule': 'm',
    'cxo-connect': 'm',
    'cio-agenda': 'm',
    'cxo-agenda': 'm',
    archive: 'm',
    'tech-connect': 'm',
    'm-health': 'h',
    'business-impact': 'm',
    'case-study': 'm',
};

// The categories you asked to treat like APAC
const SPECIAL_CATEGORIES = [
    'APAC',
    'BFSI',
    'Budget 2023',
    'Budget 2024',
    'Business Impact',
    'By CXO TV News',
    'CEO Talk',
    'CFO Playbook',
    'CIO Agenda',
    'CIO Agenda 2023',
    'CXO AGENDA SERIES',
    'CXO Alpha Woman',
    'CXO Connect',
    'CXO Tech Dialogue Series',
    'Case Study',
    'Chat Series',
    'Co-Creation Series',
    'Co-Solution Series',
    'Cyberwatch',
    'Daily News Capsule',
    'Definition',
    'Developers',
    'EMEA',
    'Education Technology',
    'Entrepreneur',
    'Health Technology',
    'INDIA',
    'INDUSTRY',
    'IT Agenda 2020',
    'Innovation',
    'Insights',
    'Interviews',
    'Interviews Paid',
    'Marketing Mondays',
    'Playbook',
    'Search Definition',
    'Start Up Pitches',
    'Talks with Kalpana',
    'Tech Priorities',
    'Tech Thursday',
    'Tech Titans',
    'Tech connect',
    'Technology',
    'Trending News',
    'USA',
    'Uncategorized',
    'VIDEOS',
    'WEBINAR COVID19',
    'Webinars',
    'budget 2022',
    "editor's choice",
    'm health',
    "what's popular",

];

// Helper: normalize category name -> slug (lowercase, spaces/special -> hyphen)
function slugifyCategory(name) {
    if (!name || typeof name !== 'string') return '';
    return name
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/['"]/g, '')               // remove quotes
        .replace(/[^a-z0-9]+/g, '-')        // non-alnum -> hyphen
        .replace(/^-+|-+$/g, '');           // trim leading/trailing hyphens
}

export async function middleware(request) {
    try {
        const { pathname, origin } = request.nextUrl;

        // Skip middleware for special paths / assets / API / files
        if (
            pathname.startsWith('/_next') ||
            pathname.startsWith('/api') ||
            pathname.startsWith('/static') ||
            pathname.includes('.') || // files with extensions
            pathname === '/' // homepage
        ) {
            return NextResponse.next();
        }

        // Normalize: if any uppercase exists in path, redirect to lowercase (SEO)
        if (pathname !== pathname.toLowerCase()) {
            const lowercaseUrl = new URL(`${origin}${pathname.toLowerCase()}`);
            return NextResponse.redirect(lowercaseUrl, 301);
        }

        const pathSegments = pathname.split('/').filter(Boolean);

        // --- IMPORTANT CHANGE: run layout mapping first ---
        // If the first path segment maps to a layout, rewrite immediately (preserve previous behaviour).
        if (pathSegments.length > 0) {
            const first = pathSegments[0];
            if (LAYOUT_MAPPING[first]) {
                const newUrl = new URL(`/${LAYOUT_MAPPING[first]}/${pathSegments.join('/')}`, request.url);
                return NextResponse.rewrite(newUrl);
            }
        }
        // --- end mapping-first logic ---

        // Continue: If path looks like /<something>/<slug-like>, try to resolve via API
        if (pathSegments.length >= 2) {
            const maybeSlug = pathSegments[pathSegments.length - 1];

            if (maybeSlug.includes('-')) {
                const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://apicxotv.techplusmedia.com';
                const apiUrl = `${apiBase}/api/news?populate=*&filters[slug][$eq]=${encodeURIComponent(maybeSlug)}`;

                try {
                    const res = await fetch(apiUrl, { next: { revalidate: 60 } });
                    if (res && res.ok) {
                        const json = await res.json();
                        const item = json?.data?.[0]?.attributes;
                        if (item) {
                            // 1) If canonicalPath exists, prefer it (keeps your canonical logic)
                            const canonicalFromApi = item.canonicalPath;
                            if (canonicalFromApi) {
                                if (pathname !== canonicalFromApi) {
                                    const redirectUrl = new URL(origin);
                                    redirectUrl.pathname = canonicalFromApi;
                                    return NextResponse.redirect(redirectUrl.toString(), 308);
                                }
                                return NextResponse.next();
                            }

                            // 2) Inspect categories and pick first matching special category (case-insensitive)
                            const categories = item?.categories?.data || [];
                            const specialSet = new Set(SPECIAL_CATEGORIES.map((s) => String(s).trim().toLowerCase()));

                            let matchedCategoryName = null;
                            for (const c of categories) {
                                const catName = c?.attributes?.name;
                                if (!catName) continue;
                                if (specialSet.has(String(catName).trim().toLowerCase())) {
                                    matchedCategoryName = String(catName).trim();
                                    break;
                                }
                            }

                            // 3) If no matching category found, check subcategories and use the first subcategory's name
                            const subcategories = item?.subcategories?.data || [];
                            let firstSubcategoryName = null;
                            if (!matchedCategoryName && subcategories.length > 0) {
                                const subAttrName = subcategories[0]?.attributes?.name;
                                if (subAttrName) {
                                    firstSubcategoryName = String(subAttrName).trim();
                                }
                            }

                            // 4) If neither category nor subcategory found -> do NOT add a category to URL.
                            if (!matchedCategoryName && !firstSubcategoryName) {
                                // No category/subcategory available: continue without altering path.
                                return NextResponse.next();
                            }

                            // 5) Otherwise use matched category OR first subcategory to build the slug
                            const finalCategorySlug = matchedCategoryName
                                ? slugifyCategory(matchedCategoryName)
                                : slugifyCategory(firstSubcategoryName);

                            const target = `/${finalCategorySlug}/${maybeSlug}`;

                            if (pathname !== target) {
                                const redirectUrl = new URL(origin);
                                redirectUrl.pathname = target;
                                return NextResponse.redirect(redirectUrl.toString(), 308);
                            }

                            return NextResponse.next();
                        }
                    }
                } catch (err) {
                    // API fetch failed: fail open and continue
                }
            }
        }
    } catch (e) {
        // Fail open
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next|api|static|favicon.ico|images).*)'],
};
