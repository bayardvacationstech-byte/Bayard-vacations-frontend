import { getItineraryById } from '@/data/dummy-itinerary-data';
import ShareableItineraryClient from '@/components/ShareItinerary/ShareableItineraryClient';

// Generate metadata for SEO and social sharing
export async function generateMetadata({ params }) {
  const { id } = await params;
  const itineraryData = getItineraryById(id);
  
  if (!itineraryData) {
    return {
      title: 'Itinerary Not Found | Bayard Vacations',
      description: 'The requested itinerary could not be found.'
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const shareUrl = `/share/itinerary/${id}`;
  const heroImage = itineraryData.heroImage || '/img/bali-hero.png';

  return {
    metadataBase: new URL(siteUrl),
    title: `${itineraryData.packageName} - Travel Itinerary | Bayard Vacations`,
    description: `Check out this 7-day ${itineraryData.destination} itinerary. Includes ${itineraryData.hotelDetails.name}, adventures, and more.`,
    keywords: [
      itineraryData.destination,
      itineraryData.region,
      'travel itinerary',
      'vacation package',
      'Bayard Vacations',
      itineraryData.packageName
    ],
    authors: [{ name: 'Bayard Vacations' }],
    openGraph: {
      title: itineraryData.packageName,
      description: `Your 7-Day dream trip to ${itineraryData.destination}. View full itinerary details, hotels, and inclusions.`,
      url: shareUrl,
      siteName: 'Bayard Vacations',
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 630,
          alt: itineraryData.packageName,
        }
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: itineraryData.packageName,
      description: `View this custom itinerary for ${itineraryData.destination} by Bayard Vacations.`,
      images: [heroImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ShareItineraryPage({ params }) {
  const { id } = await params;
  const itineraryData = getItineraryById(id);

  return <ShareableItineraryClient itineraryData={itineraryData} />;
}
