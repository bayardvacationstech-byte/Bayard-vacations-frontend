"use client";
import Image from "next/image";
import Link from "next/link";
import categoryData from "@/data/categoryData";

const ExplorePackagesContent = ({
  setActiveDropdown,
  handleActiveItem,
  handleIsDropdownActive,
  handleMenuActive,
}) => {
  const handleClose = () => {
    setActiveDropdown && setActiveDropdown(null);
    handleActiveItem && handleActiveItem(null);
    handleIsDropdownActive && handleIsDropdownActive();
    handleMenuActive && handleMenuActive();
  };
  return (
    <div className="mx-auto max-w-screen-lg py-8 c-lg:p-8">
      <ul className="grid gap-8 c-sm:grid-cols-2 c-lg:grid-cols-3">
        {categoryData.map((item) => {
          // const isLuxury = item.slug === "elite-escape";
          return (
            <li key={item.id}>
              <Link
                onClick={handleClose}
                // href={isLuxury ? `/luxury` : `/categories/${item.slug}`}
                href={`/categories/${item.slug}`}
                className="flex items-center gap-3 transition-all duration-300 hover:translate-x-2"
              >
                <Image
                  alt={item.title}
                  src={item.iconLight}
                  width={48}
                  height={48}
                />
                <div className="explore-packages-content">
                  <h4>{item.title}</h4>
                  <span className="text-xs">{item.subtitle}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExplorePackagesContent;
