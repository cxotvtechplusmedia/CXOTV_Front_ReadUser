import './(main)/globals.css';
import './(custom)/index.css'; // Add custom CSS
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cxotv.techplusmedia.com'),
  title: 'CXO TV : CIO 2026 Strategy on AI, Cloud, Cybersecurity & Digital Transformation',
  icons: {
    icon: '/favicon.ico',
  },
  description:
    'CXO TV is the global platform for CIOs, CTOs, and CISOs. Watch thought-leader interviews, industry news, cloud, AI, security insights, and enterprise tech trends shaping digital transformation.',
  openGraph: {
    title: 'CXO TV : CIO 2026 Strategy on AI, Cloud, Cybersecurity & Digital Transformation',
    description:
      'CXO TV is the global platform for CIOs, CTOs, and CISOs. Watch thought-leader interviews, industry news, cloud, AI, security insights, and enterprise tech trends shaping digital transformation.',
    siteName: 'CXO TV',
    type: 'website',
    url: 'https://cxotv.techplusmedia.com/',
  },
  twitter: {
    title: 'CXO TV : CIO 2026 Strategy on AI, Cloud, Cybersecurity & Digital Transformation',
    description:
      'CXO TV is the global platform for CIOs, CTOs, and CISOs. Watch thought-leader interviews, industry news, cloud, AI, security insights, and enterprise tech trends shaping digital transformation.',
    card: 'summary_large_image',
    site: '@cxotv',
    creator: '@cxotv',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="RhPGUy0uVfDi9DMhUfHcc5th5r9f3SKiqn6Vm76jj6U" />
        <meta name="application-name" content="CXO TV | Techplus Media" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <Script id="schema-website" type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            'name': 'CXO TV | Techplus Media',
            'alternateName': 'Techplus Media',
            'url': 'https://cxotv.techplusmedia.com/',
            'description':
              'CXO TV is the global platform for CIOs, CTOs, and CISOs. Watch thought-leader interviews, industry news, cloud, AI, security insights, and enterprise tech trends shaping digital transformation.'
          })}
        </Script>
        <Script id="schema-organization" type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': 'CXO TV',
            'alternateName': 'Techplus Media',
            'url': 'https://cxotv.techplusmedia.com/',
            'logo': 'https://postimg.cc/Mc4LGZp7',
            'sameAs': [
              'https://www.facebook.com/cxotvnews',
              'https://x.com/cxotvnews',
              'https://www.instagram.com/cxotv_news/',
              'https://www.youtube.com/channel/UCNSQbKNLmJBhCBCIR0ZqqPA',
              'https://www.linkedin.com/company/cxotvnews/',
              'https://cxotv.techplusmedia.com/'
            ]
          })}
        </Script>
        <Script src="https://news.google.com/swg/js/v1/swg-basic.js" strategy="afterInteractive" />
        <Script id="swg-basic-init" strategy="afterInteractive">
          {`
            (self.SWG_BASIC = self.SWG_BASIC || []).push(basicSubscriptions => {
              basicSubscriptions.init({
                type: "NewsArticle",
                isPartOfType: ["Product"],
                isPartOfProductId: "CAow-rC9DA:openaccess",
                clientOptions: { theme: "light", lang: "en" },
              });
            });
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
