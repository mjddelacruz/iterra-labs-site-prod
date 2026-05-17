/** Canonical production URL — www.iterralabs.com (.com.au redirects here). */
export const siteConfig = {
  name: 'Iterra Labs',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.iterralabs.com',
  title: 'Iterra Labs | Boutique AI & Cloud Solutions',
  description:
    'Boutique AI and cloud engineering studio in Australia. We design and ship production AI systems, LLM features, and cloud infrastructure for ambitious startups and scale-ups worldwide.',
  keywords: [
    'AI consulting',
    'cloud consulting',
    'boutique AI studio',
    'cloud solutions provider',
    'LLM integration',
    'AI engineering Australia',
    'cloud architecture',
    'AWS GCP Azure',
  ],
  locale: 'en_AU',
  contactEmail: 'hello@iterralabs.com',
} as const;

export const AU_REDIRECT_HOSTS = new Set([
  'iterralabs.com.au',
  'www.iterralabs.com.au',
]);

export const CANONICAL_HOST = 'www.iterralabs.com';
