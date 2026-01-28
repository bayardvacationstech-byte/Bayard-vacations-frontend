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
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 md:py-16 print:bg-white print:text-slate-900 print:py-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 print:hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Important Notes */}
        {importantNotes && importantNotes.length > 0 && (
          <div className="mb-12 print:mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full mb-6 print:mb-3">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-bold text-yellow-400 uppercase tracking-wider print:text-yellow-700">Important Notes</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-2">
              {importantNotes.map((note, index) => (
                <div key={index} className="group flex items-start gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 print:bg-slate-50 print:border-slate-200 print:gap-2 print:p-2 print:rounded-lg">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-green mt-2 print:w-1.5 print:h-1.5" />
                  <span className="text-sm text-slate-200 print:text-slate-700 print:text-xs">{note}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Footer Content */}
        <div className="border-t border-white/10 pt-12 print:border-slate-200 print:pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 print:gap-4 print:mb-4">
            {/* Contact Information */}
            <div>
              <h4 className="text-2xl font-black mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent print:text-slate-900 print:text-base print:mb-3">
                Contact Us
              </h4>
              <div className="space-y-4 print:space-y-2">
                <div className="flex items-start gap-3 group print:gap-2">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center group-hover:bg-brand-blue transition-colors print:w-8 print:h-8 print:bg-brand-blue/10">
                    <Phone className="w-5 h-5 text-brand-blue group-hover:text-white transition-colors print:w-4 print:h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 print:text-slate-600 print:text-[10px]">Phone</p>
                    <p className="text-base font-bold text-white print:text-slate-900 print:text-xs">{phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group print:gap-2">
                  <div className="w-10 h-10 rounded-xl bg-brand-green/20 flex items-center justify-center group-hover:bg-brand-green transition-colors print:w-8 print:h-8 print:bg-brand-green/10">
                    <MessageCircle className="w-5 h-5 text-brand-green group-hover:text-white transition-colors print:w-4 print:h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 print:text-slate-600 print:text-[10px]">WhatsApp</p>
                    <p className="text-base font-bold text-white print:text-slate-900 print:text-xs">{whatsapp}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group print:gap-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500 transition-colors print:w-8 print:h-8 print:bg-purple-500/10">
                    <Mail className="w-5 h-5 text-purple-400 group-hover:text-white transition-colors print:w-4 print:h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 print:text-slate-600 print:text-[10px]">Email</p>
                    <p className="text-sm font-medium text-white break-all print:text-slate-900 print:text-xs">{email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <h4 className="text-2xl font-black mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent print:text-slate-900 print:text-base print:mb-3">
                Emergency Support
              </h4>
              <div className="relative bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-2xl p-6 overflow-hidden print:bg-red-50 print:border-red-200 print:rounded-xl print:p-3">
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 animate-pulse print:hidden" />
                
                <div className="relative flex items-start gap-4 print:gap-2">
                  <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center shrink-0 shadow-lg shadow-red-500/50 print:w-10 print:h-10 print:shadow-none">
                    <AlertTriangle className="w-6 h-6 text-white print:w-5 print:h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2 print:text-red-600 print:text-[10px] print:mb-1">24/7 Helpline</p>
                    <p className="text-2xl font-black text-white print:text-red-700 print:text-base">{emergencyContact}</p>
                    <p className="text-xs text-slate-300 mt-2 print:text-slate-600 print:text-[10px] print:mt-1">{operatingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div>
              <h4 className="text-2xl font-black mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent print:text-slate-900 print:text-base print:mb-3">
                About Us
              </h4>
              <div className="space-y-4 print:space-y-2">
                <div className="flex items-center gap-3">
                  <div className="relative h-8 w-40 print:w-32 print:h-8">
                    <Image
                      src="/img/logo.svg"
                      alt={companyName}
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed print:text-slate-600 print:text-xs">
                  Creating unforgettable travel experiences with personalized itineraries and exceptional service.
                </p>
                <div className="flex items-center gap-2 text-brand-green">
                  <Globe className="w-4 h-4" />
                  <p className="text-sm font-bold print:text-xs">{website}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-8 border-t border-white/10 print:pt-4 print:border-slate-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-400 print:text-slate-600 print:text-xs">
                © 2026 {companyName}. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm text-slate-400 print:text-slate-600 print:text-xs">
                <a href="#" className="hover:text-brand-blue transition-colors print:no-underline">Terms & Conditions</a>
                <a href="#" className="hover:text-brand-blue transition-colors print:no-underline">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareableFooter;
