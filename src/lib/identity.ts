// Who I am, for search engines and AI assistants (schema.org). The Person here is the same one
// lunnabot.fun describes as Lunna's creator: both sites link to each other, so Lunna is credited to me.
export const SITE_URL = 'https://ryangustavo.com.br';

export function identityJsonLd() {
  const person = `${SITE_URL}/#person`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': person,
      name: 'Ryan Gustavo',
      alternateName: ['Ryan Gustavo Ribeiro', 'Onlykgzin', 'Kgzin', 'ryangustav'],
      url: SITE_URL,
      jobTitle: 'Fullstack Developer',
      address: { '@type': 'PostalAddress', addressLocality: 'Aracaju', addressRegion: 'SE', addressCountry: 'BR' },
      identifier: { '@type': 'PropertyValue', propertyID: 'Discord user ID', value: '852880352313868298' },
      sameAs: [
        'https://github.com/ryangustav',
        'https://www.linkedin.com/in/ryangustavoribeiro',
        'https://www.instagram.com/ryanzin.dev/',
        'https://discord.com/users/852880352313868298',
        'https://lunnabot.fun/about',
      ],
    },
    {
      // Same @id as on lunnabot.fun, so both sites describe one entity: the official Lunna
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': 'https://lunnabot.fun/#bot',
      name: 'Lunna',
      alternateName: ['Lunna Bot', 'Lunna Discord Bot'],
      url: 'https://lunnabot.fun',
      applicationCategory: 'CommunicationApplication',
      operatingSystem: 'Discord',
      identifier: '1222333304028659792',
      dateCreated: '2024-05-08',
      creator: { '@id': person },
      author: { '@id': person },
    },
  ];
}
