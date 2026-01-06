import { getGroupDeparturePackages } from "@/lib/server";
import Container from "@/components/ui/Container";
import PackageCardGradient from "@/components/Packages/PackageCardGradient";
import RegionStats from "@/components/Packages/RegionStats";
import Newsletter from "@/components/Landing/Newsletter";
import GroupDepartureSlider from "@/components/ui/sliders/GroupDepartureSlider";
import { Compass, Users, Star, Crown, Headphones, Leaf, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Group Departures | Bayard Vacations",
  description: "Join our curated group departures and explore the world with like-minded travelers. Expert-led tours, seamless planning, and unforgettable memories.",
};

const GroupDeparturePage = async () => {
  const groupDeparturePackages = await getGroupDeparturePackages();

  return (
    <main className="bg-[#020617] min-h-screen text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] sm:h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="https://cdn.bayardvacations.com/videos/Group_Departure.webm" type="video/webm" />
        </video>
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-[#020617] z-10" />
        <div className="absolute inset-0 bg-slate-950/20 z-10" />

        <Container className="relative z-20 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full bg-brand-green/20 backdrop-blur-md border border-brand-green/30 text-brand-green text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Users className="w-4 h-4" />
              Signature Group Departures
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-tight md:leading-[0.9] text-white animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <span className="block">EXPLORE</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-green to-brand-blue">TOGETHER.</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed px-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
              Hand-crafted itineraries designed for explorers who believe that the best stories are written together. Fixed dates, expert guides, and curated experiences.
            </p>
          </div>
        </Container>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* Brand Section / Stats */}
      <section className="py-24 relative">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[120px] -z-10" />
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-green/5 rounded-full blur-[100px] -z-10" />
         
         <Container>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
               <div className="space-y-8">
                  <div className="space-y-4">
                     <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
                        Crafting <span className="text-brand-blue">Legacies</span> <br />
                        Through <span className="text-brand-green">Shared Discovery</span>
                     </h2>
                     <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                        Since 2010, Bayard Vacations has been the gold standard for premium group travel. We don't just book trips; we architect experiences that foster connection, discovery, and absolute luxury.
                     </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-brand-blue/30 transition-colors">
                        <Crown className="w-8 h-8 text-brand-blue mb-4" />
                        <h4 className="font-bold text-lg mb-2">Exclusive Access</h4>
                        <p className="text-sm text-slate-500">Curated experiences reserved for Bayard members.</p>
                     </div>
                     <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-brand-green/30 transition-colors">
                        <Headphones className="w-8 h-8 text-brand-green mb-4" />
                        <h4 className="font-bold text-lg mb-2">24/7 Concierge</h4>
                        <p className="text-sm text-slate-500">Dedicated travel artisan support throughout your journey.</p>
                     </div>
                  </div>
               </div>

               <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-brand-blue to-brand-green rounded-[4rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
                  <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                     <img 
                        src="https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                        alt="Group Adventure" 
                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                     <div className="absolute bottom-8 left-8">
                        <div className="flex -space-x-3 mb-4">
                           {[1,2,3,4,5].map(i => (
                              <img 
                                 key={i}
                                 src={`https://i.pravatar.cc/100?u=${i+50}`} 
                                 className="w-10 h-10 rounded-full border-2 border-slate-950 ring-1 ring-white/10"
                                 alt="User"
                              />
                           ))}
                        </div>
                        <p className="text-sm font-bold tracking-widest uppercase">1.2k+ Global Explorers</p>
                     </div>
                  </div>
               </div>
            </div>
         </Container>
      </section>

      {/* Experience Magic Section: The Packages Grid */}
      <section className="py-24 bg-[#010413]">
         <Container>
            <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
               <div className="space-y-4">
                  <div className="text-brand-blue font-black tracking-[0.3em] uppercase text-xs">Curated Selection</div>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Experience <span className="text-brand-green italic">Magic</span></h2>
               </div>
               <p className="text-slate-500 max-w-md md:text-right font-medium">
                  Each departure is a masterpiece of planning, featuring hand-picked accommodations and exclusive itineraries.
               </p>
            </div>

            {groupDeparturePackages && groupDeparturePackages.length > 0 ? (
               <>
                  {/* Mobile Carousel */}
                  <div className="md:hidden">
                     <GroupDepartureSlider groupDeparturePackages={groupDeparturePackages} />
                  </div>
                  
                  {/* Desktop/Tablet Grid */}
                  <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
                     {groupDeparturePackages.map((pkg) => (
                        <div key={pkg.id} className="h-[520px]">
                           <PackageCardGradient item={pkg} />
                        </div>
                     ))}
                  </div>
               </>
            ) : (
               <div className="py-32 text-center rounded-[3rem] border border-dashed border-white/10 bg-white/[0.01]">
                  <Compass className="w-16 h-16 text-slate-800 mx-auto mb-6 animate-pulse" />
                  <h3 className="text-2xl font-bold text-slate-400">Discovering Signature Journeys...</h3>
                  <p className="text-slate-600 mt-2">Check back soon for upcoming fixed departures.</p>
               </div>
            )}
         </Container>
      </section>

      {/* Features Grid */}
      <section className="py-24">
         <Container>
            <div className="grid md:grid-cols-3 gap-12">
               <div className="space-y-4 group">
                  <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                     <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black">Like-Minded Community</h3>
                  <p className="text-slate-500 leading-relaxed">
                     Travel with people who share your passion for discovery. Our groups are small enough for intimacy and large enough for lifelong friendships.
                  </p>
               </div>
               
               <div className="space-y-4 group">
                  <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all duration-500">
                     <Leaf className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black">Expert Curation</h3>
                  <p className="text-slate-500 leading-relaxed">
                     Every hotel, restaurant, and activity is scouted and vetted by our travel artisans to ensure it meets the Bayard standard of excellence.
                  </p>
               </div>

               <div className="space-y-4 group">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500">
                     <Star className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black">Zero-Stress Planning</h3>
                  <p className="text-slate-500 leading-relaxed">
                     From visa assistance to internal flights, we handle the logistics so you can focus on what matters: the journey.
                  </p>
               </div>
            </div>
         </Container>
      </section>

      {/* Newsletter */}
      <section className="pb-24">
         <Newsletter />
      </section>
    </main>
  );
};

export default GroupDeparturePage;
