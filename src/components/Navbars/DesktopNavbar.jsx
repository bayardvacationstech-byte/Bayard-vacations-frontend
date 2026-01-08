"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Container from "../ui/Container";
import {
  ChevronDown,
  CircleUserRound,
  MoveRight,
  Radius,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import navbarData from "./navbarData";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { useDebounce } from "@/hooks/useDebounce";
import { TRENDING_PACKAGES, SEARCH_API } from "@/config";

const DesktopNavbar = () => {
  const inputRef = useRef(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [previousDropdown, setPreviousDropdown] = useState(null);
  const [dropdownHeights, setDropdownHeights] = useState({});
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isHoverDisabled, setIsHoverDisabled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 500);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  // Header should be fixed/sticky on all pages for a premium feel
  const [isHeaderFixed, setIsHeaderFixed] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Pages that have a large dark hero banner should start transparent
  const isHeroPage = isHomePage || 
                     pathname === "/about" || 
                     pathname === "/faq" || 
                     pathname?.startsWith("/blogs") ||
                     pathname?.startsWith("/packages/");

  useEffect(() => {
    if (!isHeroPage) {
      setIsScrolled(true); // always solid on pages without heroes
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHeroPage, pathname]);

  const measureRef = useRef(null);

  useEffect(() => {
    const fetchPackages = async () => {
      if (debouncedSearch.trim() && debouncedSearch.length > 1) {
        setIsLoading(true);
        try {
          const response = await SEARCH_API.get("/", {
            params: { q: debouncedSearch },
          });
          setSearchResults(response.data || []);
        } catch (error) {
          console.error("Error searching packages:", error);
          setSearchResults([]);
        }
        setIsLoading(false);
      } else {
        setSearchResults([]);
      }
    };

    fetchPackages();
  }, [debouncedSearch]);

  const handleIsSearchActive = () => {
    if (isSearchActive) {
      setIsHoverDisabled(true);
      setTimeout(() => {
        setIsHoverDisabled(false);
      }, 2000);
    }
    setIsSearchActive(!isSearchActive);
    if (isSearchActive) {
      setSearchTerm("");
      setSearchResults([]);
    }
    if (activeDropdown) {
      handleMouseLeave();
    }
  };

  const measureHeight = () => {
    if (measureRef.current && activeDropdown) {
      const height = measureRef.current.offsetHeight + 64;
      setDropdownHeights((prev) => ({
        ...prev,
        [activeDropdown.id]: height,
      }));
    }
  };

  useEffect(() => {
    measureHeight();
    // eslint-disable-next-line
  }, [activeDropdown]);

  const handleMouseOver = (item) => {
    if (isHoverDisabled) return;

    if (item.hasDropdown) {
      if (activeDropdown?.id !== item.id) {
        setPreviousDropdown(activeDropdown);
        setActiveDropdown(item);
      }
    } else {
      setPreviousDropdown(activeDropdown);
      setActiveDropdown(null);
    }
  };

  const handleMouseLeave = () => {
    setPreviousDropdown(activeDropdown);
    setActiveDropdown(null);
  };

  const getAnimationDirection = () => {
    if (!activeDropdown) return "none";
    if (!previousDropdown) return "right";

    const prevIndex = navbarData.findIndex(
      (item) => item.id === previousDropdown.id
    );
    const currentIndex = navbarData.findIndex(
      (item) => item.id === activeDropdown.id
    );

    return prevIndex < currentIndex ? "right" : "left";
  };

  const getCurrentHeight = () => {
    if (!activeDropdown) return "64px";
    return `${dropdownHeights[activeDropdown.id] + 20}px` || "64px";
  };

  return (
    <>
      <header
        className={cn(
          "fixed z-[100] hidden w-full py-2 c-lg:block desktop-header",
          {
            absolute: !isHeaderFixed,
          }
        )}
      >
        <Container>
          <style jsx global>{`
            @keyframes slideFromLeft {
              from {
                opacity: 0;
                transform: translateX(-4rem);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }

            @keyframes slideFromRight {
              from {
                opacity: 0;
                transform: translateX(4rem);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }

            .slide-from-left {
              animation: slideFromLeft 0.3s ease-out forwards;
            }

            .slide-from-right {
              animation: slideFromRight 0.3s ease-out forwards;
            }
          `}</style>

          <div
            className={cn(
              "relative mx-auto overflow-hidden rounded px-7 transition-all duration-300 ease-in-out",
              {
                "border border-solid border-white/30 backdrop-blur-3xl":
                  !isHeaderFixed,
              }
            )}
            style={{
              height: getCurrentHeight(),
              maxWidth: isSearchActive ? "800px" : "100%",
              borderRadius: "50px",

              backgroundImage:
                isHomePage && !isScrolled && !isSearchActive
                  ? "none"
                  : "none",
              backgroundColor:
                isHeroPage && !isScrolled && !isSearchActive
                  ? "transparent"
                  : "rgba(0, 0, 0, 0.6)", // Dark Glass
              backdropFilter: "blur(16px)", // Ensure blur is applied
              animation: "none",

              transition: `
    height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    max-width 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    border-radius 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    background-image 0.3s ease
  `,
            }}
            //             style={{
            //               height: getCurrentHeight(),
            //               maxWidth: isSearchActive ? "800px" : "100%",
            //               backgroundColor:
            //                 isHomePage && !isScrolled && !isSearchActive
            //                   ? "transparent"
            //                   : "#0146b3",
            //               borderRadius: "50px",
            //               transition: `
            //   height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
            //   max-width 0.4s cubic-bezier(0.4, 0, 0.2, 1),
            //   background-color 0.3s ease,
            //   border-radius 0.4s cubic-bezier(0.4, 0, 0.2, 1)
            // `,
            //             }}
            onMouseLeave={handleMouseLeave}
          >
            <nav
              className={cn(
                "h-16 flex items-center gap-4 text-white transition-all duration-300 ease-in-out",
                {
                  "opacity-0 h-0 scale-95": isSearchActive,
                  "opacity-100 scale-100": !isSearchActive,

                  "text-brand-blue": !isHeaderFixed,
                }
              )}
            >
              <Link href="/" onMouseOver={() => setActiveDropdown(null)}>
                <Image
                  priority
                  width={220}
                  height={44}
                  alt="Bayard Vacations Logo"
                  src={isHeaderFixed ? "/img/logo.svg" : "/media/logo.svg"}
                  className="w-48 sm:w-56 transition-all duration-300"
                />
              </Link>
              <ul className="mx-auto flex gap-8">
                {navbarData.map((item) => (
                  <li key={item.id} onMouseOver={() => handleMouseOver(item)}>
                    <Link
                      href={item?.href || "/"}
                      className="relative flex items-center gap-1 rounded-full text-[16px] font-semibold ease-out after:absolute after:bottom-0 after:left-0 after:inline-block  after:h-px after:w-full after:translate-y-1 after:scale-x-0 after:bg-[#59DF02] after:transition-all after:duration-300 after:content-[''] hover:after:scale-x-100"
                    >
                      <span>{item.title}</span>
                      {item.hasDropdown && <ChevronDown className="size-4" />}
                    </Link>
                  </li>
                ))}
              </ul>
              {!isHomePage && (
                <Button
                  className={cn(
                    "rounded-full text-white hover:text-brand-blue",
                    {
                      "text-brand-blue": !isHeaderFixed,
                    }
                  )}
                  variant="ghost"
                  size="icon"
                  onClick={handleIsSearchActive}
                  onMouseOver={() => setActiveDropdown(null)}
                >
                  <Search />
                </Button>
              )}
              <Button
                className={cn("rounded-full text-white hover:text-brand-blue", {
                  "text-brand-blue": !isHeaderFixed,
                })}
                variant="ghost"
                size="icon"
                onMouseOver={() => setActiveDropdown(null)}
              >
                <Link
                  href="/login"
                  className="flex items-center justify-center"
                >
                  <CircleUserRound className="!size-6" strokeWidth={1.5} />
                </Link>
              </Button>

              <Button
                onMouseOver={() => setActiveDropdown(null)}
                className={cn(
                  "border-2 border-solid border-white bg-transparent text-white shadow-none hover:bg-white hover:text-brand-blue rounded",
                  {
                    "border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white":
                      !isHeaderFixed,
                  }
                )}
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </nav>

            {activeDropdown !== null && (
              <div
                ref={measureRef}
                key={activeDropdown.id}
                className={cn(
                  "relative w-full backdrop-blur-2xl transition-all duration-300",
                  "rounded-2xl",
                  isScrolled
                    ? "bg-black/80 border-white/10"
                    : "bg-white/25 border-white/30",
                  "border-t",
                  getAnimationDirection() === "left"
                    ? "slide-from-left"
                    : getAnimationDirection() === "right"
                      ? "slide-from-right"
                      : "opacity-0"
                )}
              >
                {activeDropdown.dropdownContent({
                  isHeaderFixed,
                  setActiveDropdown,
                })}
              </div>
            )}

            <div
              className={cn(
                "absolute top-0 left-1/2 -translate-x-1/2 h-full transition-all duration-300 ease-in-out flex items-center overflow-hidden",
                {
                  "w-0 opacity-0": !isSearchActive,
                  "w-full opacity-100": isSearchActive,
                }
              )}
            >
              <div
                className={cn(
                  "w-full h-16 bg-blue-200 transition-all duration-300 ease-in-out transform rounded flex items-center px-8",
                  {
                    "opacity-0 scale-95": !isSearchActive,
                    "opacity-100 scale-100": isSearchActive,
                  }
                )}
              >
                <div>
                  <Search className="text-slate-400 size-5" />
                </div>
                <div className="h-full flex-1 px-3">
                  <Input
                    ref={inputRef}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-full border-0 text-base text-slate-700 shadow-none placeholder:text-slate-400 focus-visible:ring-0"
                    placeholder="Search for Packages, Destinations etc."
                  />
                </div>
                <div>
                  <Button
                    className="size-6 rounded-full bg-white p-0 text-brand-blue shadow-none hover:bg-brand-blue hover:text-white"
                    onClick={handleIsSearchActive}
                  >
                    <X />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </header>
      {/* Search panel content start */}
      <div
        className={cn(
          "bg-blue-50 fixed top-[20px] left-1/2 -translate-x-1/2 z-[99] rounded overflow-hidden transition-all duration-300 ease-in-out origin-bottom",
          {
            "h-0 opacity-0": !isSearchActive,
            "h-[50vh] opacity-100": isSearchActive,
          }
        )}
        style={{
          maxWidth: "800px",
          width: "100%",
          pointerEvents: isSearchActive ? "auto" : "none",
        }}
      >
        <div className="mt-24 h-4/5 overflow-y-auto px-9">
          {isLoading && searchTerm.length > 0 ? (
            <p className="text-sm text-slate-500">Searching packages...</p>
          ) : (
            <>
              {/* Regions Section */}
              {searchResults.regions?.length > 0 && (
                <>
                  <h4 className="mb-4 text-sm text-slate-500">Regions</h4>
                  <ul className="space-y-4 text-brand-blue">
                    {searchResults.regions.map((region) => (
                      <li key={region.id}>
                        <Link
                          href={`/packages/${region.slug}`}
                          className="flex items-center gap-3"
                        >
                          <MoveRight />
                          <span>{region.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <hr className="my-4 border-t border-gray-300" />
                </>
              )}

              {/* Available Packages Section */}
              {searchResults.packages?.length > 0 ? (
                <>
                  <h4 className="mb-4 text-sm text-slate-500">
                    Available Packages
                  </h4>
                  <ul className="space-y-4 text-brand-blue">
                    {searchResults.packages.map((pkg) => (
                      <li key={pkg.id}>
                        <Link
                          href={`/packages/${pkg.region}/${pkg.packageSlug}`}
                          className="flex items-center gap-3"
                          onClick={() => {
                            handleIsSearchActive();
                            setSearchTerm("");
                          }}
                        >
                          <MoveRight />
                          <span>{pkg.packageName}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : searchTerm.length > 0 ||
                (isLoading && debouncedSearch.length > 0) ? (
                <p className="text-sm text-slate-500">No packages found</p>
              ) : (
                <>
                  <h4 className="mb-4 text-sm text-slate-500">Quick Links</h4>
                  <ul className="space-y-4 text-brand-blue">
                    {TRENDING_PACKAGES.map((pkg) => (
                      <li key={pkg}>
                        <Link
                          href={`/packages/${pkg}`}
                          className="flex items-center gap-3"
                        >
                          <MoveRight />
                          <span className="capitalize">{pkg}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Search panel content end */}
    </>
  );
};

export default DesktopNavbar;
