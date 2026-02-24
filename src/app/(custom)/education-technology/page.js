import Education from "./Education";

export const metadata = {
    title: "Education Technology News & EdTech Trends | CXOTV",
    description:
        "EdTech innovations, digital learning trends, and technology insights shaping modern education.",
    keywords:
        "education technology, EdTech news, digital learning",

    alternates: {
        canonical: "https://cxotv.techplusmedia.com/education-technology",
    },

    openGraph: {
        title: "Education Technology News & EdTech Trends | CXOTV",
        description:
            "EdTech innovations, digital learning trends, and technology insights shaping modern education.",
        url: "https://cxotv.techplusmedia.com/education-technology",
        siteName: "CXOTV",
        type: "website",
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function Page() {
    return (
        <>
            {/* ✅ Required H1 for SEO (hidden but crawlable) */}
            <h1 className="sr-only">
                Education Technology News & EdTech Trends
            </h1>

            <Education />
        </>
    );
}
