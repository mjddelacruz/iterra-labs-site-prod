import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

/** Meta link-preview crawlers — one rule block per agent (Facebook debugger format). */
const META_CRAWLERS = [
  'facebookexternalhit',
  'Facebot',
  'meta-externalfetcher',
  'meta-externalagent',
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...META_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
      })),
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
