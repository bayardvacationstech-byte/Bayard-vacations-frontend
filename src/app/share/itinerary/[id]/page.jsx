import { getItineraryById } from '@/data/dummy-itinerary-data';
import ShareableItineraryClient from '@/components/ShareItinerary/ShareableItineraryClient';
import { DEFAULT_URL } from '@/config';

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

  // Use the correctly configured DEFAULT_URL from config
  const siteUrl = DEFAULT_URL;
  const shareUrl = `/share/itinerary/${id}`;
  
  // Use a reliable high-quality absolute image URL for OG preview
  const ogImage = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=630&fit=crop&q=80';

  return {
    metadataBase: new URL(siteUrl),
    title: `${itineraryData.packageName} - Your Travel Itinerary | Bayard Vacations`,
    description: `Check out this ${itineraryData.duration} ${itineraryData.destination} itinerary. Includes ${itineraryData.hotelDetails?.[0]?.name || 'handpicked hotels'}, adventures, and expert-curated inclusions.`,
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
          alt: `${itineraryData.packageName} in ${itineraryData.destination}`,
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
