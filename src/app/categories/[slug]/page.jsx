import CategoryPageClient from "@/components/Categories/CategoryPageClient";
import categoryData from "@/data/categoryData";
import { notFound } from "next/navigation";

// Enable static export by disabling dynamic params
export const dynamicParams = false;

// Normalize slug by converting underscores to hyphens
const normalizeSlug = (slug) => slug.replace(/_/g, "-");

// Generate static params for all categories
export async function generateStaticParams() {
  return categoryData
    .filter((category) => !category.slug.includes("?")) // Exclude group-adventures with query params
    .map((category) => ({
      slug: category.slug,
    }));
}

// Generate metadata for each category
export async function generateMetadata({ params }) {
  const rawSlug = (await params).slug;
  const normalizedSlug = normalizeSlug(rawSlug);
  
  const category = categoryData.find((cat) => cat.slug === normalizedSlug);

  if (!category) {
    return {
      title: "Category Not Found | Bayard Vacations",
      description: "The requested category could not be found.",
    };
  }

  return {
    title: `${category.title} | Bayard Vacations`,
    description: `Explore our ${category.title.toLowerCase()} packages. ${category.subtitle}`,
    keywords: `${category.title}, vacation packages, travel deals, ${category.slug}`,
    openGraph: {
      title: `${category.title} | Bayard Vacations`,
      description: `Explore our ${category.title.toLowerCase()} packages. ${category.subtitle}`,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }) {
  const rawSlug = (await params).slug;
  const normalizedSlug = normalizeSlug(rawSlug);
  
  const category = categoryData.find((cat) => cat.slug === normalizedSlug);

  if (!category) {
    notFound();
  }

  return <CategoryPageClient category={category} />;
}
