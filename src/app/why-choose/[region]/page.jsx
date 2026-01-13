import WhyChooseRegionClient from "@/components/WhyChoose/WhyChooseRegionClient";

export async function generateMetadata({ params }) {
  const { region } = await params;
  const regionName = region
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `Why Choose ${regionName} | Bayard Vacations`,
    description: `Discover why ${regionName} should be your next travel destination. Explore highlights, attractions, and travel tips for an unforgettable experience.`,
  };
}

export default async function WhyChooseRegionPage({ params }) {
  const { region } = await params;

  return <WhyChooseRegionClient regionSlug={region} />;
}
