// components/categories/index.tsx
import { Suspense } from "react";
import Categories from "./Categories";
import { CategorySkeleton } from "@/components/Categories/CategorySkeleton";

const categories = [
  {
    id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Romantic Getaways",
    titleColor: "#E30022",
    subTitle: "All things love",
    image: "/media/category_cards/romantic.png",
    icon: "/media/icons/romantic_icon.png",
    slug: "romantic-getaways",
  },
  {
    id: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Group Adventures",
    titleColor: "#348901",
    subTitle: "All things fun",
    image: "/media/category_cards/adventure.png",
    icon: "/media/icons/adventure_icon.png",
    slug: "group-adventures",
  },
  {
    id: "3",
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Relax & Rejuvenate",
    titleColor: "#39BEEE",
    subTitle: "All things Leisure",
    image: "/media/category_cards/relax.png",
    icon: "/media/icons/relax_icon.png",
    slug: "relax-rejuvenate",
  },
  {
    id: "4",
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Religious Retreat",
    titleColor: "#DDAD10",
    subTitle: "All things Spiritual",
    image: "/media/category_cards/religious.png",
    icon: "/media/icons/religious_icon.png",
    slug: "religious-retreat",
  },
];

export default function CategoriesSection() {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <Categories categories={categories} />
    </Suspense>
  );
}

// Export component and types for flexibility
export { Categories }; // Re-export the default export
export { categories }; // Re-export data
