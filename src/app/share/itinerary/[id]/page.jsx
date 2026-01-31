import { getItineraryById } from '@/data/dummy-itinerary-data';
import ShareableItineraryClient from '@/components/ShareItinerary/ShareableItineraryClient';
import { DEFAULT_URL } from '@/config';
import { headers } from 'next/headers';

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

  // Detect host dynamically to ensure metadata matches the environment (prelive vs production)
  const headersList = headers();
  const host = headersList.get('host') || 'bayardvacations.com';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const siteUrl = `${protocol}://${host}`;
  const shareUrl = `/share/itinerary/${id}`;
  
  // Use a high-quality absolute image URL
  const ogImage = 'https://images.unsplash.com/photo-1542332213-9b5a5a3faa35?w=1200&h=630&fit=crop&q=80';

  return {
    metadataBase: new URL(siteUrl),
    title: `✈️ My Trip to ${itineraryData.destination} | ${itineraryData.packageName}`,
    description: `Check out our ${itineraryData.duration} journey to ${itineraryData.destination}. View daily activities, hotels, and expert-curated highlights.`,
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
      title: `✈️ My Trip to ${itineraryData.destination}: ${itineraryData.packageName}`,
      description: `View the full itinerary for this journey to ${itineraryData.destination}. Discover our handpicked hotels, daily activities, and exclusive inclusions.`,
      url: shareUrl,
      siteName: 'Bayard Vacations',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Travel Itinerary for ${itineraryData.destination}`,
          type: 'image/jpeg',
        }
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Experience ${itineraryData.destination} with Bayard Vacations`,
      description: `Check out this custom-built itinerary for ${itineraryData.destination}. Handpicked experiences and seamless travel at your fingertips.`,
      images: [ogImage],
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
