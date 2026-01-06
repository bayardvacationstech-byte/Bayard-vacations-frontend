// "use client";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { AnimatedInput } from "../ui/AnimatedInput";
// import { Loader2, MoveRight, Search, X } from "lucide-react";
// import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
// import { useState, useRef, useEffect } from "react";
// import useToggleState from "@/hooks/useToggleState";
// import { searchPackages } from "@/utils/firebase";
// import Link from "next/link";
// import Image from "next/image";
// import { Button } from "../ui/button";
// import { TRENDING_PACKAGES } from "@/config";

// const SEARCH_PLACEHOLDERS = [
//   "Search for destinations, packages, regions...",
//   "Explore Bali, Thailand, Europe...",
//   "Find your perfect vacation package...",
//   "Discover amazing travel deals...",
// ];

// export default function MobileSearch() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState({
//     regions: [],
//     packages: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const { state, toggle } = useToggleState(false);
//   const inputRef = useRef(null);
//   const debounceTimeout = useRef();

//   // Debounced search
//   useEffect(() => {
//     if (!searchTerm.trim()) {
//       setSearchResults({ regions: [], packages: [] });
//       setLoading(false);
//       return;
//     }
//     setLoading(true);
//     if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
//     debounceTimeout.current = setTimeout(async () => {
//       try {
//         const data = await searchPackages(searchTerm);
//         setSearchResults(data || { regions: [], packages: [] });
//       } catch (e) {
//         setSearchResults({ regions: [], packages: [] });
//       } finally {
//         setLoading(false);
//       }
//     }, 350);
//     return () => clearTimeout(debounceTimeout.current);
//   }, [searchTerm]);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handlePackageClick = () => {
//     toggle(); // Close the dialog
//   };

//   const handleClose = () => {
//     setSearchTerm("");
//     setSearchResults({ regions: [], packages: [] });
//     setLoading(false);
//     inputRef.current.value = "";
//     toggle();
//   };

//   return (
//     <Dialog open={state} onOpenChange={toggle} closeButton={false}>
//       <DialogTrigger asChild>
//         <div className="flex items-center border-brand-green border-4 rounded-lg bg-white px-4 py-2">
//           <Search className="size-4 text-brand-green mr-2" />
//           <AnimatedInput
//             type="text"
//             placeholderItems={SEARCH_PLACEHOLDERS}
//             autoComplete="off"
//           />
//         </div>
//       </DialogTrigger>
//       <DialogContent className="p-0 h-full">
//         <VisuallyHidden>
//           <DialogTitle>Search</DialogTitle>
//         </VisuallyHidden>
//         <div className="flex flex-col h-full overflow-auto p-2">
//           {/* Search Input */}
//           <div className="border-b border-gray-200 w-full">
//             <div className="flex items-center border-brand-green border-4 rounded-lg bg-white px-4 py-2">
//               <Search className="size-4 text-brand-green mr-2" />
//               <AnimatedInput
//                 ref={inputRef}
//                 type="text"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 placeholderItems={SEARCH_PLACEHOLDERS}
//                 className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none text-base rounded-xl overflow-hidden"
//                 autoComplete="off"
//               />
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={handleClose}
//                 className="text-green-500 hover:text-green-600 border-2 border-brand-green p-4"
//                 aria-label="Close"
//               >
//                 <X className="size-4" />
//               </Button>
//             </div>
//           </div>

//           {/* Search Results */}
//           <div className="flex-1 overflow-y-auto">
//             {loading ? (
//               <div className="py-4 gap-4">
//                 <div className="text-lg animate-pulse text-center text-muted-foreground">
//                   Hold on! Searching Packages...
//                 </div>
//                 <div className="p-8 text-center text-muted-foreground">
//                   <h4 className="text-lg text-left font-semibold text-slate-500 mb-4">
//                     Quick Links
//                   </h4>
//                   <ul className="space-y-4 text-muted-foreground">
//                     {TRENDING_PACKAGES.map((pkg) => (
//                       <li key={pkg}>
//                         <Link
//                           href={`/packages/${pkg}`}
//                           className="flex items-center gap-3 underline"
//                         >
//                           <span className="capitalize">{pkg}</span>
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             ) : searchTerm &&
//               searchResults.regions?.length === 0 &&
//               searchResults.packages?.length === 0 ? (
//               <div className="p-8 text-center text-muted-foreground">
//                 <div className="text-lg font-medium mb-2">
//                   No packages found
//                 </div>
//                 <div className="text-sm">
//                   Try searching for different destinations or packages
//                 </div>
//               </div>
//             ) : searchTerm ? (
//               <div className="p-4 space-y-4">
//                 {/* Regions Section */}
//                 {searchResults.regions?.length > 0 && (
//                   <div>
//                     <h4 className="text-lg font-semibold text-slate-500 mb-4">
//                       Regions
//                     </h4>
//                     <div className="space-y-2">
//                       {searchResults.regions.map((region) => (
//                         <Link
//                           key={region.id}
//                           href={`/packages/${region.slug}`}
//                           className="block p-4 border border-gray-200 rounded-lg hover:bg-brand-blue/5 transition-colors"
//                           onClick={handlePackageClick}
//                         >
//                           <div className="flex items-center gap-3">
//                             <MoveRight className="size-5 text-brand-blue" />
//                             <div className="flex-1">
//                               <div className="font-medium text-base text-brand-blue">
//                                 {region.name}
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Packages Section */}
//                 {searchResults.packages?.length > 0 && (
//                   <div>
//                     <h4 className="text-lg font-semibold text-slate-500 mb-4">
//                       Available Packages
//                     </h4>
//                     <div className="space-y-2">
//                       {searchResults.packages.map((pkg) => (
//                         <Link
//                           key={pkg.id}
//                           href={`/packages/${pkg.region}/${pkg.packageSlug}`}
//                           className="block p-4 border border-gray-200 rounded-lg hover:bg-brand-blue/5 transition-colors"
//                           onClick={handlePackageClick}
//                         >
//                           <div className="flex items-center gap-3">
//                             {pkg.bannerImages[0]?.url && (
//                               <Image
//                                 src={pkg.bannerImages[0]?.url}
//                                 alt={pkg.packageName}
//                                 width={60}
//                                 height={60}
//                                 className="rounded-lg object-cover aspect-square"
//                               />
//                             )}
//                             <div className="flex-1 min-w-0">
//                               <div className="font-medium text-base text-brand-blue line-clamp-2 mb-1">
//                                 {pkg.packageName}
//                               </div>
//                               <div className="text-sm text-muted-foreground capitalize">
//                                 {pkg.region}
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="p-8 text-center text-muted-foreground">
//                 <h4 className="text-lg text-left font-semibold text-slate-500 mb-4">
//                   Quick Links
//                 </h4>
//                 <ul className="space-y-4 text-muted-foreground">
//                   {TRENDING_PACKAGES.map((pkg) => (
//                     <li key={pkg}>
//                       <Link
//                         href={`/packages/${pkg}`}
//                         className="flex items-center gap-3 underline"
//                       >
//                         <span className="capitalize">{pkg}</span>
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { AnimatedInput } from "../ui/AnimatedInput";
import { MoveRight, Search, X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState, useRef, useEffect } from "react";
import useToggleState from "@/hooks/useToggleState";
import { searchPackages } from "@/utils/firebase";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { TRENDING_PACKAGES } from "@/config";

const SEARCH_PLACEHOLDERS = [
  "Search destinations, packages...",
  "Explore Bali, Thailand, Europe...",
  "Find your perfect vacation...",
  "Discover amazing travel deals...",
];

export default function MobileSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    regions: [],
    packages: [],
  });
  const [loading, setLoading] = useState(false);

  const { state, toggle } = useToggleState(false);
  const inputRef = useRef(null);
  const debounceTimeout = useRef(null);

  /* ---------------- Debounced Search ---------------- */
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults({ regions: [], packages: [] });
      setLoading(false);
      return;
    }

    setLoading(true);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      try {
        const data = await searchPackages(searchTerm);
        setSearchResults(data || { regions: [], packages: [] });
      } catch {
        setSearchResults({ regions: [], packages: [] });
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(debounceTimeout.current);
  }, [searchTerm]);

  const handleClose = () => {
    setSearchTerm("");
    setSearchResults({ regions: [], packages: [] });
    setLoading(false);
    toggle();
  };

  /* ================================================== */
  return (
    <Dialog open={state} onOpenChange={toggle}>
      {/* ================= TRIGGER ================= */}
      <DialogTrigger asChild>
        <div
          className="
            sm:hidden
            flex items-center gap-3
            px-4 py-3
            rounded-full
            bg-white/10
            backdrop-blur-xl
            border border-white/30
            text-white
            shadow-lg
            w-full
          "
        >
          <Search className="size-4 text-white/80 shrink-0" />
          <AnimatedInput
            type="text"
            placeholderItems={SEARCH_PLACEHOLDERS}
            className="
              bg-transparent
              border-none
              focus-visible:ring-0
              shadow-none
              text-sm
              text-white
              placeholder:text-white/70
              w-full
            "
            readOnly
          />
        </div>
      </DialogTrigger>

      {/* ================= CONTENT ================= */}
      <DialogContent className="p-0 h-full bg-gradient-to-b from-[#002b6b] to-[#0146b3] text-white">
        <VisuallyHidden>
          <DialogTitle>Search</DialogTitle>
        </VisuallyHidden>

        <div className="flex flex-col h-full">
          {/* ---------- TOP SEARCH BAR ---------- */}
          <div className="p-4 border-b border-white/20">
            <div
              className="
                flex items-center gap-3
                px-4 py-3
                rounded-full
                bg-white/10
                backdrop-blur-xl
                border border-white/30
              "
            >
              <Search className="size-4 text-white/80" />

              <AnimatedInput
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholderItems={SEARCH_PLACEHOLDERS}
                className="
                  bg-transparent
                  border-none
                  focus-visible:ring-0
                  shadow-none
                  text-base
                  text-white
                  placeholder:text-white/70
                  w-full
                "
                autoComplete="off"
                autoFocus
              />

              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="text-white/70 hover:text-white"
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>

          {/* ---------- RESULTS ---------- */}
          <div className="flex-1 overflow-y-auto px-4 py-6 bg-white text-brand-blue rounded-t-3xl">
            {loading ? (
              <p className="text-center text-sm text-muted-foreground">
                Searching packages…
              </p>
            ) : searchTerm &&
              searchResults.regions.length === 0 &&
              searchResults.packages.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground">
                No packages found
              </p>
            ) : searchTerm ? (
              <div className="space-y-6">
                {/* Regions */}
                {searchResults.regions?.length > 0 && (
                  <div>
                    <h4 className="text-sm text-slate-500 mb-3">Regions</h4>
                    <ul className="space-y-2">
                      {searchResults.regions.map((region) => (
                        <li key={region.slug}>
                          <Link
                            href={`/packages/${region.slug}`}
                            onClick={toggle}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-brand-blue/10"
                          >
                            <MoveRight className="size-4" />
                            <span className="capitalize">{region.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Packages */}
                {searchResults.packages?.length > 0 && (
                  <div>
                    <h4 className="text-sm text-slate-500 mb-3">
                      Available Packages
                    </h4>
                    <ul className="space-y-3">
                      {searchResults.packages.map((pkg) => (
                        <li key={pkg.id}>
                          <Link
                            href={`/packages/${pkg.region}/${pkg.packageSlug}`}
                            onClick={toggle}
                            className="flex gap-3 p-3 rounded-lg hover:bg-brand-blue/10"
                          >
                            {pkg.bannerImages?.[0]?.url && (
                              <Image
                                src={pkg.bannerImages[0].url}
                                alt={pkg.packageName}
                                width={56}
                                height={56}
                                className="rounded-lg object-cover"
                              />
                            )}
                            <div className="min-w-0">
                              <p className="font-medium line-clamp-2">
                                {pkg.packageName}
                              </p>
                              <p className="text-xs text-muted-foreground capitalize">
                                {pkg.region}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h4 className="text-sm text-slate-500 mb-3">Quick Links</h4>
                <ul className="space-y-2">
                  {TRENDING_PACKAGES.map((pkg) => (
                    <li key={pkg}>
                      <Link
                        href={`/packages/${pkg}`}
                        onClick={toggle}
                        className="block p-3 rounded-lg hover:bg-brand-blue/10 capitalize"
                      >
                        {pkg}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
