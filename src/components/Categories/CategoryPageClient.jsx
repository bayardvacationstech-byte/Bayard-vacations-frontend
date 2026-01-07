"use client";

import React, { useState } from "react";
import Container from "@/components/ui/Container";
import ExplorationList from "@/components/ui/ExplorationList";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const CategoryPageClient = ({ category }) => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("domestic") === "true" ? "domestic" : "international"
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams);
    if (tab === "domestic") {
      params.set("domestic", "true");
    } else {
      params.delete("domestic");
    }
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative border-b border-solid border-black bg-brand-blue">
        <Container>
          <div className="inner-page-padding flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            {/* Text Content */}
            <div className="flex-1">
              <h1 className="mb-4 text-4xl font-bold text-white lg:text-6xl">
                {category.title}
              </h1>
              <p className="text-xl text-white/90 lg:text-2xl">
                {category.subtitle}
              </p>
            </div>

            {/* Icon */}
            {category.iconLight && (
              <div className="relative h-32 w-32 lg:h-40 lg:w-40">
                <Image
                  src={category.iconLight}
                  alt={category.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Tabs Section */}
      <section className="border-b border-solid border-black bg-white">
        <Container>
          <div className="flex items-center justify-center gap-4 py-6">
            <button
              onClick={() => handleTabChange("international")}
              className={`rounded-full px-8 py-3 text-lg font-medium transition-all ${
                activeTab === "international"
                  ? "bg-brand-blue text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              International
            </button>
            <button
              onClick={() => handleTabChange("domestic")}
              className={`rounded-full px-8 py-3 text-lg font-medium transition-all ${
                activeTab === "domestic"
                  ? "bg-brand-blue text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Domestic
            </button>
          </div>
        </Container>
      </section>

      {/* Packages Section */}
      <section className="section-padding">
        <Container>
          <ExplorationList theme={category.slug} />
        </Container>
      </section>
    </>
  );
};

export default CategoryPageClient;
