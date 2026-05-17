import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

/** Meta / Facebook link-preview crawlers (Messenger, Facebook, Instagram). */
const META_CRAWLERS = ['facebookexternalhit', 'Facebot', 'meta-externalagent'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: META_CRAWLERS,
        allow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
