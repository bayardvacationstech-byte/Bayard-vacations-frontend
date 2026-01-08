"use client";
import { Search, Star, MoveRight, Phone } from "lucide-react";
import React from "react";
import { AnimatedInput } from "../ui/AnimatedInput";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../Skeleton";
import Link from "next/link";
import Image from "next/image";
import ReviewCompanies from "@/assets/reviewCompanies.png";
import MobileSearch from "./MobileSearch";
import { SEARCH_API, TRENDING_PACKAGES } from "@/config";

const Hero = () => {
  // Search state
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const inputRef = React.useRef(null);
  const dropdownRef = React.useRef(null);
  const debounceTimeout = React.useRef();

  // Debounced search
  React.useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(async () => {
      try {
        const response = await SEARCH_API.get("/", {
          params: { q: searchTerm },
        });
        setSearchResults(response.data || []);
      } catch (e) {
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => clearTimeout(debounceTimeout.current);
  }, [searchTerm]);

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClick(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showDropdown]);

  return (
    <>
      <div className="relative flex flex-col justify-center min-h-[100dvh] w-full bg-brand-deep">
        <video
          className="absolute inset-0 z-10 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://cdn.bayardvacations.com/videos/hero_section.webm"
            type="video/webm"
          />
          <source
            src="https://cdn.bayardvacations.com/videos/hero_section.mp4"
            type="video/mp4"
          />
        </video>
        <div
          className="absolute inset-0 z-10 top-0 left-0 h-full w-full bg-gradient-to-b from-black/60 via-black/20 to-black/80 z-10"
        />

        <div className="max-w-4xl mx-auto flex flex-col gap-8 relative z-10 pb-40 sm:pb-0">
          {/* <div className="text-center font-bold text-xl sm:text-3xl text-white px-10 pt-10 font-nord">
            DISCOVER. EXPLORE. EXPERIENCE.
          </div> */}

          <div className="text-center px-6">
            <h2
              className="
      mt-2
      text-2xl sm:text-4xl lg:text-5xl
      font-extrabold
      tracking-tight
      text-white
      drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]
      font-nord
    "
            >
              Bayard Vacations
            </h2>

            <p className="mt-3 text-sm sm:text-lg lg:text-xl font-semibold tracking-wide text-white/90">
              Where every journey feels{" "}
              <span className="text-brand-green">personal</span>,{" "}
              <span className="text-brand-green">meaningful</span>, and{" "}
              <span className="text-brand-green">unforgettable</span>
            </p>
          </div>

          {/* Search Bar */}
          {/* ================= SEARCH BAR ================= */}
          <div className="relative w-3/4 mx-auto z-20">
            {/* -------- MOBILE SEARCH -------- */}
            <div className="sm:hidden">
              <MobileSearch />
            </div>

            {/* -------- DESKTOP SEARCH -------- */}
            <div
              className="
    hidden sm:flex items-center
    px-4 py-3
    rounded-[1.8rem]
    bg-black/10
    backdrop-blur-sm
    text-white
    shadow-lg shadow-black/20
    w-full
    gradient-border
  "
            >
              <Search className="size-8 mr-2 shrink-0" />

              <AnimatedInput
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholderItems={[
                  "Search destinations, packages...",
                  "Explore Bali, Thailand, Europe...",
                  "Find your perfect vacation...",
                ]}
                className="
        bg-transparent
        border-none
        focus-visible:ring-0
        focus-visible:ring-offset-0
        shadow-none
        text-sm sm:text-base
        text-white
        placeholder:text-white/70
        w-full
      "
                autoComplete="off"
              />
            </div>

            {/* ================= DROPDOWN ================= */}
            {showDropdown && searchTerm.length > 0 && (
              <Card
                ref={dropdownRef}
                className="
        absolute left-0 right-0 mt-2 z-50
        border shadow-lg bg-white
        max-h-80 overflow-y-auto rounded
      "
              >
                <CardContent className="p-0">
                  {loading ? (
                    <div className="p-4 flex flex-col gap-2">
                      <Skeleton className="h-6 w-full rounded" />
                      <Skeleton className="h-6 w-2/3 rounded" />
                      <Skeleton className="h-6 w-1/2 rounded" />
                    </div>
                  ) : searchTerm &&
                    searchResults.packages?.length === 0 &&
                    searchResults.regions?.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground text-sm">
                      No packages found for &quot;{searchTerm}&quot;
                    </div>
                  ) : (
                    <div className="p-4">
                      {/* Regions */}
                      {searchResults.regions?.length > 0 && (
                        <>
                          <h4 className="mb-4 text-sm text-slate-500">
                            Regions
                          </h4>
                          <ul className="text-brand-blue mb-4">
                            {searchResults.regions.map((region, index) => (
                              <li key={index}>
                                <Link
                                  href={`/packages/${region}`}
                                  className="flex items-center gap-3 hover:bg-brand-blue/10 p-2 rounded"
                                  onClick={() => setShowDropdown(false)}
                                >
                                  <MoveRight className="size-4" />
                                  <span className="capitalize">
                                    {region.split("-").join(" ")}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <hr className="my-4 border-t border-gray-300" />
                        </>
                      )}

                      {/* Packages */}
                      {searchResults.packages?.length > 0 && (
                        <>
                          <h4 className="mb-4 text-sm text-slate-500">
                            Available Packages
                          </h4>
                          <ul className="text-brand-blue">
                            {searchResults.packages.map((pkg) => (
                              <li key={pkg.id}>
                                <Link
                                  href={`/packages/${pkg.region}/${pkg.packageSlug}`}
                                  className="flex items-center gap-3 hover:bg-brand-blue/10 p-2 rounded"
                                  onClick={() => setShowDropdown(false)}
                                >
                                  {pkg.bannerImage && (
                                    <Image
                                      src={pkg.bannerImage}
                                      alt={pkg.name}
                                      width={55}
                                      height={55}
                                      className="rounded object-cover aspect-square bg-gray-200"
                                    />
                                  )}
                                  <div className="flex-1">
                                    <div className="font-medium line-clamp-1">
                                      {pkg.name}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {pkg.region?.split("-").join(" ")}
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      {/* Quick Links */}
                      {!searchResults.packages?.length &&
                        !searchResults.regions?.length && (
                          <>
                            <h4 className="mb-2 text-sm text-slate-500">
                              Quick Links
                            </h4>
                            <ul className="text-brand-blue">
                              {TRENDING_PACKAGES.map((pkg) => (
                                <li key={pkg}>
                                  <Link
                                    href={`/packages/${pkg}`}
                                    className="flex items-center gap-3 hover:bg-brand-blue/10 p-2 rounded"
                                    onClick={() => setShowDropdown(false)}
                                  >
                                    <MoveRight className="size-4" />
                                    <span className="capitalize">{pkg}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      {/* MODERN OVERLAY FOOTER (Marquee + Stats) */}
      <div className="absolute bottom-0 w-full z-30 border-t border-white/10">
        
        {/* Highlight Marquee - High Visibility Terracotta Ribbon */}
        {/* <div className="relative w-full overflow-hidden bg-brand-blue shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border-b border-brand-dark/5 z-20">
          <div className="flex items-center whitespace-nowrap animate-marquee py-2 sm:py-3">
            <span className="mx-8 sm:mx-10 text-white font-bold tracking-wide text-xs sm:text-sm uppercase flex items-center gap-2">
              <Star className="size-3 fill-brand-accent text-brand-accent" /> Curated Luxury Holidays
            </span>
            <span className="mx-8 sm:mx-10 text-white font-bold tracking-wide text-xs sm:text-sm uppercase flex items-center gap-2">
              <Star className="size-3 fill-brand-accent text-brand-accent" /> Handpicked Destinations Worldwide
            </span>
            <span className="mx-8 sm:mx-10 text-white font-bold tracking-wide text-xs sm:text-sm uppercase flex items-center gap-2">
              <Star className="size-3 fill-brand-accent text-brand-accent" /> Personalized Travel Experiences
            </span>
            <span className="mx-8 sm:mx-10 text-white font-bold tracking-wide text-xs sm:text-sm uppercase flex items-center gap-2">
              <Star className="size-3 fill-brand-accent text-brand-accent" /> Trusted by 5000+ Happy Travelers
            </span>
             <span className="mx-8 sm:mx-10 text-white font-bold tracking-wide text-xs sm:text-sm uppercase flex items-center gap-2">
              <Star className="size-3 fill-brand-accent text-brand-accent" /> Curated Luxury Holidays
            </span>
            <span className="mx-8 sm:mx-10 text-white font-bold tracking-wide text-xs sm:text-sm uppercase flex items-center gap-2">
              <Star className="size-3 fill-brand-accent text-brand-accent" /> Handpicked Destinations Worldwide
            </span>
          </div>
        </div> */}

        {/* Quick Stats - Dark Glass Overlay */}
        <div className="bg-[#0146b3]  text-white border-t border-white/20 shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
          <div className="grid grid-cols-4 items-center justify-items-center gap-2 md:gap-0 py-4 sm:py-6 px-2 sm:px-4 max-w-7xl mx-auto relative md:divide-x divide-white/20">
            
            {/* Review Badge - Google Colors */}
            <div className="col-span-4 md:col-span-1 w-full flex items-center justify-center gap-2 pb-3 md:pb-0 border-b md:border-b-0 border-white/20">
              <Image
                src={ReviewCompanies}
                alt="Google Reviews"
                className="h-6 sm:h-8 w-auto"
              />
              <div className="flex items-center gap-1.5 text-sm sm:text-base font-black">
                <span className="text-xl sm:text-3xl font-black text-white">4.9</span>
                <Star className="size-5 sm:size-6 fill-[#FBBC05] stroke-[#FBBC05]" />
              </div>
            </div>

            {/* Stat 1 */}
            <div className="col-span-1 w-full flex flex-col items-center justify-center text-center">
              <span className="text-xl sm:text-3xl font-black text-white">5k+</span>
              <span className="text-[11px] sm:text-sm font-bold text-white uppercase tracking-wider mt-1">Travelers</span>
            </div>

            {/* Stat 2 */}
            <div className="col-span-1 w-full flex flex-col items-center justify-center text-center">
              <span className="text-xl sm:text-3xl font-black text-white">100+</span>
              <span className="text-[11px] sm:text-sm font-bold text-white uppercase tracking-wider mt-1">Places</span>
            </div>

            {/* Stat 3 Support */}
            <div className="col-span-2 md:col-span-1 w-full flex items-center justify-center gap-2 sm:gap-3">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/20 flex items-center justify-center shrink-0 border border-white/10">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="leading-tight">
                <span className="block text-sm sm:text-xl font-black text-white uppercase tracking-tight">24/7 Support</span>
                <span className="text-[10px] sm:text-sm font-medium text-white/80">Premium Assistance</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default Hero;
