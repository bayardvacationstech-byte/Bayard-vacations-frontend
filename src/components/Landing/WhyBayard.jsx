import {
  ShieldCheck,
  LayoutDashboard,
  Gem,
  Flower,
  ArrowRight,
} from "lucide-react";
import Container from "../ui/Container";
import Image from "next/image";
import PeopleReviews from "@/assets/peopleReviews.png";

const WhyItem = ({ title, description, icon }) => {
  return (
    <div className="group relative p-6 bg-black/30 backdrop-blur-sm rounded-2xl border border-white/30 hover:bg-black/40 hover:border-white/40 transition-all duration-300 shadow-xl overflow-hidden">
      {/* Hover Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-start gap-4">
        <div className="bg-white/20 p-3 rounded-xl group-hover:bg-white/30 text-white transition-colors duration-300">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-xl mb-2 tracking-tight text-white transition-colors duration-300">{title}</h3>
          <p className="text-sm font-medium text-slate-300 group-hover:text-white/90 leading-relaxed max-w-[260px] opacity-80 group-hover:opacity-100">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const WHY_ITEMS = [
  {
    title: "Reliability",
    icon: <ShieldCheck className="w-8 h-8" />,
    description: "We’re with you every step ensuring a seamless travel experience.",
  },
  {
    title: "Customized",
    icon: <LayoutDashboard className="w-8 h-8" />,
    description: "One size doesn’t fit all, so why should one itinerary?",
  },
  {
    title: "Unique",
    icon: <Gem className="w-8 h-8" />,
    description: "We ensure you don't just visit destinations but connect with them.",
  },
  {
    title: "Stress-Free",
    icon: <Flower className="w-8 h-8" />,
    description: "We promise fun & beautiful memories, with zero stress.",
  },
];

export default function WhyBayard() {
  return (
    <Container className="relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* LEFT CONTENT */}
        <div className="flex flex-col items-start gap-6 max-w-2xl">
          <div className="section-badge-dark mb-6">
            <span className="text-xs font-bold tracking-[0.2em] uppercase">
              Why Choose Us
            </span>
          </div>
          
          <h2 className="section-title-dark leading-[1.1] mb-6">
            Experience the <br />
            <span className="text-brand-green">
              Bayard Difference
            </span>
          </h2>
          
          <p className="section-subtitle-dark max-w-md">
            Your travel dreams are unique, and We offer customized itineraries, reliable support, and exceptional experiences designed around your needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 mt-4 w-full sm:w-auto">
             <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/10 pr-6">
                <Image src={PeopleReviews} alt="Reviews" className="h-10 w-auto" />
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-white">20K+</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Happy Travelers</span>
                </div>
             </div>
             
             <a href="/packages" className="gradient-btn flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl">
                Explore Packages
                <ArrowRight className="w-5 h-5 -rotate-45" />
             </a>
          </div>
        </div>

        {/* RIGHT CONTENT - GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {WHY_ITEMS.map((item) => (
            <WhyItem key={item.title} {...item} />
          ))}
        </div>
      </div>
      
      {/* Background Decor Elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-blue rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-green rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse" />
    </Container>
  );
}
