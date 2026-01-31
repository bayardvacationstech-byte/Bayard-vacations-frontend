'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MessageCircle, AlertTriangle, Globe, Instagram, Facebook, MapPin } from 'lucide-react';

const ShareableFooter = ({ contactInfo }) => {
  if (!contactInfo) return null;

  const { 
    companyName, 
    phone, 
    whatsapp, 
    email, 
    website, 
    emergencyContact 
  } = contactInfo;

  return (
    <footer className="bg-brand-blue text-white pt-20 pb-12 border-t border-white/10 font-outfit relative overflow-hidden">
      {/* Decorative Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-[-15deg] translate-x-1/4 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          
          {/* 1. Brand & Network (4 cols) */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-6">
              <div className="h-10 w-52 relative">
                <Image
                  src="/img/logo.svg"
                  alt={companyName}
                  fill
                  className="object-contain object-left brightness-0 invert"
                />
              </div>
              <p className="text-blue-100/70 text-base leading-relaxed font-medium max-w-sm">
                Designing extraordinary journeys that transform your travel dreams into lasting memories. Your global partner in premium experiences.
              </p>
            </div>
            
            <div className="flex gap-4">
              {[
                { icon: Globe, link: `https://${website}` },
                { icon: Instagram, link: "https://instagram.com/bayardvacations" },
                { icon: Facebook, link: "https://facebook.com/bayardvacations" }
              ].map((item, i) => (
                <a 
                  key={i} 
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-brand-blue transition-all duration-300 shadow-sm"
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Communication Hub (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="space-y-8">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-200/50 flex items-center gap-3">
                <span className="w-4 h-[1px] bg-blue-200/30"></span>
                Inquiries
              </h4>
              <ul className="space-y-8">
                <li>
                  <a href={`tel:${phone}`} className="group block">
                    <p className="text-[10px] font-black text-blue-300/80 uppercase tracking-widest mb-1.5 group-hover:text-white transition-colors">Direct Line</p>
                    <p className="text-xl font-bold text-white tracking-tight leading-none">{phone}</p>
                  </a>
                </li>
                <li>
                  <a href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} className="group block">
                    <p className="text-[10px] font-black text-blue-300/80 uppercase tracking-widest mb-1.5 group-hover:text-white transition-colors">WhatsApp Concierge</p>
                    <p className="text-xl font-bold text-white tracking-tight leading-none">Instant Chat</p>
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="space-y-8">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-200/50 flex items-center gap-3">
                <span className="w-4 h-[1px] bg-blue-200/30"></span>
                Our Base
              </h4>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-black text-blue-300/80 uppercase tracking-widest mb-2">Headquarters</p>
                  <p className="text-sm font-bold text-white leading-relaxed opacity-90">
                    Nandini Layout, Bengaluru,<br />Karnataka 560096, India
                  </p>
                </div>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-[0.2em]">Support Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Global Support Card (3 cols) */}
          <div className="lg:col-span-3">
            <div className="group relative">
              <div className="absolute inset-0 bg-white/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="h-full bg-white/10 rounded-[2.5rem] p-8 border border-white/20 backdrop-blur-md relative z-10 flex flex-col justify-between gap-8 hover:border-white/40 transition-all duration-500 shadow-2xl">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
                    <AlertTriangle className="w-7 h-7 text-red-600" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black text-red-200 uppercase tracking-[0.2em] mb-1">Priority</h5>
                    <p className="text-xs font-bold text-white opacity-80 italic">24/7 Global Helpline</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-2xl font-black text-white tracking-tighter leading-none">{emergencyContact}</p>
                  <p className="text-[10px] font-medium text-blue-100/60 leading-relaxed italic">
                    Exclusively for travelers currently on trip.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Global Footer Bottom */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-[11px] font-bold text-blue-100/50 uppercase tracking-[0.3em] text-center md:text-left">
            © 2026 {companyName} <span className="mx-4 opacity-20 hidden md:inline">|</span> <span className="block md:inline mt-2 md:mt-0">Premium World Tours</span>
          </div>
          
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-blue-100/60">
            <Link href="/privacy-policy" className="hover:text-white transition-colors relative group">
              Privacy Policy
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors relative group">
              Terms of Use
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ShareableFooter;
