import ActivitiesListingClient from "@/components/Activities/ActivitiesListingClient";

export const metadata = {
  title: "Explore Activities | Bayard Vacations",
  description: "Discover exciting activities and experiences across all our destinations. From adventure sports to cultural tours, find the perfect activity for your trip.",
};

export default function GlobalActivitiesPage() {
  // Default to showing all activities without a specific region slug
  return <ActivitiesListingClient regionSlug="" />;
}
