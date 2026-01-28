import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MessageCircle, AlertTriangle, MapPin, Globe } from 'lucide-react';

const ShareableFooter = ({ contactInfo, importantNotes }) => {
  const { 
    companyName, 
    phone, 
    whatsapp, 
    email, 
    website, 
    emergencyContact,
    operatingHours 
  } = contactInfo;

  return (
    <footer className="relative bg-gradient-to-br from-brand-blue via-blue-800 to-blue-900 text-white py-16 md:py-20 print:bg-white print:text-slate-900 print:py-8 overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 opacity-10 print:hidden">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl print:hidden" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl print:hidden" />


      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* RESTRUCTURED: Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Column 1: Brand & About (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-6">
              <div className="relative h-12 w-48 print:w-36 print:h-10">
                <Image
                  src="/img/logo.svg"
                  alt={companyName}
                  fill
                  className="object-contain object-left brightness-0 invert"
                />
              </div>
              <p className="text-lg text-blue-100 leading-relaxed font-medium">
                Designing extraordinary journeys that transform your travel dreams into lasting memories.
              </p>
            </div>
            
            <div className="flex items-center gap-4 py-6 border-y border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shadow-inner">
                <Globe className="w-6 h-6 text-brand-green" />
              </div>
              <div>
                <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-0.5">Official Website</p>
                <a href={`https://${website}`} target="_blank" rel="noopener noreferrer" className="text-base font-bold text-white hover:text-brand-green transition-colors">
                  {website}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Contact Info (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-brand-green mb-8 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-green" />
              Get In Touch
            </h4>
            
            <div className="space-y-6">
              {[
                { icon: Phone, label: 'Call Us', value: phone, color: 'brand-blue' },
                { icon: MessageCircle, label: 'WhatsApp', value: whatsapp, color: 'brand-green' },
                { icon: Mail, label: 'Email Support', value: email, color: 'purple-400' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                  <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-blue group-hover:border-white/20 transition-all duration-300`}>
                    <item.icon className="w-5 h-5 text-white/80 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-blue-300 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-base font-bold text-white group-hover:text-brand-green transition-colors">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Emergency Support (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-red-400 mb-8 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              Critical Support
            </h4>
            
            <div className="relative group overflow-hidden rounded-[2rem] p-8 border border-red-500/30 bg-white/5 backdrop-blur-xl">
              <div className="absolute top-0 right-0 -tralsate-y-1/2 translate-x-1/2 w-32 h-32 bg-red-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-red-500 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.4)]">
                    <AlertTriangle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-red-300 uppercase tracking-[0.2em] mb-1">24/7 Helpline</p>
                    <p className="text-2xl font-black text-white">{emergencyContact}</p>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                      <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">{operatingHours}</span>
                    </div>
                    <span className="text-[10px] px-3 py-1 bg-white/10 rounded-full font-bold text-white">ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Final Footer Bottom */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <p className="text-sm font-bold text-blue-200">
              © 2026 {companyName}. <span className="text-blue-400/60">Crafted with ❤️ for Travelers.</span>
            </p>
          </div>
          
          <div className="flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-blue-300">
            <a href="#" className="hover:text-brand-green transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-green transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ShareableFooter;
