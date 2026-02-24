
import { Inter } from 'next/font/google';
import './globals.css';
import ContentWrapper from "./components/ContentWrapper";
import GoToTop from './components/GoToTop';
import PerformanceMonitor from './components/PerformanceMonitor';
import Script from 'next/script';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CXO TV | Techplus Media',
  icons: {
    icon: '/favicon.ico',
  },
  description: 'The Voice of CXOs Worldwide',
  keywords: 'recent tech news, tech articles, tech magazines, tech news today, technology articles, ai news, innovation ideas, science and technology, technology newsletter, trending tech news',
  authors: [{ name: 'CXO TV' }],
  openGraph: {
    title: 'CXO TV | Techplus Media',
    site_name: 'CXO TV | Techplus Media',
    type: 'website',
    url: 'https://cxotv.techplusmedia.com/',
  },
  twitter: {
    title: 'CXO TV | Techplus Media'
  }
};

export default function MainLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="application-name" content="CXO TV | Techplus Media" />
      </head>
      <body className={inter.className}>
        <Script id="schema-website" type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            'name': 'CXO TV | Techplus Media',
            'alternateName': 'Techplus Media',
            'url': 'https://cxotv.techplusmedia.com/'
          })}
        </Script>
        <ContentWrapper>
          <main>
            {children}
          </main>
        </ContentWrapper>
        <GoToTop />
        <PerformanceMonitor />
      </body>
    </html>
  );
}
