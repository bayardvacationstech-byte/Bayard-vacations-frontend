import FactsheetClient from "@/components/Factsheet/FactsheetClient";

export async function generateMetadata({ params }) {
  const { region } = await params;
  const regionName = region
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${regionName} Factsheet | Travel Guide | Bayard Vacations`,
    description: `Complete travel factsheet for ${regionName}. Find essential information, travel tips, climate, currency, visa requirements, and more.`,
  };
}

export default async function FactsheetPage({ params }) {
  const { region } = await params;

  return <FactsheetClient regionSlug={region} />;
}
