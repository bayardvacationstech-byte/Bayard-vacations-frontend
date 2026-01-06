import React from "react";
import Container from "@/components/ui/Container";
import CategoryCard from "@/components/ui/CategoryCard";
import categoryData from "@/data/categoryData";

const CategoriesPage = () => {
  return (
    <>
      <section className="inner-page-padding border-b border-solid border-black">
        <Container>
          <h1 className="section-header-margin text-4xl  font-bold text-brand-blue lg:text-6xl">
            Explore Our <br /> Range of Products
          </h1>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="grid gap-8 c-md:grid-cols-2 c-lg:grid-cols-3">
            {categoryData.map((category) => (
              <CategoryCard key={category.id} item={category} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default CategoriesPage;
