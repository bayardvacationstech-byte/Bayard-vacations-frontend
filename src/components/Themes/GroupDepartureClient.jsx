"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Users, CalendarCheck, Bus, MapPin, Calendar, Star, Shield, ChevronRight, Ticket, Group, Globe } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { usePackagesByTheme } from "@/hooks/packages";
import ThemedPackageCard from "@/components/ui/ThemedPackageCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { getPaginationPages } from "@/utils/paginationUtils";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import ThemeLoader from "@/components/ui/ThemeLoader";

export default function GroupDepartureClient() {
  const [selectedTab, setSelectedTab] = useState("international");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const packagesRef = useRef(null);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setCurrentPage(1);
  };

  const { 
    packages: allThemePackages, 
    isLoading, 
    error 
  } = usePackagesByTheme("group-departure");

  const groupPackages = useMemo(() => {
    if (!allThemePackages) return { international: [], domestic: [] };
    
    // Deduplicate by package ID
    const uniqueMap = new Map();
    allThemePackages.forEach(pkg => {
      if (pkg.id && !uniqueMap.has(pkg.id)) {
        uniqueMap.set(pkg.id, pkg);
      }
    });
    const uniquePackages = Array.from(uniqueMap.values());
    
    return {
      international: uniquePackages.filter(pkg => !pkg.domestic),
      domestic: uniquePackages.filter(pkg => pkg.domestic)
    };
  }, [allThemePackages]);

  const currentPackages = groupPackages[selectedTab] || [];
  const totalPages = Math.ceil(currentPackages.length / itemsPerPage);
  
  const paginatedPackages = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return currentPackages.slice(start, start + itemsPerPage);
  }, [currentPackages, currentPage, itemsPerPage]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-50 to-white">
      <AnimatePresence>
        {isLoading && (
          <ThemeLoader theme="family" fullScreen className="bg-indigo-50" />
        )}
      </AnimatePresence>
      {/* Hero Section */}
      <div className="relative min-h-[70vh] md:h-[75vh] lg:h-[80vh] overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600">
        {/* Group Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='8' fill='white'/%3E%3Ccircle cx='40' cy='20' r='8' fill='white'/%3E%3Ccircle cx='60' cy='20' r='8' fill='white'/%3E%3Ccircle cx='30' cy='40' r='8' fill='white'/%3E%3Ccircle cx='50' cy='40' r='8' fill='white'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }} />
        </div>

        <Container className="relative h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center w-full">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                <Users className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white uppercase tracking-widest">
                  Travel Theme
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white leading-tight">
                Group<br />
                <span className="text-cyan-200">Departure</span>
              </h1>

              <p className="text-base md:text-xl text-white/90 leading-relaxed max-w-xl">
                All things together. Discover our handpicked domestic and international arrivals curated specifically for this theme.
              </p>

              <div className="flex gap-4">
                <Button size="lg" className="bg-white text-indigo-700 hover:bg-cyan-50 font-black px-8 py-6 rounded-2xl shadow-xl">
                  View Departures
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 font-black px-8 py-6 rounded-2xl backdrop-blur-sm">
                  Join a Group
                </Button>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl ring-8 ring-white/20">
                <Image
                  src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800"
                  alt="Group travelers"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 flex items-center justify-center">
                    <Group className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900">Travel Together</p>
                    <p className="text-sm text-slate-600">Fixed dates, fixed groups, guaranteed fun</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Packages Section */}
      <Container className="py-4 md:py-8">
        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-slate-100 rounded-full p-1.5">
            <button
              onClick={() => handleTabChange("international")}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                selectedTab === "international"
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              International
            </button>
            <button
              onClick={() => handleTabChange("domestic")}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                selectedTab === "domestic"
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Domestic
            </button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" ref={packagesRef}>
          {isLoading ? (
            <ThemeLoader theme="group" />
          ) : (
            <AnimatePresence mode="wait">
              {paginatedPackages.map((pkg, index) => (
                <ThemedPackageCard 
                  key={`${selectedTab}-${pkg.id}`} 
                  theme="group"
                  item={pkg}
                />
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center py-6">
            <Pagination>
              <PaginationContent className="gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    className={cn(
                      "cursor-pointer rounded-xl h-11 w-11 bg-white border-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-md",
                      currentPage === 1 && "pointer-events-none opacity-30"
                    )}
                    onClick={() => {
                      setCurrentPage(currentPage - 1);
                      packagesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  />
                </PaginationItem>
                
                {getPaginationPages(currentPage, totalPages).map((page, i) => (
                  <PaginationItem key={i} className="hidden sm:block">
                    {page === "..." ? (
                      <PaginationEllipsis className="text-blue-400" />
                    ) : (
                      <PaginationLink
                        className={cn(
                          "cursor-pointer rounded-xl h-11 w-11 bg-white font-bold transition-all border-blue-100 shadow-md",
                          currentPage === page 
                            ? "bg-gradient-to-br from-indigo-600 to-cyan-600 text-white shadow-lg border-transparent" 
                            : "text-blue-600 hover:bg-blue-50"
                        )}
                        onClick={() => {
                          setCurrentPage(page);
                          packagesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    className={cn(
                      "cursor-pointer rounded-xl h-11 w-11 bg-white border-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-md",
                      currentPage === totalPages && "pointer-events-none opacity-30"
                    )}
                    onClick={() => {
                      setCurrentPage(currentPage + 1);
                      packagesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </Container>

      {/* Why Group Departure Section */}
      <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 py-8 md:py-10">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Why Choose Group Departures?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Travel with confidence in fixed-date group tours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Shield, title: "Guaranteed Departures", desc: "Fixed dates with confirmed departures—no cancellations due to low bookings. Your travel plans are secure." },
              { icon: Users, title: "Social Experience", desc: "Meet like-minded travelers, make new friends, and share unforgettable experiences together." },
              { icon: Globe, title: "Cost Effective", desc: "Group discounts on accommodations, transport, and activities make luxury travel more affordable." }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-8"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
