"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft,
  MapPin,
  Heart,
  Star,
  Sparkles,
  Camera,
  Globe,
  Compass,
  Users,
  Clock,
  Zap,
  Coffee,
  Trees,
  CloudSun,
  Palette,
  Mountain,
  ChevronUp,
  ChevronRight,
  Info,
  X
} from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import ActivityCard from "@/components/ui/ActivityCard";
import GalleryCarousel from "@/components/ui/GalleryCarousel";
import WhyBayardVacations from "@/components/Packages/WhyBayardVacations";
import { cn } from "@/lib/utils";

export default function WhyChooseRegionClient({ regionSlug }) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState({ title: "", images: [] });
  const regionName = regionSlug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Centralized Region Data
  const ALL_REGION_DATA = {
    azerbaijan: {
      heroImage: "https://images.unsplash.com/photo-1541810271221-23d612fc27df?q=80&w=2070",
      overview: "Azerbaijan, the 'Land of Fire', is a breathtaking symphony of ancient heritage and futuristic ambition. From the natural gas flames of Yanar Dag to the hyper-modern skyline of Baku, it offers a travel experience that exists nowhere else on Earth.",
      whyVisit: "Venture into a land where East truly meets West. Azerbaijan captivates with its unique blend of Persian, Turkish, and Soviet influences, all set against a backdrop of diverse landscapes ranging from semi-deserts to the snow-capped Caucasus Mountains.",
      highlights: [
        { 
          slug: "ancient-wonders",
          title: "Ancient Wonders", 
          description: "Step back in time through millennia of history, from prehistoric rock art to medieval palaces.", 
          icon: Sparkles,
          detailedContent: "Azerbaijan is a treasure trove of ancient history. From the 40,000-year-old petroglyphs in Gobustan to the Maiden Tower in Baku, the country offers a unique portal into the civilizations that shaped the Caucasus. Experience the intersection of Zoroastrianism, Islam, and early Christianity in one land.",
          keyFacts: [
            "Gobustan Reserve features over 6,000 rock engravings dating back to the Upper Paleolithic.",
            "Icherisheher (Old City) is the first location in Azerbaijan to be classified as a UNESCO World Heritage Site.",
            "The Ateshgah Fire Temple was a pilgrimage site for centuries for fire-worshippers."
          ],
          gallery: [
            { url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200", caption: "Ancient stone structures and historical ruins" },
            { url: "https://images.unsplash.com/photo-1534349762230-e0cadf78f505?w=1200", caption: "Icherisheher - The medieval heart of Baku" },
            { url: "https://images.unsplash.com/photo-1543833078-4389945037be?w=1200", caption: "Maiden Tower - A mysterious symbol of history" }
          ]
        },
        { 
          slug: "mountain-peaks",
          title: "Mountain Peaks", 
          description: "Conquer the majestic Great Caucasus Mountains and discover hidden alpine villages.", 
          icon: Mountain,
          detailedContent: "The Great Caucasus range defines the northern border of Azerbaijan, offering some of Europe's most dramatic and pristine mountain scenery. Whether it's the snow-capped peaks of Shahdag or the isolated village of Khinalug, the mountains are a paradise for hikers and winter sports enthusiasts.",
          keyFacts: [
            "Mount Bazarduzu is the highest peak in Azerbaijan, rising to 4,466 meters.",
            "Khinalug is one of the highest continuously inhabited villages in Europe.",
            "Shahdag and Tufandag resorts offer world-class skiing and winter adventure."
          ],
          gallery: [
            { url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200", caption: "The breathtaking majesty of the Caucasus Mountains" },
            { url: "https://images.unsplash.com/photo-1520113232658-f913d8283f1d?w=1200", caption: "Mountain vistas and alpine resorts" },
            { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200", caption: "Remote mountain trails and peaks" }
          ]
        },
        { 
          slug: "cultural-heritage",
          title: "Cultural Heritage", 
          description: "Experience a unique blend of Eastern traditions and Western influences in dance, music, and art.", 
          icon: Globe,
          detailedContent: "Azerbaijan's culture is a vibrant tapestry woven from Persian, Turkic, Russian, and Soviet influences. From the soulful melodies of Mugham music to the intricate patterns of Azerbaijani carpets, the nation's heritage is preserved and celebrated with immense pride.",
          keyFacts: [
            "Mugham is recognized by UNESCO as a Masterpiece of the Oral and Intangible Heritage of Humanity.",
            "Azerbaijani carpet weaving is an ancient art passed down through generations.",
            "The country was the first in the Islamic world to establish a democratic republic and an opera house."
          ],
          gallery: [
            { url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200", caption: "Traditional architecture and decorative arts" },
            { url: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=1200", caption: "Historical cultural sites and monuments" },
            { url: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200", caption: "Intricate frescoes and stained glass heritage" }
          ]
        },
        { 
          slug: "scenic-beauty",
          title: "Scenic Beauty", 
          description: "From semi-deserts to lush forests and emerald lakes, explore Azerbaijan's diverse landscapes.", 
          icon: Trees,
          detailedContent: "With 9 out of 11 climate zones existing within its borders, Azerbaijan offers an incredible variety of natural scenery. Explore the 'Iron Trees' of Hirkan National Park, the emerald waters of Lake Noyur, or the surreal mud volcanoes of Gobustan.",
          keyFacts: [
            "Hirean National Park is home to the rare Persian Leopard and ancient Iron Trees.",
            "Goygol Lake is considered the most beautiful lake in Azerbaijan, formed by an earthquake in 1139.",
            "The country contains nearly half of the world's mud volcanoes."
          ],
          gallery: [
            { url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200", caption: "Pristine lakes and lush landscapes" },
            { url: "https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?w=1200", caption: "Dramatic natural formations" },
            { url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200", caption: "Serene forests and natural parks" }
          ]
        },
        { 
          slug: "paradise-beach",
          title: "Paradise Beach", 
          description: "Relax on the sunny shores of the Caspian Sea, the world's largest inland body of water.", 
          icon: MapPin,
          detailedContent: "The Absheron Peninsula is dotted with resorts and beach clubs that come alive during the summer. Whether you're looking for luxury beach retreats or quiet shores to watch the sunset over the Caspian Sea, Azerbaijan's coast offers a unique 'sea and sun' experience.",
          keyFacts: [
            "The Caspian Sea is technically the world's largest lake, but feels like an ocean.",
            "Baku Boulevard is one of the longest seaside promenades globally.",
            "Sea breeze from the Caspian keeps Baku relatively mild even in the height of summer."
          ],
          gallery: [
            { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200", caption: "Golden sands and blue waters of the Caspian" },
            { url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200", caption: "Seaside resorts and coastline views" },
            { url: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1200", caption: "Luxury waterfront experiences" }
          ]
        },
        { 
          slug: "adventure-awaits",
          title: "Adventure Awaits", 
          description: "Push your limits with off-road expeditions, paragliding, or hiking in the wild.", 
          icon: Zap,
          detailedContent: "For those seeking an adrenaline rush, Azerbaijan is an emerging adventure hub. From 4x4 off-roading across semi-deserts to paragliding over the Caucasus foothills, there's always a new way to experience the wild beauty of the Land of Fire.",
          keyFacts: [
            "Gabala is a center for adventure sports including quad biking and paragliding.",
            "The Tufandag Mountain Resort offers high-altitude cable car rides and hiking.",
            "Caspian Sea offers opportunities for windsurfing and sailing."
          ],
          gallery: [
            { url: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1200", caption: "High-adrenaline mountain adventures" },
            { url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200", caption: "Off-road explorations and trekking" },
            { url: "https://images.unsplash.com/photo-1533619239233-628ce623a728?w=1200", caption: "Discovering the wild frontiers" }
          ]
        },
        { 
          slug: "local-traditions",
          title: "Local Traditions", 
          description: "Immerse yourself in authentic village life and century-old customs of hospitality.", 
          icon: Heart,
          detailedContent: "In Azerbaijan, hospitality is not just a custom—it's a way of life. Visit rural villages to experience the traditional tea culture, learn about the 'Novruz' spring festival, and witness how modern Azerbaijanis hold onto their deep-rooted values while embracing the future.",
          keyFacts: [
            "Tea (chay) is the national drink and served at every social gathering.",
            "Novruz is the most important holiday, celebrating the spring equinox and new life.",
            "Azerbaijani hospitality means 'the guest is the light of the house'."
          ],
          gallery: [
            { url: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=1200", caption: "Traditional tea culture and village life" },
            { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200", caption: "Folk crafts and local customs" },
            { url: "https://images.unsplash.com/photo-1534349762230-e0cadf78f505?w=1200", caption: "Heritage in every corner" }
          ]
        },
        { 
          slug: "hidden-gems",
          title: "Hidden Gems", 
          description: "Discover off-the-beaten-path locations that reveal the true soul of Azerbaijan.", 
          icon: MapPin,
          detailedContent: "Beyond the capital city lie secrets waiting to be discovered. Visit the Candy Cane Mountains with their striped colorful peaks, explore the salt tunnels of Duzdag, or go to the village of Lahij, famous for its copper artisans.",
          keyFacts: [
            "The Candy Cane Mountains get their name from their unique oxidative iron and clay layers.",
            "Duzdag Salt Mountain contains tunnels used for respiratory health therapy.",
            "Lahij is a uniquely preserved historical-architectural reserve build around copper craft."
          ],
          gallery: [
            { url: "https://images.unsplash.com/photo-1533619239233-628ce623a728?w=1200", caption: "The surreal Candy Cane Mountains" },
            { url: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=1200", caption: "Enigmatic landscapes off the beaten path" },
            { url: "https://images.unsplash.com/photo-1541810271221-23d612fc27df?w=1200", caption: "Untouched majesty in remote regions" }
          ]
        }
      ],
      attractions: [
        {
          name: "Gobustan Reserve",
          category: "UNESCO Heritage",
          description: "A UNESCO site featuring 6,000+ rock engravings dating back 40,000 years, plus the famous bubbling mud volcanoes.",
          image: "https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?q=80&w=2070",
          duration: "Half Day",
          difficulty: "Easy",
          icon: Globe
        },
        {
          name: "Icherisheher (Old City)",
          category: "History & Culture",
          description: "The historic heart of Baku, featuring the Shirvanshah's Palace and the mysterious Maiden Tower.",
          image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f505?q=80&w=2070",
          duration: "Full Day",
          difficulty: "Easy",
          icon: Clock
        },
        {
          name: "Flame Towers",
          category: "Modern Landmark",
          description: "The trio of LED-covered skyscrapers that transform Baku's skyline into a breathtaking light show every evening.",
          image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2070",
          duration: "2-3 Hours",
          difficulty: "Easy",
          icon: Camera
        },
        {
          name: "Heydar Aliyev Center",
          category: "Architectural Marvel",
          description: "Zaha Hadid's architectural masterpiece, known for its flowing, curved design and innovative exhibits.",
          image: "https://images.unsplash.com/photo-1543833078-4389945037be?q=80&w=2070",
          duration: "3-4 Hours",
          difficulty: "Easy",
          icon: Palette
        },
        {
          name: "Sheki Khan's Palace",
          category: "Heritage",
          description: "An 18th-century royal summer residence featuring exquisite stained-glass windows (shebeke) and intricate frescoes.",
          image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=2070",
          duration: "2 Hours",
          difficulty: "Easy",
          icon: Compass
        },
        {
          name: "Tufandag Mountain Resort",
          category: "Adventure",
          description: "Gabala's premier mountain destination offering year-round cable car rides and stunning views of the Great Caucasus.",
          image: "https://images.unsplash.com/photo-1520113232658-f913d8283f1d?q=80&w=2070",
          duration: "Full Day",
          difficulty: "Intermediate",
          icon: Mountain
        }
      ],
      travelStyles: [
        { type: "For Nature Lovers", desc: "From the snow-capped Caucasus to the subtropical forests of Lankaran.", icon: Trees },
        { type: "For History Buffs", desc: "Thousands of years of history across Persian, Ottoman, and Soviet eras.", icon: Clock },
        { type: "For Foodies", desc: "A culinary journey of 30+ types of Dolma and the legendary Saffron Plov.", icon: Coffee },
        { type: "For Adventure", desc: "Skiing in Shahdag, hiking in Khinalug, or off-roading in mud volcano fields.", icon: Zap }
      ],
      secrets: [
        { title: "The Salt Mountain", desc: "Duzdag is a salt mountain where the air is so pure it's used for respiratory therapy.", icon: Sparkles },
        { title: "World's First Oil Well", desc: "The world's first industrial oil well was drilled right here in Baku back in 1846.", icon: Globe },
        { title: "The Village in the Clouds", desc: "Khinalug is one of the highest continuously inhabited villages in Europe.", icon: Compass }
      ],
      seasonalGuide: [
        { season: "Spring (Mar-May)", highlight: "Novruz celebrations, blooming wild flowers, and mild hiking weather.", status: "Peak Beauty" },
        { season: "Summer (Jun-Aug)", highlight: "Beach clubs on the Caspian, hiking in high Caucasus, and Gabala mountain air.", status: "Beach & Mountains" },
        { season: "Autumn (Sep-Oct)", highlight: "Pomegranate festivals and perfect sightseeing temperatures across the country.", status: "Best Harvest" },
        { season: "Winter (Nov-Feb)", highlight: "World-class skiing at Shahdag and Tufandag resorts, and cozy Baku tea houses.", status: "Ski Season" }
      ]
    }
  };

  const regionData = ALL_REGION_DATA[regionSlug] || {
    featuredImage: "/img/default-region.jpg",
    overview: `${regionName} is a captivating destination that offers an unforgettable blend of culture, natural beauty, and unique experiences.`,
    whyVisit: `Discover the magic of ${regionName}, where every corner tells a story and every experience creates lasting memories.`,
    highlights: [],
    attractions: []
  };
  
  const highlights = regionData?.highlights || [];
  const attractions = regionData?.attractions || [];
  
  return (
    <>
      {/* Gallery Carousel Popup */}
      <GalleryCarousel
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        images={selectedGallery.images}
        title={selectedGallery.title}
      />

      <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <Image
          src={regionData?.featuredImage || regionData?.heroImage || "/img/default-region.jpg"}
          alt={regionName || "Region Gallery"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        
        <Container className="relative h-full flex flex-col justify-between py-8 md:py-12">
          {/* Back Button */}
          <Link href={`/packages/${regionSlug}`}>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 backdrop-blur-sm gap-2 font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {regionName} Portfolios
            </Button>
          </Link>

          {/* Hero Content */}
          <div className="space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 backdrop-blur-md rounded-full border border-amber-500/30 mb-4">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-amber-300 uppercase tracking-widest">
                  Why Visit
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter">
                Why Choose<br />
                <span className="text-amber-400">{regionName}?</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg md:text-2xl text-white/90 max-w-4xl font-medium leading-relaxed drop-shadow-lg"
            >
              {regionData?.overview}
            </motion.p>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-8 md:py-12">
        {/* Why Visit Section */}
        <section className="mb-8 md:mb-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-2 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-black uppercase tracking-widest mb-6">
                 The Land of Fire
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                Why Visit Azerbaijan?
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Discover a destination where ancient traditions meet futuristic innovation, 
                creating an unforgettable travel experience unlike anywhere else on Earth.
              </p>
            </div>

            {/* Reasons List - Responsive Layout */}
            <div className="space-y-8 md:space-y-6">
              {/* Reason 1 */}
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center text-white shadow-md">
                    <Globe className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-3xl font-black text-slate-900 mb-1 md:mb-2">Where East Meets West</h3>
                  <p className="text-sm md:text-lg text-slate-600 leading-relaxed">
                    Azerbaijan sits at the crossroads of Europe and Asia, offering a unique cultural tapestry woven from Persian, 
                    Turkish, Russian, and Soviet influences. 
                  </p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              {/* Reason 2 */}
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-md">
                    <Mountain className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-3xl font-black text-slate-900 mb-1 md:mb-2">Extraordinary Natural Beauty</h3>
                  <p className="text-sm md:text-lg text-slate-600 leading-relaxed">
                    From the eternal flames of Yanar Dag to the bubbling mud volcanoes of Gobustan, Azerbaijan's landscapes 
                    defy imagination.
                  </p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              {/* Reason 3 */}
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white shadow-md">
                    <Clock className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-3xl font-black text-slate-900 mb-1 md:mb-2">Millennia of History</h3>
                  <p className="text-sm md:text-lg text-slate-600 leading-relaxed">
                    Walk through 40,000 years of human civilization at Gobustan's rock art galleries, explore medieval 
                    caravanserais along the Silk Road, and marvel at the intricate craftsmanship of the Sheki Khan's Palace. 
                  </p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              {/* Reason 4 */}
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-md">
                    <Coffee className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-3xl font-black text-slate-900 mb-1 md:mb-2">A Gastronomic Paradise</h3>
                  <p className="text-sm md:text-lg text-slate-600 leading-relaxed">
                    Azerbaijani cuisine is a celebration of flavors, with over 30 varieties of dolma, aromatic saffron plov, 
                    and succulent kebabs. The country's culinary traditions reflect its position as a historic trading hub.
                  </p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              {/* Reason 5 */}
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-md">
                    <Camera className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-3xl font-black text-slate-900 mb-1 md:mb-2">Futuristic Architecture</h3>
                  <p className="text-sm md:text-lg text-slate-600 leading-relaxed">
                    Baku's skyline is a testament to architectural ambition, featuring Zaha Hadid's flowing Heydar Aliyev Center 
                    and the LED-lit Flame Towers that illuminate the night sky.
                  </p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              {/* Reason 6 */}
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-400 to-violet-600 rounded-2xl flex items-center justify-center text-white shadow-md">
                    <Users className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-3xl font-black text-slate-900 mb-1 md:mb-2">Legendary Hospitality</h3>
                  <p className="text-sm md:text-lg text-slate-600 leading-relaxed">
                    Azerbaijanis are renowned for their warmth and generosity. The national saying "Qonaq gələndə, bərəkət gələr" 
                    reflects the deep-rooted tradition of welcoming visitors.
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Quote */}
            <div className="mt-10 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 md:p-10 text-center">
              <blockquote className="text-xl md:text-2xl font-bold text-white leading-relaxed mb-4">
                "Azerbaijan is not just a destination—it's a journey through time, 
                where ancient flames still burn and modern dreams take flight."
              </blockquote>
              <p className="text-slate-300 font-medium">— Travel & Leisure Magazine</p>
            </div>
          </div>
        </section>

        {/* Key Highlights */}
        {regionData.highlights && (
          <section className="mb-16 md:mb-24">
            <Container>
              <div className="text-center mb-10">
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
                  Key Highlights
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
                  The unique pillars that define {regionName}'s identity.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regionData.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100/50 hover:shadow-2xl hover:border-brand-gold/20 transition-all duration-500"
                  >
                    {/* Image Header */}
                    <div className="relative h-56 md:h-64 overflow-hidden">
                      <Image
                        src={highlight.gallery?.[0]?.url || "https://images.unsplash.com/photo-1541810271221-23d612fc27df?w=800"}
                        alt={highlight.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-6 left-6">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 text-white group-hover:bg-brand-gold group-hover:border-brand-gold transition-colors">
                          {highlight.icon && <highlight.icon className="w-7 h-7" />}
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:p-10 flex flex-col flex-1">
                      <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight">
                        {highlight.title}
                      </h3>
                      <p className="text-sm md:text-slate-600 font-medium leading-relaxed mb-6 md:mb-8 flex-1">
                        {highlight.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto gap-4">
                        <button 
                          onClick={() => {
                            setSelectedGallery({ title: highlight.title, images: highlight.gallery || [] });
                            setGalleryOpen(true);
                          }}
                          className="flex items-center gap-2 text-brand-blue font-bold text-xs md:text-sm hover:gap-3 transition-all shrink-0"
                        >
                          <Camera className="w-4 h-4" />
                          <span className="hidden sm:inline">View Gallery</span>
                          <span className="sm:hidden">Gallery</span>
                        </button>
                        
                        <Link 
                          href={`#${highlight.slug || highlight.title.toLowerCase().replace(/ /g, "-")}`}
                          className="px-4 md:px-6 py-2 md:py-2.5 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-900 font-black rounded-xl text-[10px] md:text-xs uppercase tracking-widest transition-all text-center flex-1 sm:flex-none"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Detailed Highlight Sections */}
        {regionData.highlights && (
          <section className="mb-16 md:mb-24 space-y-16 md:space-y-24">
            {regionData.highlights.map((highlight, index) => (
              <div 
                key={index} 
                id={highlight.slug || highlight.title.toLowerCase().replace(/ /g, "-")}
                className="scroll-mt-20 md:scroll-mt-24"
              >
                <Container>
                  <div className={cn(
                    "flex flex-col lg:items-center gap-8 md:gap-16",
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  )}>
                    {/* Visual content (Higher priority for mobile mobile) */}
                    <div className="flex-1 order-1 lg:order-none">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                      >
                        {/* Main Image */}
                        <div className="relative h-[250px] sm:h-[400px] md:h-[500px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl z-10 group">
                          <Image
                            src={highlight.gallery?.[1]?.url || highlight.gallery?.[0]?.url || "https://images.unsplash.com/photo-1541810271221-23d612fc27df?w=1200"}
                            alt={highlight.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 p-4 md:p-8 bg-black/20 backdrop-blur-md rounded-xl md:rounded-2xl border border-white/20">
                            <p className="text-white text-sm md:text-lg font-bold leading-relaxed italic">
                              "{highlight.gallery?.[1]?.caption || highlight.gallery?.[0]?.caption || highlight.description}"
                            </p>
                          </div>
                        </div>

                        {/* Decorative elements */}
                        <div className={cn(
                          "absolute -top-6 -right-6 md:-top-10 md:-right-10 w-24 h-24 md:w-40 md:h-40 bg-brand-gold/10 rounded-full blur-2xl md:blur-3xl",
                          index % 2 !== 0 && "right-auto -left-6 md:-left-10"
                        )} />
                        
                        {/* Floating stats or badges (hidden on smallest screens) */}
                        <div className={cn(
                          "absolute top-10 -right-4 md:top-20 md:-right-8 z-20 bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl border border-slate-100 hidden sm:block",
                          index % 2 !== 0 && "right-auto -left-4 md:-left-8"
                        )}>
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-500 rounded-xl md:rounded-2xl flex items-center justify-center text-white">
                              <Star className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div>
                               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rating</p>
                               <p className="text-lg md:text-xl font-black text-slate-900">4.9/5.0</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Text content */}
                    <div className="flex-1 space-y-6 md:space-y-8 order-2 lg:order-none">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                      >
                         <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-gold/10 text-brand-gold rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest mb-4 md:mb-6 border border-brand-gold/20">
                            <Sparkles className="w-3 md:w-3.5 h-3 md:h-3.5" />
                            Highlight No. 0{index + 1}
                         </div>
                         <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight leading-tight">
                            {highlight.title}
                         </h2>
                         <p className="text-lg md:text-2xl font-bold text-slate-500 mb-6 md:mb-8 leading-relaxed">
                            {highlight.description}
                         </p>
                         
                         <div className="h-1 w-16 md:w-20 bg-brand-gold rounded-full mb-6 md:mb-8" />
                         
                         <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8 md:mb-10">
                            {highlight.detailedContent || "Explore the profound beauty and cultural depth of this region through its most iconic landmarks and natural wonders."}
                         </p>

                         {highlight.keyFacts && (
                           <div className="space-y-4 md:space-y-6">
                              <h4 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                                <Info className="w-4 h-4 text-brand-blue" />
                                Facts & Information
                              </h4>
                              <div className="grid grid-cols-1 gap-3 md:gap-4">
                                {highlight.keyFacts.map((fact, idx) => (
                                  <div key={idx} className="flex gap-4 p-4 md:p-5 bg-white border border-slate-100 rounded-xl md:rounded-2xl shadow-sm">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-brand-blue font-bold text-sm">
                                      {idx + 1}
                                    </div>
                                    <p className="text-sm md:text-slate-600 font-medium">{fact}</p>
                                  </div>
                                ))}
                              </div>
                           </div>
                         )}
                      </motion.div>
                    </div>
                  </div>
                </Container>
              </div>
            ))}
          </section>
        )}
        {/* Top Attractions */}
        {attractions.length > 0 && (
          <section className="mb-10 md:mb-12">
            <div className="text-center mb-10">
               <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Top Attractions</h2>
               <p className="text-slate-500 font-medium">Iconic landmarks you simply cannot miss.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {attractions.map((attraction, index) => (
                <ActivityCard 
                  key={index} 
                  data={{
                    name: attraction.name,
                    badge: attraction.category,
                    title: attraction.name,
                    description: attraction.description,
                    image: attraction.image,
                    icon: attraction.icon,
                    isPopular: attraction.difficulty === "Easy",
                    highlightsTitle: "Visit Highlights:",
                    highlights: [
                      "Expert local guides included",
                      "Skip-the-line access available",
                      "Photo opportunities guaranteed"
                    ]
                  }}
                  hoverGradient="from-brand-blue/95 to-blue-900"
                  ctaLabel="Discover In Packages"
                  onCtaClick={() => window.location.href = `/packages/${regionSlug}`}
                />
              ))}
            </div>
          </section>
        )}

        {/* Travel Styles & Seasonal Guide */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-12 md:mb-16">
          {/* Traveler Type Matching */}
          <div>
            <div className="flex items-center gap-4 mb-10">
               <div className="w-12 h-12 bg-brand-green/10 rounded-2xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-brand-green" />
               </div>
               <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Perfect For...</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {regionData.travelStyles?.map((style, i) => (
                <div key={i} className="bg-white border border-slate-100 p-8 rounded-3xl flex flex-col gap-6 hover:shadow-xl hover:border-brand-green/20 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-brand-green group-hover:text-white transition-all transform group-hover:rotate-6">
                    <style.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 mb-2 uppercase text-sm tracking-wide">{style.type}</h4>
                    <p className="text-xs text-slate-500 font-bold leading-relaxed">{style.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seasonal Beauty */}
          <div>
            <div className="flex items-center gap-4 mb-10">
               <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center">
                  <CloudSun className="w-6 h-6 text-brand-blue" />
               </div>
               <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Best Time to Visit</h3>
            </div>
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-8 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/20 rounded-full blur-[100px] group-hover:bg-brand-blue/30 transition-colors duration-1000" />
               {regionData.seasonalGuide?.map((s, i) => (
                 <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative z-10 flex justify-between items-start gap-4 border-b border-white/10 pb-6 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="text-brand-blue font-black uppercase text-xs tracking-[0.2em] mb-2">{s.season}</p>
                      <p className="text-slate-300 text-sm font-semibold leading-relaxed">{s.highlight}</p>
                    </div>
                    <span className="px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap border border-white/5">{s.status}</span>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        {/* Regional Secrets */}
        {regionData.secrets && (
           <section className="mb-12 md:mb-16">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                  <span className="inline-block px-4 py-2 bg-amber-500/10 text-amber-600 rounded-full text-sm font-black uppercase tracking-widest mb-6">
                    Hidden Gems
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Regional Secrets</h2>
                  <p className="text-xl text-slate-600 font-medium">The hidden dimensions of Azerbaijan's majesty.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                  {regionData.secrets.map((secret, i) => (
                    <div key={i} className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <secret.icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-wide">{secret.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{secret.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
           </section>
        )}

        {/* Final CTA */}
        <section className="text-center relative">
           <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
           {/* Why Bayard Vacations */}
        <WhyBayardVacations />
        </section>
      </Container>
    </div>
    </>
  );
}
