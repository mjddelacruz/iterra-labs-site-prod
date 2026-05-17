import type { Metadata } from 'next';
import { Outfit, DM_Sans } from 'next/font/google';
import JsonLd from './components/JsonLd';
import { siteConfig } from '@/lib/site';
import { socialMeta } from '@/lib/social';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  icons: {
    icon: '/iterra_labs_icon%20only.png',
    apple: '/iterra_labs_icon%20only.png',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: socialMeta.url,
    siteName: socialMeta.siteName,
    title: socialMeta.title,
    description: socialMeta.description,
    images: [
      {
        url: socialMeta.image,
        secureUrl: socialMeta.image,
        width: socialMeta.imageWidth,
        height: socialMeta.imageHeight,
        type: 'image/png',
        alt: socialMeta.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: socialMeta.title,
    description: socialMeta.description,
    images: [socialMeta.image],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className={`${outfit.variable} ${dmSans.variable}`}>
      <body>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
