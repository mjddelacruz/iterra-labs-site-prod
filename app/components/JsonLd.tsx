import { siteConfig } from '@/lib/site';

export default function JsonLd() {
  const { url, name, description, contactEmail } = siteConfig;

  const graph = [
    {
      '@type': 'Organization',
      '@id': `${url}/#organization`,
      name,
      url,
      logo: `${url}/iterra_labs_icon%20only.png`,
      description,
      email: contactEmail,
      areaServed: [
        { '@type': 'Country', name: 'Australia' },
        { '@type': 'Place', name: 'Worldwide' },
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${url}/#service`,
      name: `${name} — Boutique AI & Cloud Solutions`,
      url,
      description,
      provider: { '@id': `${url}/#organization` },
      serviceType: [
        'AI consulting',
        'Machine learning engineering',
        'Cloud architecture',
        'Cloud infrastructure',
        'Product engineering',
      ],
      areaServed: [
        { '@type': 'Country', name: 'Australia' },
        { '@type': 'Place', name: 'Worldwide' },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${url}/#website`,
      name,
      url,
      description,
      publisher: { '@id': `${url}/#organization` },
      inLanguage: 'en-AU',
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }}
    />
  );
}
