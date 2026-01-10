import FactsheetClient from "@/components/Factsheet/FactsheetClient";

export async function generateMetadata({ params }) {
  const { region } = params;
  const regionName = region
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${regionName} Factsheet | Travel Guide | Bayard Vacations`,
    description: `Complete travel factsheet for ${regionName}. Find essential information, travel tips, climate, currency, visa requirements, and more.`,
  };
}

export default function FactsheetPage({ params }) {
  const { region } = params;

  return <FactsheetClient regionSlug={region} />;
}
