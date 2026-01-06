import Container from "@/components/ui/Container";
import { ArrowRight, Crown, Headphones, Leaf, Star, Users, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import GroupDepartureSlider from "../ui/sliders/GroupDepartureSlider";
import { cn } from "@/lib/utils";

export default function GroupDeparture({ groupDeparturePackages }) {
  return (
    <section className="bg-white py-16 relative">
      <Container>
        {/* Simple Header */}
        <div className="mb-8">
          <div className="flex items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="section-title-light mb-4">
                Curated Group Departures
              </h2>
              <p className="section-subtitle-light max-w-2xl">
                Hand-crafted itineraries designed for explorers who believe that the best stories are written together.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-end md:items-center gap-4">
              <Link
                href="/group-departure"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-blue text-white hover:bg-brand-blue-hovered transition-all font-semibold text-sm whitespace-nowrap"
              >
                View All Departures
                <ArrowRight className="size-4" />
              </Link>
              
              <div className="flex items-center gap-3">
                <button className="swiper-prev-group w-12 h-12 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:text-brand-blue hover:border-brand-blue transition-all">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="swiper-next-group w-12 h-12 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:text-brand-blue hover:border-brand-blue transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="mb-6">
          {groupDeparturePackages && groupDeparturePackages.length > 0 ? (
            <GroupDepartureSlider groupDeparturePackages={groupDeparturePackages} />
          ) : (
            <div className="h-[500px] w-full bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 font-semibold">
              Experience the Extraordinary
            </div>
          )}
        </div>

        {/* Enhanced Features Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 border border-slate-200">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Card 1 */}
              <div className="group relative bg-white rounded-2xl p-5 border border-slate-200 hover:border-brand-blue/30 transition-all duration-300 hover:shadow-xl hover:shadow-brand-blue/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-blue to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-brand-blue/30 group-hover:scale-110 transition-transform">
                    <Crown className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-lg mb-2">Exclusive Access</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">Curated experiences reserved for members</p>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="group relative bg-white rounded-2xl p-5 border border-slate-200 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                    <Headphones className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-lg mb-2">24/7 Concierge</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">Dedicated travel artisan support</p>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="group relative bg-white rounded-2xl p-5 border border-slate-200 hover:border-green-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                    <Leaf className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-lg mb-2">Mindful Travel</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">Sustainable luxury experiences</p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="relative bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-6">
                {/* Explorer Stats */}
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-3 border-white bg-slate-100 overflow-hidden ring-2 ring-slate-200 hover:ring-brand-blue/50 transition-all hover:scale-110 hover:z-10">
                        <img src={`https://i.pravatar.cc/100?u=${i+40}`} alt="User" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-base font-bold text-slate-900">1.2k+ Global Explorers</p>
                      <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Active</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />)}
                      <span className="text-xs text-slate-500 ml-1">5.0 Rating</span>
                    </div>
                  </div>
                </div>
                
                {/* Trust Badges */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">100% Curated Journeys</p>
                    <p className="text-xs text-slate-600">Fixed Departures · Expert Guides</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FeatureItem({ icon, title, desc, className }) {
  return (
    <div className={cn(
      "p-10 rounded-[3rem] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group",
      className
    )}>
      <div className="space-y-6">
        <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-brand-blue group-hover:bg-brand-blue/5 transition-all duration-500">
          {icon}
        </div>
        <div className="space-y-3">
          <h4 className="font-black text-lg text-slate-950 tracking-tight">{title}</h4>
          <p className="text-sm text-slate-400 font-medium leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}
