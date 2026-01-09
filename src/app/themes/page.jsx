import React from "react";
import ThemeGrid from "@/components/Themes/ThemeGrid";
import Container from "@/components/ui/Container";

export const metadata = {
  title: "Explore Travel Themes | Bayard Vacations",
  description: "Discover our curated collection of travel themes, from romantic getaways to elite escapes.",
};

const ThemesPage = () => {
  return (
    <main className="min-h-screen bg-black">
      {/* Header Section */}
      <section className="pt-20 lg:pt-32 pb-10 border-b border-white/10">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-green text-xs font-bold tracking-[0.2em] uppercase mb-6">
              Collections
            </div>
            <h1 className="text-4xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Curated <span className="text-brand-green">Travel Themes</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-400 font-medium leading-relaxed">
              Every traveler's dream is unique. Explore our hand-crafted themes designed to match your specific style and desire for adventure.
            </p>
          </div>
        </Container>
      </section>

      {/* Grid Section */}
      <ThemeGrid />
    </main>
  );
};

export default ThemesPage;
