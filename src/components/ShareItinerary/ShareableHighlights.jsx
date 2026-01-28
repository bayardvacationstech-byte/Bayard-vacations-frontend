import React from 'react';
import { Sparkles, MapPin, Users, Clock, Shield, Award, Heart, Zap } from 'lucide-react';

const iconMap = {
  'sparkles': Sparkles,
  'map': MapPin,
  'users': Users,
  'clock': Clock,
  'shield': Shield,
  'award': Award,
  'heart': Heart,
  'zap': Zap,
};

const ShareableHighlights = ({ highlights = [] }) => {
  if (!highlights || highlights.length === 0) return null;

  // Default icons if not specified
  const defaultIcons = ['sparkles', 'map', 'users', 'clock', 'shield', 'award', 'heart', 'zap'];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 print:bg-white print:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14 print:mb-6">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 print:text-2xl">
            Package Highlights
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-blue to-purple-600 mx-auto rounded-full" />
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 print:gap-3">
          {highlights.map((highlight, index) => {
            const iconName = defaultIcons[index % defaultIcons.length];
            const IconComponent = iconMap[iconName];
            
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand-blue transition-all duration-300 hover:shadow-lg hover:-translate-y-1 print:shadow-none print:transform-none print:p-4"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 print:hidden" />
                
                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 print:w-10 print:h-10 print:mb-3">
                    <IconComponent className="w-6 h-6 text-white print:w-5 print:h-5" />
                  </div>
                  
                  {/* Text */}
                  <p className="text-sm md:text-base font-semibold text-slate-800 leading-relaxed print:text-xs">
                    {highlight}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShareableHighlights;
