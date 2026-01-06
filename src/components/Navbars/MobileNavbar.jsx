// "use client";
// import { useState, useRef, useEffect } from "react";
// import { usePathname } from "next/navigation";
// import Container from "../ui/Container";
// import {
//   MoveRight,
//   Search,
//   X,
//   CircleUserRound,
//   Menu,
//   ChevronRight,
//   ChevronLeft,
// } from "lucide-react";
// import Link from "next/link";
// import navbarData from "./navbarData";
// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { useDebounce } from "@/hooks/useDebounce";
// import { SEARCH_API, TRENDING_PACKAGES } from "@/config";

// const MobileNavbar = () => {
//   const inputRef = useRef(null);
//   const [isSearchActive, setIsSearchActive] = useState(false);
//   const [isMenuActive, setIsMenuActive] = useState(false);
//   const [isDropdownActive, setIsDropdownActive] = useState(false);
//   const [activeItem, setActiveItem] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const debouncedSearch = useDebounce(searchTerm, 500);
//   const [isHeaderFixed, setIsHeaderFixed] = useState(true);
//   const pathname = usePathname();
//   const isHome = pathname === "/";

//   useEffect(() => {
//     setIsHeaderFixed(!pathname?.includes("packages"));
//   }, [pathname]);

//   useEffect(() => {
//     const fetchPackages = async () => {
//       if (debouncedSearch.trim()) {
//         setIsLoading(true);
//         try {
//           const response = await SEARCH_API.get("/", {
//             params: { q: debouncedSearch },
//           });
//           setSearchResults(response.data || []);
//         } catch (error) {
//           console.error("Error searching packages:", error);
//           setSearchResults([]);
//         }
//         setIsLoading(false);
//       } else {
//         setSearchResults([]);
//       }
//     };

//     fetchPackages();
//   }, [debouncedSearch]);

//   useEffect(() => {
//     toggleScroll(isMenuActive);

//     // Cleanup when component unmounts
//     return () => toggleScroll(false);
//   }, [isMenuActive]);

//   const handleActiveItem = (item) => {
//     setActiveItem(item);
//   };

//   const handleIsDropdownActive = () => {
//     setIsDropdownActive((prev) => !prev);
//   };

//   const handleMenuActive = () => {
//     setIsMenuActive((prev) => !prev);
//   };

//   const handleIsSearchActive = () => {
//     setIsMenuActive(false);
//     if (isSearchActive) {
//       setSearchTerm("");
//       setSearchResults([]);
//     }
//     setIsSearchActive(!isSearchActive);
//   };

//   const toggleScroll = (disable) => {
//     document.body.style.overflow = disable ? "hidden" : "";
//     document.body.style.paddingRight = disable
//       ? `${window.innerWidth - document.documentElement.clientWidth}px`
//       : "";
//   };

//   return (
//     <>
//       <header
//         className={cn(
//           "fixed top-0 z-50 block w-full c-xxl:hidden bg-brand-blue transition-all duration-300",
//           {
//             "absolute border-b-2 border-solid border-white/30 backdrop-blur-3xl bg-white":
//               !isHeaderFixed,
//             "!bg-transparent top-[20px] border-none !backdrop-blur-0":
//               isSearchActive,
//           }
//         )}
//       >
//         <Container>
//           <div
//             className={cn(
//               "relative mx-auto h-16 overflow-hidden bg-brand-blue transition-all duration-300 ease-in-out w-full",
//               {
//                 "max-w-[800px]": isSearchActive,
//                 "bg-transparent": isSearchActive || !isHeaderFixed,
//               }
//             )}
//           >
//             <nav
//               className={cn(
//                 "h-16 flex items-center gap-8 text-white transition-all duration-300 ease-in-out",
//                 {
//                   "opacity-0 h-0 scale-95": isSearchActive,
//                   "opacity-100 scale-100": !isSearchActive,
//                 }
//               )}
//             >
//               <Link href="/">
//                 <Image
//                   width={150}
//                   height={30}
//                   alt="Bayard Vacations Logo"
//                   src={isHeaderFixed ? "/img/logo.svg" : "/media/logo.svg"}
//                   className="h-auto w-[120px] c-sm:w-[150px]"
//                 />
//               </Link>

//               <div className="ml-auto flex items-center gap-4 ">
//                 <Button
//                   className={cn(
//                     "rounded-full text-white hover:text-brand-blue",
//                     {
//                       "text-brand-blue hover:text-white hover:bg-brand-blue":
//                         !isHeaderFixed,
//                       hidden: isHome,
//                     }
//                   )}
//                   variant="ghost"
//                   size="icon"
//                   onClick={handleIsSearchActive}
//                 >
//                   <Search strokeWidth={3} />
//                 </Button>
//                 <Button
//                   className={cn(
//                     "rounded-full text-white hover:text-brand-blue hidden c-md:block",
//                     {
//                       "text-brand-blue hover:text-white hover:bg-brand-blue":
//                         !isHeaderFixed,
//                     }
//                   )}
//                   variant="ghost"
//                   size="icon"
//                 >
//                   <Link
//                     href="/login"
//                     className="flex items-center justify-center"
//                   >
//                     <CircleUserRound className="!size-6" strokeWidth={2} />
//                   </Link>
//                 </Button>
//                 <Button
//                   className={cn(
//                     " rounded-full text-white hover:text-brand-blue",
//                     {
//                       "text-brand-blue hover:text-white hover:bg-brand-blue":
//                         !isHeaderFixed,
//                     }
//                   )}
//                   variant="ghost"
//                   size="icon"
//                   onClick={handleMenuActive}
//                 >
//                   {isMenuActive ? (
//                     <X className="!size-6" strokeWidth={2} />
//                   ) : (
//                     <Menu className="!size-6" strokeWidth={2} />
//                   )}
//                 </Button>
//                 <Button
//                   className={cn(
//                     "hidden c-md:block border border-solid border-white bg-transparent text-white shadow-none hover:bg-white hover:text-brand-blue",
//                     {
//                       "border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white":
//                         !isHeaderFixed,
//                     }
//                   )}
//                   asChild
//                 >
//                   <Link href="/contact">Contact Us</Link>
//                 </Button>
//               </div>
//             </nav>

//             <div
//               className={cn(
//                 "absolute left-1/2 -translate-x-1/2 h-full transition-all duration-300 ease-in-out flex items-center overflow-hidden",
//                 {
//                   "w-0 opacity-0": !isSearchActive,
//                   "w-full opacity-100": isSearchActive,
//                   hidden: isHome,
//                 }
//               )}
//             >
//               <div
//                 className={cn(
//                   "w-full h-16 bg-blue-200 transition-all duration-300 ease-in-out transform rounded flex items-center px-8",
//                   {
//                     "opacity-0 scale-95": !isSearchActive,
//                     "opacity-100 scale-100": isSearchActive,
//                   }
//                 )}
//               >
//                 <div>
//                   <Search className="text-slate-400 size-5" />
//                 </div>
//                 <div className="h-full flex-1 px-3">
//                   <Input
//                     ref={inputRef}
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="h-full border-0 text-base text-slate-700 shadow-none placeholder:text-slate-400 focus-visible:ring-0"
//                     placeholder="Search for Packages, Destinations etc."
//                   />
//                 </div>
//                 <div>
//                   <Button
//                     className="size-6 rounded-full bg-white p-0 text-brand-blue shadow-none hover:bg-brand-blue hover:text-white"
//                     onClick={handleIsSearchActive}
//                   >
//                     <X />
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Container>
//       </header>
//       {/* Search panel content start */}

//       <div
//         className={cn(
//           " fixed left-1/2 top-[20px] -translate-x-1/2 z-40 rounded overflow-hidden transition-all duration-300 ease-in-out origin-bottom w-[calc(100%+72px)] max-w-[912px]",
//           {
//             "h-0 opacity-0": !isSearchActive,
//             "h-[calc(100vh-40px)] opacity-100": isSearchActive,
//             hidden: isHome,
//           }
//         )}
//         style={{
//           pointerEvents: isSearchActive ? "auto" : "none",
//         }}
//       >
//         <div className="size-full px-9">
//           <Container className="">
//             <div className="h-[calc(100vh-40px)] rounded bg-blue-50 px-8 pt-24">
//               {isLoading ? (
//                 <p className="text-sm text-slate-500">Searching packages...</p>
//               ) : (
//                 <>
//                   {/* Regions Section */}
//                   {searchResults?.regions?.length > 0 && (
//                     <>
//                       <h4 className="mb-4 text-sm text-slate-500">Regions</h4>
//                       <ul className="space-y-4 text-brand-blue">
//                         {searchResults.regions.map((region) => (
//                           <li key={region}>
//                             <Link
//                               href={`/packages/${region.slug}`}
//                               className="flex items-center gap-3"
//                               onClick={() => handleIsSearchActive()}
//                             >
//                               <MoveRight />
//                               <span className="capitalize">{region}</span>
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                       <hr className="my-4 border-t border-gray-300" />
//                     </>
//                   )}

//                   {/* Available Packages Section */}
//                   {searchResults?.packages?.length > 0 ? (
//                     <>
//                       <h4 className="mb-4 text-sm text-slate-500">
//                         Available Packages
//                       </h4>
//                       <ul className="space-y-4 text-brand-blue">
//                         {searchResults.packages.map((pkg) => (
//                           <li key={pkg.id}>
//                             <Link
//                               href={`/packages/${pkg.region}/${pkg.slug}`}
//                               className="flex items-center gap-3"
//                               onClick={() => {
//                                 handleIsSearchActive();
//                                 setSearchTerm("");
//                               }}
//                             >
//                               <MoveRight />
//                               <span>{pkg.name}</span>
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     </>
//                   ) : searchTerm ? (
//                     <p className="text-sm text-slate-500">No packages found</p>
//                   ) : (
//                     <>
//                       <h4 className="mb-4 text-sm text-slate-500">
//                         Quick Links
//                       </h4>
//                       <ul className="space-y-4 text-brand-blue">
//                         {TRENDING_PACKAGES.map((pkg) => (
//                           <li key={pkg}>
//                             <Link
//                               href={`/packages/${pkg}`}
//                               className="flex items-center gap-3"
//                               onClick={() => {
//                                 handleIsSearchActive();
//                                 setSearchTerm("");
//                               }}
//                             >
//                               <MoveRight />
//                               <span className="capitalize">{pkg}</span>
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     </>
//                   )}
//                 </>
//               )}
//             </div>
//           </Container>
//         </div>
//       </div>

//       {/* Search panel content end */}

//       {/* Mobile navbar items start */}
//       <ul
//         className={cn(
//           "fixed flex flex-col left-0 top-[-100%] z-40 size-full bg-brand-blue transition-all duration-300 pt-24 pb-12 px-5 text-white",
//           {
//             "top-0": isMenuActive,
//             "bg-white text-brand-blue": !isHeaderFixed,
//           }
//         )}
//       >
//         {navbarData.map((item) => (
//           <li key={item.id} className=" ">
//             {item.hasDropdown ? (
//               <div
//                 className="flex flex-1 items-center gap-2 py-5"
//                 onClick={() => {
//                   handleIsDropdownActive();
//                   handleActiveItem(item);
//                 }}
//               >
//                 <span>{item.title}</span>
//                 <span>
//                   <ChevronRight className="!size-4" />
//                 </span>
//               </div>
//             ) : (
//               <Link
//                 className="inline-block py-5"
//                 onClick={handleMenuActive}
//                 href={item.href}
//               >
//                 {item.title}
//               </Link>
//             )}
//           </li>
//         ))}
//         <li className="flex flex-1 items-end c-md:hidden">
//           <Button
//             onClick={handleMenuActive}
//             className={cn(
//               "rounded-full w-full py-6 c-sm:w-auto bg-white hover:text-brand-blue"
//             )}
//             variant="ghost"
//             size="icon"
//           >
//             <Link
//               href="/login"
//               className="flex items-center justify-center gap-2 text-brand-blue"
//             >
//               <CircleUserRound className="!size-6" strokeWidth={2} />
//               <span>Login</span>
//             </Link>
//           </Button>
//         </li>
//         <li>
//           <Button
//             onClick={handleMenuActive}
//             className={cn(
//               "c-md:hidde w-full py-6 c-sm:w-auto border border-solid border-white bg-transparent text-white shadow-none hover:bg-white hover:text-brand-blue mt-4 c-sm:mt-8",
//               {
//                 "border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white":
//                   !isHeaderFixed,
//               }
//             )}
//             asChild
//           >
//             <Link href="/contact">Contact Us</Link>
//           </Button>
//         </li>
//       </ul>
//       {/* Mobile navbar items end */}
//       {/* Inner panel start */}
//       <ul
//         className={cn(
//           "fixed left-[100%] top-0 z-[45] w-full h-screen bg-brand-blue transition-all duration-300 pt-20 pb-12 px-5 text-white",
//           {
//             "left-0": isDropdownActive,
//             "text-brand-blue bg-white": !isHeaderFixed,
//           }
//         )}
//       >
//         <div className="h-full overflow-y-scroll">
//           <Button
//             className="flex items-center  rounded-full bg-white p-0 px-4 text-brand-blue shadow-none hover:bg-brand-blue hover:text-white"
//             onClick={handleIsDropdownActive}
//           >
//             <span>
//               <ChevronLeft strokeWidth={3} />
//             </span>
//             <span className="text-xs font-semibold uppercase">
//               Back to Menu
//             </span>
//           </Button>
//           <div>
//             {activeItem &&
//               activeItem.dropdownContent({
//                 isHeaderFixed,
//                 handleActiveItem,
//                 handleIsDropdownActive,
//                 handleMenuActive,
//               })}
//           </div>
//         </div>
//       </ul>
//       {/* Inner panel end */}
//     </>
//   );
// };

// export default MobileNavbar;

"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Container from "../ui/Container";
import {
  Search,
  X,
  CircleUserRound,
  Menu,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import navbarData from "./navbarData";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function MobileNavbar() {
  const inputRef = useRef(null);

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [atTop, setAtTop] = useState(true);

  const pathname = usePathname();
  const isHome = pathname === "/";

  /* ================= SCROLL DETECTION ================= */
  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY === 0);
    };

    handleScroll(); // initial
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= BODY LOCK ================= */
  useEffect(() => {
    document.body.style.overflow =
      isMenuActive || isSearchActive ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isMenuActive, isSearchActive]);

  const handleMenuToggle = () => {
    setIsMenuActive((p) => !p);
    setIsSearchActive(false);
  };

  const handleSearchToggle = () => {
    setIsSearchActive((p) => !p);
    setIsMenuActive(false);
    if (!isSearchActive) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  };

  /* ================= HEADER STATE ================= */
  const isHeroPage = isHome || 
                     pathname === "/about" || 
                     pathname === "/faq" || 
                     pathname?.startsWith("/blogs") ||
                     pathname?.startsWith("/packages/");
  const showGradient = !isHeroPage || !atTop || isMenuActive || isSearchActive;

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 z-50 w-full c-lg:hidden">
        <Container>
          <div
            className={cn(
              "relative mx-auto rounded-full overflow-hidden transition-all duration-300",
              showGradient
                ? "backdrop-blur-xl border border-white/20 mt-4"
                : "border-transparent mt-0"
            )}
            style={{
              height: "64px",
              backgroundImage: "none",
              backgroundColor: showGradient
                ? "rgba(0, 0, 0, 0.6)"
                : "transparent",
              backdropFilter: "blur(16px)",
            }}
          >
            {/* NAV */}
            <nav
              className={cn(
                "flex h-16 items-center gap-4 px-5 text-white transition-all",
                isSearchActive && "opacity-0 scale-95"
              )}
            >
              <Link href="/">
                <Image
                  src="/img/logo.svg"
                  alt="Logo"
                  width={140}
                  height={28}
                  className="w-[120px]"
                />
              </Link>

              <div className="ml-auto flex items-center gap-3">
                {!isHome && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSearchToggle}
                    className="text-white hover:bg-white/20"
                  >
                    <Search />
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleMenuToggle}
                  className="text-white hover:bg-white/20"
                >
                  {isMenuActive ? <X /> : <Menu />}
                </Button>
              </div>
            </nav>

            {/* SEARCH */}
            <div
              className={cn(
                "absolute inset-0 flex items-center px-5 transition-all",
                isSearchActive ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
            >
              <div className="flex w-full items-center gap-3 rounded-full bg-white px-5 py-3">
                <Search className="text-slate-400" />
                <Input
                  ref={inputRef}
                  className="border-0 focus:ring-0"
                  placeholder="Search packages, destinations…"
                />
                <Button
                  size="icon"
                  className="rounded-full bg-brand-blue text-white"
                  onClick={handleSearchToggle}
                >
                  <X />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* ================= MENU DRAWER ================= */}
      <ul
        className={cn(
          "fixed inset-0 z-40 flex flex-col pt-28 px-6 text-white transition-transform duration-300",
          isMenuActive ? "translate-y-0" : "-translate-y-full"
        )}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(16px)",
        }}
      >
        {navbarData.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between py-5 text-lg border-b border-white/20"
          >
            {item.hasDropdown ? (
              <button
                className="flex w-full justify-between"
                onClick={() => {
                  setActiveItem(item);
                  setIsDropdownActive(true);
                }}
              >
                {item.title}
                <ChevronRight />
              </button>
            ) : (
              <Link href={item.href} onClick={handleMenuToggle}>
                {item.title}
              </Link>
            )}
          </li>
        ))}

        <div className="mt-auto space-y-4">
          <Link
            href="/login"
            onClick={handleMenuToggle}
            className="flex justify-center gap-2 rounded-full bg-white py-3 text-brand-blue"
          >
            <CircleUserRound /> Login
          </Link>

          <Link
            href="/contact"
            onClick={handleMenuToggle}
            className="block text-center rounded-full border border-white py-3"
          >
            Contact Us
          </Link>
        </div>
      </ul>

      {/* ================= DROPDOWN ================= */}
      <ul
        className={cn(
          "fixed inset-0 z-[45] bg-white text-brand-blue transition-transform duration-300 pt-24 px-6",
          isDropdownActive ? "translate-x-0" : "translate-x-full"
        )}
      >
        <Button
          onClick={() => setIsDropdownActive(false)}
          className="mb-6 flex gap-2 rounded-full bg-brand-blue text-white px-4 py-2"
        >
          <ChevronLeft /> Back
        </Button>

        {activeItem &&
          activeItem.dropdownContent({
            handleMenuActive: () => {
              setIsDropdownActive(false);
              setIsMenuActive(false);
            },
          })}
      </ul>
    </>
  );
}
