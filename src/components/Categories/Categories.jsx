// components/categories/Categories.tsx
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { CategoryCard } from "./CategoryCard";
import { CategorySkeleton } from "@/components/Categories/CategorySkeleton";
import Container from "../ui/Container";

const categories = [
  {
    id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Romantic Getaways",
    titleColor: "#E30022",
    subTitle: "All things love",
    image: "/img/category-img/romantic-getaways.png",
    icon: "/media/icons/romantic_icon.png",
    href: "/themes/romantic-getaways",
  },
  {
    id: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Group Adventures",
    titleColor: "#348901",
    subTitle: "All things fun",
    image: "/img/category-img/group-adventures.png",
    icon: "/media/icons/adventure_icon.png",
    href: "/group-departure",
  },
  {
    id: "3",
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Relax & Rejuvenate",
    titleColor: "#39BEEE",
    subTitle: "All things Leisure",
    image: "/img/category-img/relax-and-rejuvanate.png",
    icon: "/media/icons/relax_icon.png",
    href: "/themes/relax-rejuvenate",
  },
  {
    id: "4",
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Religious Retreat",
    titleColor: "#DDAD10",
    subTitle: "All things Spiritual",
    image: "/img/category-img/religious-retreat.png",
    icon: "/media/icons/religious_icon.png",
    href: "/themes/religious-retreat",
  },
];

export default function Categories() {
  return (
    <Container>
      {/* Header section */}
      <div className="section-header-margin flex items-center justify-between">
        <h2 className="font-nord text-4xl font-black text-brand-blue">
          <span className="font-black">Themed Escapes </span>{" "}
          <span className="font-light text-[#798290]">Based Exploration</span>
        </h2>
        <Link
          href="/categories"
          className="hidden items-center gap-2 rounded-full bg-brand-green px-4 py-3 text-lg text-white transition-all duration-300 hover:scale-105 lg:inline-flex"
        >
          <span>Explore All</span>
          <Image
            src="/media/icons/explore_icon.png"
            alt="Explore"
            width={24}
            height={24}
            priority
          />
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-[32px] c-sm:grid-cols-2 c-lg:grid-cols-4">
        {categories.map((category, index) => (
          <Suspense key={category.id} fallback={<CategorySkeleton />}>
            <CategoryCard {...category} priority={index < 2} />
          </Suspense>
        ))}
      </div>

      <Link
        href="/categories"
        className="mt-6 flex items-center gap-2 rounded-md bg-brand-green px-4 py-3 text-lg text-white transition-all duration-300 hover:scale-105 lg:hidden "
      >
        <span>Explore All Themes</span>
        <Image
          src="/media/icons/explore_icon.png"
          alt="Explore"
          width={24}
          height={24}
          priority
        />
      </Link>
    </Container>
  );
}
