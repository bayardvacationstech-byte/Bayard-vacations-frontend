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
  X
} from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import ActivityCard from "@/components/ui/ActivityCard";
import GalleryCarousel from "@/components/ui/GalleryCarousel";
import WhyBayardVacations from "@/components/Packages/WhyBayardVacations";

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
          title: "Land of Fire", 
          description: "Witness the eternal natural flames of Yanar Dag and the ancient Ateshgah Fire Temple.", 
          icon: Sparkles,
          gallery: [
            { url: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=1200", caption: "Yanar Dag - The Burning Mountain with eternal flames" },
            { url: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=1200", caption: "Ateshgah Fire Temple - Ancient Zoroastrian worship site" },
            { url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200", caption: "Natural gas flames burning continuously for centuries" }
          ]
        },
        { 
          title: "Mud Volcanoes", 
          description: "Explore the surreal landscape of Gobustan, home to nearly half of the world's mud volcanoes.", 
          icon: Globe,
          gallery: [
            { url: "https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?w=1200", caption: "Gobustan mud volcanoes - A surreal landscape" },
            { url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200", caption: "Bubbling mud pools in the volcanic fields" },
            { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200", caption: "Ancient geological formations" }
          ]
        },
        { 
          title: "Baku Skyline", 
          description: "Marvel at the iconic Flame Towers, a symbol of Azerbaijan's modern energy and architectural prowess.", 
          icon: Camera,
          gallery: [
            { url: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=1200", caption: "Flame Towers illuminated at night" },
            { url: "https://images.unsplash.com/photo-1523438097201-512ae7d59c44?w=1200", caption: "Baku Boulevard along the Caspian Sea" },
            { url: "https://images.unsplash.com/photo-1541810271221-23d612fc27df?w=1200", caption: "Modern Baku skyline at sunset" }
          ]
        },
        { 
          title: "Caspian Riviera", 
          description: "Enjoy the luxury and breeze of the Baku Boulevard, stretching along the world's largest inland sea.", 
          icon: MapPin,
          gallery: [
            { url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200", caption: "Baku Boulevard - Seaside promenade" },
            { url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200", caption: "Caspian Sea coastline" },
            { url: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1200", caption: "Luxury hotels along the waterfront" }
          ]
        },
        { 
          title: "Ancient Silk Road", 
          description: "Walk through the cobblestone streets of Sheki and visit the exquisite Khan's Summer Palace.", 
          icon: Star,
          gallery: [
            { url: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200", caption: "Sheki Khan's Palace with ornate stained glass" },
            { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200", caption: "Traditional architecture in Sheki" },
            { url: "https://images.unsplash.com/photo-1534349762230-e0cadf78f505?w=1200", caption: "Silk Road caravanserai" }
          ]
        },
        { 
          title: "UNESCO Heritage", 
          description: "Discover Icherisheher, Baku's medieval Old City, a labyrinth of history and legends.", 
          icon: Heart,
          gallery: [
            { url: "https://images.unsplash.com/photo-1534349762230-e0cadf78f505?w=1200", caption: "Icherisheher - The Old City of Baku" },
            { url: "https://images.unsplash.com/photo-1543833078-4389945037be?w=1200", caption: "Maiden Tower - Symbol of Baku" },
            { url: "https://images.unsplash.com/photo-1590073844006-fb7a1c440c6d?w=1200", caption: "Shirvanshah's Palace Complex" }
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
              
              <h1 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tighter">
                Why Choose<br />
                <span className="text-amber-400">{regionName}?</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-2xl text-white/90 max-w-4xl font-medium leading-relaxed drop-shadow-lg"
            >
              {regionData?.overview}
            </motion.p>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-12 md:py-16">
        {/* Why Visit Section */}
        <section className="mb-12 md:mb-16">
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

            {/* Reasons List - Simple Layout */}
            <div className="space-y-6">
              {/* Reason 1 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center text-white shadow-md">
                    <Globe className="w-8 h-8" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">Where East Meets West</h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-4">
                    Azerbaijan sits at the crossroads of Europe and Asia, offering a unique cultural tapestry woven from Persian, 
                    Turkish, Russian, and Soviet influences. Experience a nation that perfectly balances Eastern hospitality 
                    with Western modernity, featuring 9 out of 11 climate zones and a blend of UNESCO World Heritage sites 
                    alongside ultra-modern architecture.
                  </p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              {/* Reason 2 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-md">
                    <Mountain className="w-8 h-8" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">Extraordinary Natural Beauty</h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-4">
                    From the eternal flames of Yanar Dag to the bubbling mud volcanoes of Gobustan, Azerbaijan's landscapes 
                    defy imagination. The country is home to nearly half of the world's mud volcanoes, while natural gas flames 
                    have burned continuously for thousands of years. The Great Caucasus Mountains meet the Caspian Sea, 
                    creating diverse ecosystems rarely found in such proximity.
                  </p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              {/* Reason 3 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white shadow-md">
                    <Clock className="w-8 h-8" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">Millennia of History</h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-4">
                    Walk through 40,000 years of human civilization at Gobustan's rock art galleries, explore medieval 
                    caravanserais along the Silk Road, and marvel at the intricate craftsmanship of the Sheki Khan's Palace. 
                    Every corner tells a story spanning empires and epochs, with the medieval Old City of Icherisheher 
                    standing proudly within the modern capital of Baku.
                  </p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              {/* Reason 4 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-md">
                    <Coffee className="w-8 h-8" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">A Gastronomic Paradise</h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-4">
                    Azerbaijani cuisine is a celebration of flavors, with over 30 varieties of dolma, aromatic saffron plov, 
                    and succulent kebabs. The country's culinary traditions reflect its position as a historic trading hub, 
                    blending spices and techniques from across continents. Experience world-renowned saffron and pomegranate 
                    dishes that have been perfected over centuries.
                  </p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              {/* Reason 5 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-md">
                    <Camera className="w-8 h-8" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">Futuristic Architecture</h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-4">
                    Baku's skyline is a testament to architectural ambition, featuring Zaha Hadid's flowing Heydar Aliyev Center 
                    and the LED-lit Flame Towers that illuminate the night sky. The city seamlessly blends cutting-edge design 
                    with its ancient heritage, creating a visual experience where medieval towers stand alongside structures 
                    that push the boundaries of modern architecture.
                  </p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              {/* Reason 6 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-600 rounded-2xl flex items-center justify-center text-white shadow-md">
                    <Users className="w-8 h-8" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">Legendary Hospitality</h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-4">
                    Azerbaijanis are renowned for their warmth and generosity. The national saying "Qonaq gələndə, bərəkət gələr" 
                    (When a guest arrives, abundance comes) reflects the deep-rooted tradition of welcoming visitors as honored guests. 
                    Tea culture is central to social gatherings, and the country is safe and tourist-friendly with widespread 
                    multilingual support.
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Quote */}
            <div className="mt-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-center">
              <blockquote className="text-2xl md:text-3xl font-bold text-white leading-relaxed mb-4">
                "Azerbaijan is not just a destination—it's a journey through time, 
                where ancient flames still burn and modern dreams take flight."
              </blockquote>
              <p className="text-slate-300 font-medium">— Travel & Leisure Magazine</p>
            </div>
          </div>
        </section>

        {/* Key Highlights */}
        {regionData.highlights && (
          <section className="mb-10 md:mb-12">
            <Container>
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
                  Key Highlights
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
                  The unique pillars that define {regionName}'s identity.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {regionData.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => {
                      setSelectedGallery({ title: highlight.title, images: highlight.gallery || [] });
                      setGalleryOpen(true);
                    }}
                    className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={highlight.gallery?.[0]?.url || "https://images.unsplash.com/photo-1541810271221-23d612fc27df?w=800"}
                        alt={highlight.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                    </div>

                    {/* Content */}
                    <div className="relative h-full p-6 flex flex-col">
                      {/* Icon & Photo Count */}
                      <div className="flex items-start justify-between mb-auto">
                        <div className="w-14 h-14 bg-brand-gold rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                          {highlight.icon && <highlight.icon className="w-7 h-7 text-white" />}
                        </div>
                        <div className="px-3 py-1.5 rounded-full bg-brand-blue text-white text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                          <Camera className="w-3.5 h-3.5" />
                          <span>{highlight.gallery?.length || 0} Photos</span>
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="mt-auto">
                        <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
                          {highlight.title}
                        </h3>
                        <p className="text-white/90 font-medium leading-relaxed mb-4 line-clamp-2">
                          {highlight.description}
                        </p>
                        
                        {/* View Gallery CTA */}
                        <div className="flex items-center gap-2 text-white font-bold text-sm group-hover:gap-3 transition-all">
                          <span>View Gallery</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>

                    {/* Hover Overlay Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                ))}
              </div>
            </Container>
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
