import ActivitiesListingClient from "@/components/Activities/ActivitiesListingClient";

export async function generateMetadata({ params }) {
  const { region } = params;
  const regionName = region
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `Activities in ${regionName} | Bayard Vacations`,
    description: `Discover exciting activities and experiences in ${regionName}. From adventure sports to cultural tours, find the perfect activity for your trip.`,
  };
}

export default function ActivitiesListingPage({ params }) {
  const { region } = params;

  return <ActivitiesListingClient regionSlug={region} />;
}
