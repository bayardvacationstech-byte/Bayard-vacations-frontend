import categoryData from "@/data/categoryData";
import ThemePageClient from "@/components/Themes/ThemePageClient";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const theme = categoryData.find(c => c.slug === "exploration-bundle");
  if (!theme) return {};
  return {
    title: `${theme.title} | Bayard Vacations`,
    description: `Explore our specialized ${theme.title.toLowerCase()} packages. ${theme.subtitle}`,
  };
}

export default function ExplorationBundlePage() {
  const theme = categoryData.find(c => c.slug === "exploration-bundle");
  if (!theme) notFound();
  return <ThemePageClient theme={theme} />;
}
