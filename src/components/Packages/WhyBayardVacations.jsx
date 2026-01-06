"use client";

import Container from "@/components/ui/Container";
import { 
  Shield, 
  Award, 
  Users,
  Headphones
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
    }
  ];

  return (
    <section className="bg-gradient-to-br from-[#0146b3] to-[#020617] py-8 md:py-10">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-6 md:gap-8">
          {/* Left side - Title */}
          <div className="w-full md:w-auto text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-black text-white">
              Why Choose <span className="text-white/90">Bayard</span>?
            </h3>
          </div>

          {/* Stats */}
          <div className="flex-1 flex flex-wrap justify-center md:justify-end gap-8 md:gap-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white leading-none">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/80 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyBayardVacations;
