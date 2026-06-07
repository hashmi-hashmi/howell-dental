import './globals.css';

export const metadata = {
  title: 'Howell Dental Group | Family Dentist Milwaukee, WI',
  description: 'Award-winning family dental care in Southeast Milwaukee. Accepting new patients. Book your appointment today — 414-744-3333.',
  keywords: 'dentist Milwaukee, family dentist Milwaukee, emergency dentist Milwaukee, cosmetic dentist Milwaukee, pediatric dentist Milwaukee',
  openGraph: {
    title: 'Howell Dental Group | Family Dentist Milwaukee',
    description: 'Trusted family dental care in SE Milwaukee. Accepting new patients of all ages.',
    url: 'https://www.howelldentalgroup.com',
    siteName: 'Howell Dental Group',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dentist",
          "name": "Howell Dental Group",
          "url": "https://www.howelldentalgroup.com",
          "telephone": "+1-414-744-3333",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "3814 South Howell Avenue",
            "addressLocality": "Milwaukee",
            "addressRegion": "WI",
            "postalCode": "53207",
            "addressCountry": "US"
          },
          "openingHoursSpecification": [
            { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Thursday"], "opens": "08:00", "closes": "17:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "08:00", "closes": "14:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "08:00", "closes": "13:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:00", "closes": "12:00" }
          ],
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "214" }
        })}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
