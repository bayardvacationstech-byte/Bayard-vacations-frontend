"use client";

import Container from "@/components/ui/Container";
import { 
  Shield, 
  Award, 
  Users,
  Headphones,
  Zap,
  Tag,
  MapPin,
  Sparkles
} from "lucide-react";

const WhyBayardVacations = () => {
  const stats = [
    {
      icon: Shield,
      value: "100%",
      label: "Secure Booking",
    },
    {
      icon: Award,
      value: "10+",
      label: "Years Experience",
    },
    {
      icon: Users,
      value: "15K+",
      label: "Happy Travelers",
    },
    {
      icon: Headphones,
      value: "24/7",
      label: "Support Available",
    },
    {
      icon: Tag,
      value: "Best Price",
      label: "Guaranteed",
    },
    {
      icon: Sparkles,
      value: "Personalized",
      label: "Customized Trips",
    },
    {
      icon: MapPin,
      value: "Expert",
      label: "Local Guides",
    }
  ];

  return (
    <section className="bg-white py-6 relative overflow-hidden rounded-3xl border border-slate-100 shadow-sm mb-6">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] -ml-64 -mb-64"></div>

      <Container>
        <div className="flex flex-col items-center gap-8 relative z-10">
          {/* Title - Centered */}
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-4">
              Why Choose <span className="text-brand-blue italic font-serif">Bayard</span>?
            </h3>
            <div className="h-1.5 w-20 bg-brand-blue rounded-full mx-auto" />
          </div>

          {/* Stats Grid - Centered */}
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 items-center gap-x-6 gap-y-8 justify-items-center">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center gap-3 md:gap-4 group">
                    {/* Icon Container */}
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-yellow-50 border border-yellow-200 flex items-center justify-center transition-all duration-300 group-hover:bg-yellow-100 group-hover:-translate-y-1 shadow-sm shrink-0">
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
                    </div>
                    
                    <div className="flex flex-col min-w-0">
                      <div className="text-lg md:text-2xl font-black text-slate-900 leading-none mb-1 tracking-tight">
                        {stat.value}
                      </div>
                      <div className="text-[9px] md:text-[10px] text-slate-600 uppercase font-bold tracking-wider leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyBayardVacations;
