"use client";
import React, { useState, useEffect } from "react";
import BookNowForm from "@/components/Forms/BookNowForm/BookNowForm";
import { useParams } from "next/navigation";
import ItineraryFooter from "@/components/Itinerary/ItineraryFooter";
import PackageHero from "./PackageHero";
import PackageExperiences from "./PackageExperiences";
import PackageHotels from "./PackageHotels";
import { usePackages, usePackage } from "@/hooks/packages";
import WebsiteLoader from "@/components/ui/WebsiteLoader";
import PremiumFaq from "./PremiumFaq";
import PremiumBookNowForm from "@/components/Forms/BookNowForm/PremiumBookNowForm";
import TabbedContent from "./TabbedContent";
import { Phone, X, ChevronUp } from "lucide-react";
import WhyBayardVacations from "./WhyBayardVacations";

const PackagesClient = () => {
  const params = useParams();
  const slug = params.slug;
  const [mounted, setMounted] = useState(false);
  const [isExploring, setIsExploring] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showFullForm, setShowFullForm] = useState(false);

  // Use the new hook to fetch package data
  const {
    packageData,
    isLoading: packageLoading,
    error: packageError,
  } = usePackage(slug);

  // Fetch related packages from the same region
  const { packages: relatedPackages = [] } = usePackages(packageData?.region);

  // Filter out current package from related packages
  const filteredRelatedPackages = relatedPackages.filter(
    (item) => item.packageSlug !== packageData?.packageSlug
  );



  useEffect(() => {
    setMounted(true);
    // Clean up any hash from the URL when component mounts
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  }, []);

  // Show sticky bar after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowStickyBar(scrollY > 600);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show loader only after component has mounted to prevent hydration mismatch
  if (!mounted || packageLoading || !packageData) {
    return <WebsiteLoader />;
  }

  if (packageError) {
    return <div>Error loading package: {packageError.message}</div>;
  }

  const BookNowFormComponent =
    typeof packageData?.hotelDetails === "string" ? (
      <BookNowForm packageData={packageData} offerData={packageData.offer} />
    ) : (
      <PremiumBookNowForm packageData={packageData} offerData={packageData.offer} />
    );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  return (
    <>
      {/* 1. Hero Section - First Impression */}
      <PackageHero 
        packageData={packageData} 
        isExploring={isExploring} 
        setIsExploring={setIsExploring} 
      />
      
      {/* 2. Package Details Tabs - Core Information */}
      <TabbedContent packageData={packageData} />
      
      {/* 3. Experiences Gallery - Visual Activities */}
      <PackageExperiences 
        packageData={packageData} 
        setIsExploring={setIsExploring} 
      />
      
      {/* 4. Hotel Details - Where You'll Stay */}
      <PackageHotels packageData={packageData} />

      {/* 5. FAQ Section - Answer Questions */}
      {packageData?.faq && (
        <PremiumFaq content={packageData.faq} />
      )}

      {/* Related Packages */}
      {filteredRelatedPackages && (
        <ItineraryFooter relatedPackages={filteredRelatedPackages} />
      )}





      {/* Compact Sticky Bottom Bar */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${
          showStickyBar ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Expanded Form Overlay */}
        {showFullForm && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setShowFullForm(false)}
          />
        )}
        
        {/* Expanded Form Panel */}
        <div 
          className={`absolute bottom-full left-0 right-0 bg-white border-t border-brand-green/20 shadow-2xl transition-all duration-300 z-50 ${
            showFullForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <div className="max-w-md mx-auto p-6">
            <button 
              onClick={() => setShowFullForm(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            {BookNowFormComponent}
          </div>
        </div>

        {/* Compact Bottom Bar */}
        <div className="bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Price Info */}
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-slate-500 text-xs font-medium">Starting from</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-brand-green text-sm font-bold">₹</span>
                    <span className="text-slate-900 font-bold text-2xl">
                      {formatPrice(packageData?.price || packageData?.startingPrice || 32500)}
                    </span>
                    <span className="text-slate-400 text-xs">/person</span>
                  </div>
                </div>
                
                {/* Hotel Category Badge */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-brand-green/5 to-brand-blue/5 border border-brand-green/20 rounded-full">
                  <span className="text-brand-green text-xs">⭐⭐⭐⭐</span>
                  <span className="text-slate-700 text-xs font-semibold">
                    {packageData?.hotelCategory || "Deluxe"} Hotels
                  </span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {/* View Details / Expand */}
                <button
                  onClick={() => setShowFullForm(!showFullForm)}
                  className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl transition-all text-sm font-semibold"
                >
                  <ChevronUp className={`w-4 h-4 transition-transform ${showFullForm ? 'rotate-180' : ''}`} />
                  View Options
                </button>
                
                {/* Call Button */}
                <a 
                  href="tel:+919876543210"
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm font-semibold">Call Us</span>
                </a>
                
                {/* Book Now Button */}
                <button
                  onClick={() => {
                    setShowFullForm(true);
                  }}
                  className="px-6 py-2.5 gradient-btn text-white font-bold rounded-xl shadow-lg transition-all text-sm uppercase tracking-wider"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackagesClient;


