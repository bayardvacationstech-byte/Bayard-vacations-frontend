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
    <section className="bg-gradient-to-b from-brand-blue-hovered to-brand-blue py-10 md:py-14 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] -ml-64 -mb-64"></div>

      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          {/* Left side - Title */}
          <div className="shrink-0 text-center lg:text-left">
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[0.9] mb-4">
              Why Choose <br className="hidden lg:block" />
              <span className="text-brand-accent italic font-serif">Bayard</span>?
            </h3>
            <div className="h-1.5 w-20 bg-brand-accent rounded-full mx-auto lg:ml-0" />
          </div>

          {/* Scrolling Stats Container for Mobile, Grid for Desktop */}
          <div className="flex-1 w-full pb-6 lg:pb-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 items-center gap-x-4 gap-y-8 sm:gap-x-12 sm:gap-y-10 px-4 lg:px-0">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center gap-3 md:gap-5 group">
                    {/* Glassmorphism Icon Container */}
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:bg-white/20 group-hover:-translate-y-1 shadow-2xl group-hover:shadow-brand-accent/20 shrink-0">
                      <Icon className="w-5 h-5 md:w-7 md:h-7 text-brand-accent" />
                    </div>
                    
                    <div className="flex flex-col min-w-0">
                      <div className="text-lg md:text-3xl font-black text-white leading-none mb-1 tracking-tighter">
                        {stat.value}
                      </div>
                      <div className="text-[8px] md:text-[11px] text-white/60 uppercase font-black tracking-[0.15em] md:tracking-[0.2em] leading-tight flex-1 line-clamp-2">
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
