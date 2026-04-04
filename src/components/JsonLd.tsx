export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Auto-Sell.ai',
    url: 'https://auto-sell.ai',
    logo: 'https://auto-sell.ai/brand-guideline/autosell-logo/PNG/1 (1).png',
    description:
      "Australia's #1 AI-powered car buying service. Get free quotes in 30 minutes, same-day OSKO payment, and free Australia-wide pickup.",
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+61-492 858 699',
      contactType: 'customer service',
      areaServed: 'AU',
      availableLanguage: 'English',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AU',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FAQPageJsonLd({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessJsonLd({ city }: { city: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Auto-Sell.ai - ${city}`,
    url: `https://auto-sell.ai/sell-my-car-${city.toLowerCase().replace(/\s+/g, '-')}`,
    telephone: '+61-492 858 699',
    description: `Sell your car fast in ${city} with Auto-Sell.ai. Free 30-minute quotes, same-day OSKO payment, and free pickup across ${city}.`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressCountry: 'AU',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
      ],
      opens: '08:00',
      closes: '18:00',
    },
    parentOrganization: {
      '@type': 'Organization',
      name: 'Auto-Sell.ai',
      url: 'https://auto-sell.ai',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
