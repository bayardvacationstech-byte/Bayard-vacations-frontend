import React from 'react';

// Image mapping for different highlight categories
const getHighlightImage = (highlight, index) => {
  const text = highlight.toLowerCase();
  
  // Map keywords to images
  if (text.includes('resort') || text.includes('hotel') || text.includes('luxury') || text.includes('accommodation')) {
    return '/img/highlights/luxury-resort.png';
  }
  if (text.includes('sunrise') || text.includes('trek') || text.includes('volcano') || text.includes('mount')) {
    return '/img/highlights/sunrise-trek.png';
  }
  if (text.includes('temple') || text.includes('cultural') || text.includes('ceremony') || text.includes('traditional')) {
    return '/img/highlights/cultural-temple.png';
  }
  if (text.includes('dinner') || text.includes('romantic') || text.includes('candlelit')) {
    return '/img/highlights/romantic-dinner.png';
  }
  if (text.includes('spa') || text.includes('massage') || text.includes('wellness') || text.includes('balinese')) {
    return '/img/highlights/spa-wellness.png';
  }
  if (text.includes('water') || text.includes('snorkel') || text.includes('dive') || text.includes('sports')) {
    return '/img/highlights/water-sports.png';
  }
  if (text.includes('island') || text.includes('adventure') || text.includes('nusa') || text.includes('penida')) {
    return '/img/highlights/island-adventure.png';
  }
  if (text.includes('guide') || text.includes('english') || text.includes('speaking')) {
    return '/img/highlights/tour-guide.png';
  }
  
  // Fallback: cycle through images
  const images = [
    '/img/highlights/luxury-resort.png',
    '/img/highlights/sunrise-trek.png',
    '/img/highlights/cultural-temple.png',
    '/img/highlights/romantic-dinner.png',
    '/img/highlights/spa-wellness.png',
    '/img/highlights/water-sports.png',
    '/img/highlights/island-adventure.png',
    '/img/highlights/tour-guide.png',
  ];
  return images[index % images.length];
};

const ShareableHighlights = ({ highlights = [] }) => {
  if (!highlights || highlights.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-white print:bg-white print:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Artistic Section Header */}
        <div className="text-center mb-12 md:mb-16 print:mb-6">
          <p className="font-great-vibes text-4xl md:text-5xl text-brand-blue mb-2 print:text-3xl">
            What Makes This Special
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 print:text-xl">
            Package Highlights
          </h2>
        </div>

        {/* Clean Highlights with Checkmarks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12 md:gap-y-6 max-w-6xl mx-auto">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="flex items-start gap-4"
            >
              {/* Checkmark Icon */}
              <div className="flex-shrink-0 w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* Text */}
              <p className="flex-1 text-slate-700 text-base md:text-lg leading-relaxed pt-0.5">
                {highlight}
              </p>
            </div>
          ))}
        </div>

        {/* Commented out: Unique Artistic Highlights Layout */}
        {/* <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6 auto-rows-[200px] print:grid-cols-2 print:gap-4 print:auto-rows-auto">
          {highlights.map((highlight, index) => {
            // Create unique layouts for each card
            const layouts = [
              'md:col-span-3 md:row-span-2', // Large left
              'md:col-span-3 md:row-span-1', // Wide top right
              'md:col-span-3 md:row-span-1', // Wide bottom right
              'md:col-span-2 md:row-span-2', // Tall left
              'md:col-span-2 md:row-span-1', // Small middle
              'md:col-span-2 md:row-span-1', // Small right
              'md:col-span-3 md:row-span-1', // Wide
              'md:col-span-3 md:row-span-2', // Large right
            ];
            
            // Varied border radius styles
            const borderStyles = [
              'rounded-[2rem]',
              'rounded-[3rem]',
              'rounded-[2.5rem]',
              'rounded-[1.5rem]',
              'rounded-[2rem]',
              'rounded-[3rem]',
              'rounded-[2.5rem]',
              'rounded-[2rem]',
            ];
            
            const layout = layouts[index % layouts.length];
            const borderStyle = borderStyles[index % borderStyles.length];
            const delay = `delay-${(index % 3) * 100}`;
            
            return (
              <div
                key={index}
                className={`group relative overflow-hidden ${layout} ${borderStyle} shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 print:col-span-1 print:row-span-1 print:rounded-2xl print:min-h-[150px]`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <img
                  src={getHighlightImage(highlight, index)}
                  alt={highlight}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out print:scale-100"
                />

                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-transparent to-black/80 group-hover:from-black/80 group-hover:to-black/90 transition-all duration-700 print:from-black/70" />

                <div className="absolute inset-0 flex items-end p-6 md:p-8 print:p-4">
                  <div className="relative">
                    <div className="w-12 h-1 bg-gradient-to-r from-white to-transparent mb-3 opacity-80 group-hover:w-20 transition-all duration-500 print:hidden" />
                    
                    <p className="text-white text-base md:text-lg font-bold leading-relaxed drop-shadow-2xl print:text-sm print:leading-snug">
                      {highlight}
                    </p>
                  </div>
                </div>

                <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 print:hidden" />
                
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-[inherit] print:hidden" />
              </div>
            );
          })}
        </div> */}
      </div>
    </section>
  );
};

export default ShareableHighlights;
