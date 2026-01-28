'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const ShareableItineraryBook = ({ itineraries }) => {
  const bookRef = useRef(null);
  const state = useRef({});
  const zIndexCounter = useRef(100);

  // PREPARE PAGES
  // We want:
  // Spread 1: [Empty, Cover]
  // Spread 2: [Day 1 Header, Day 1 Points]
  // Spread 3: [Day 2 Header, Day 2 Points]
  // ...
  
  const physicalPages = [];
  
  // 1. Page 0 (Cover & Day 1 Header)
  physicalPages.push({
    front: { type: 'cover', title: 'My Trip Itinerary' },
    back: { type: 'header', dayData: itineraries[0] }
  });

  // 2. Middle Pages (Points for current day & Header for next day)
  for (let i = 0; i < itineraries.length - 1; i++) {
    physicalPages.push({
      front: { type: 'points', dayData: itineraries[i] },
      back: { type: 'header', dayData: itineraries[i + 1] }
    });
  }

  // MOBILE JOURNAL COMPONENT
  const MobileJournal = () => {
    const [openIndex, setOpenIndex] = useState(0); // First day open by default

    const toggleDay = (idx) => {
      setOpenIndex(openIndex === idx ? -1 : idx);
    };

    return (
      <div className="md:hidden space-y-3 px-1">
        {itineraries.map((day, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className="mobile-card opacity-0 translate-y-8 bg-white rounded-[1.5rem] shadow-[0_8px_25px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden transition-all duration-500"
              style={{
                boxShadow: isOpen ? '0_20px_40px_rgba(0,0,0,0.08)' : '0_4px_12px_rgba(0,0,0,0.03)'
              }}
            >
              {/* Mobile Header - Clickable for Accordion */}
              <div 
                className="p-4 cursor-pointer transition-colors bg-gradient-to-br from-brand-blue to-blue-700 text-white"
                onClick={() => toggleDay(idx)}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="px-3 py-0.5 bg-white/20 border border-white/30 rounded-full text-[9px] font-black uppercase tracking-widest text-white">
                        Day {day.day.toString().padStart(2, '0')}
                      </div>
                      {day.overnight && (
                        <div className="flex items-center gap-1 text-[9px] font-bold text-white/70">
                          <span>🏨</span>
                          <span className="truncate max-w-[120px]">{day.overnight}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-black leading-tight tracking-tight text-white">
                      {day.title}
                    </h3>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-500 bg-white/10 text-white ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Mobile Content Section Area (Animated) */}
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-1' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-4 pt-2 pb-6 space-y-5 bg-white">
                  <div className="flex items-center gap-2 mt-4">
                    <div className="w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue text-[10px]">
                      <span>📝</span>
                    </div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">The Plan</span>
                  </div>

                  <div className="space-y-5 pl-1">
                    {day.activities?.map((act, actIdx) => (
                      <div key={actIdx} className="relative pl-8 group">
                        {actIdx !== day.activities.length - 1 && (
                          <div className="absolute left-[11px] top-5 bottom-[-24px] w-0.5 bg-slate-50" />
                        )}
                        <div className="absolute left-0 top-1 w-5 h-5 rounded-lg bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-brand-blue" />
                        </div>
                        <p className="text-sm font-black text-slate-900 mb-0.5 leading-snug">{act.activity}</p>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed italic">{act.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Mobile End Card */}
        <div className="mobile-card opacity-0 translate-y-8 bg-emerald-50 rounded-[1.5rem] p-8 text-center border-2 border-dashed border-emerald-200">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <span className="text-3xl">🏅</span>
          </div>
          <h4 className="text-lg font-black text-slate-900 mb-1 tracking-tight">Adventure Complete</h4>
          <p className="text-emerald-700 text-xs font-bold uppercase tracking-widest">Memories for life</p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup 3D for desktop
      gsap.set('.book-container', { perspective: 2500 });
      gsap.set('.page-element', { transformStyle: 'preserve-3d' });
      gsap.set('.page-back', { rotationY: 180 });
      gsap.set(['.page-front', '.page-back'], { backfaceVisibility: 'hidden' });

      // Mobile Animations (Simple Scroll Reveal)
      if (window.innerWidth < 768) {
        gsap.to('.mobile-card', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.mobile-journal-trigger',
            start: 'top 80%',
          }
        });
      }
    }, bookRef);

    return () => ctx.revert();
  }, [itineraries]);

  const flipPage = (e) => {
    const el = e.currentTarget;
    const id = el.dataset.id;
    
    // Toggle state
    if (!state.current[id] || state.current[id] === 'right') {
      zIndexCounter.current++;
      gsap.to(el, {
        rotationY: -180,
        duration: 1.2,
        ease: 'power2.inOut',
        transformOrigin: 'left center',
        zIndex: zIndexCounter.current,
        boxShadow: '-10px 10px 30px rgba(0,0,0,0.15)',
        onStart: () => { el.style.pointerEvents = 'none'; },
        onComplete: () => { el.style.pointerEvents = 'auto'; }
      });
      state.current[id] = 'left';
    } else {
      zIndexCounter.current++;
      gsap.to(el, {
        rotationY: 0,
        duration: 1.2,
        ease: 'power2.inOut',
        transformOrigin: 'left center',
        zIndex: zIndexCounter.current,
        boxShadow: '0px 10px 30px rgba(0,0,0,0.1)',
        onStart: () => { el.style.pointerEvents = 'none'; },
        onComplete: () => { el.style.pointerEvents = 'auto'; }
      });
      state.current[id] = 'right';
    }
  };

  const PageContent = ({ data, side }) => {
    if (data.type === 'cover') {
      return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-blue to-blue-900 text-white p-12">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-xl mb-8 border border-white/30 rotate-3">
             <span className="text-5xl">✈️</span>
          </div>
          <h2 className="text-5xl font-black text-center mb-4 tracking-tighter leading-tight">
            {data.title}
          </h2>
          <div className="w-16 h-1 bg-white/50 rounded-full mb-8" />
          <p className="text-white/70 font-bold uppercase tracking-[0.3em] text-xs">
            A Journey by Bayard Vacations
          </p>
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-white/10 border-l-[40px] border-l-transparent" />
        </div>
      );
    }

    if (data.type === 'header') {
      const { day, title, overnight } = data.dayData;
      return (
        <div className={`h-full w-full flex flex-col items-center justify-center bg-white p-10 text-center ${side === 'back' ? 'border-r border-slate-100' : ''}`}>
           <div className="w-20 h-20 bg-brand-blue/10 rounded-2xl flex flex-col items-center justify-center border-2 border-brand-blue/20 mb-8">
              <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest mb-1">Day</span>
              <span className="text-4xl font-black text-brand-blue leading-none">{day.toString().padStart(2, '0')}</span>
           </div>
           <h3 className="text-3xl font-black text-slate-900 mb-6 px-4 leading-tight tracking-tight">
             {title}
           </h3>
           {overnight && (
             <div className="bg-blue-50/50 px-5 py-3 rounded-2xl border border-blue-100 mt-4 flex items-center gap-3 shadow-sm">
                <span className="text-2xl">🏨</span>
                <div>
                   <span className="block text-[9px] font-black text-blue-400 uppercase tracking-widest text-left">Overnight in</span>
                   <span className="block text-sm font-bold text-slate-700 text-left">{overnight}</span>
                </div>
             </div>
           )}
           <div className={`absolute top-0 ${side === 'front' ? 'right-0' : 'left-0'} w-0 h-0 border-t-[30px] border-t-slate-50 border-${side === 'front' ? 'l' : 'r'}-[30px] border-${side === 'front' ? 'l' : 'r'}-transparent`} />
        </div>
      );
    }

    if (data.type === 'points') {
      const { activities } = data.dayData;
      return (
        <div className={`h-full w-full flex flex-col bg-white p-10 md:p-12 relative ${side === 'front' ? 'border-l border-slate-100' : ''}`}>
           <div className="flex items-center gap-3 mb-10 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center shadow-lg">
                 <span className="text-white text-xs font-bold">✨</span>
              </div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Daily Highlights</h4>
           </div>

           <div className="flex-1 overflow-y-auto space-y-10 pr-2 custom-scrollbar">
              {activities?.map((act, idx) => (
                <div key={idx} className="relative pl-12 group">
                   {idx !== activities.length - 1 && (
                     <div className="absolute left-[15px] top-8 bottom-[-40px] w-0.5 bg-gradient-to-b from-brand-blue/20 to-transparent" />
                   )}
                   <div className="absolute left-0 top-1 w-8 h-8 rounded-xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center transition-all group-hover:bg-brand-blue group-hover:scale-110 shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-brand-blue group-hover:bg-white" />
                   </div>
                   <p className="text-base font-black text-slate-900 mb-1 tracking-tight group-hover:text-brand-blue transition-colors">
                      {act.activity}
                   </p>
                   <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
                      {act.description}
                   </p>
                </div>
              ))}
           </div>
        </div>
      );
    }

    if (data.type === 'end') {
      return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-emerald-50 p-12 text-center">
            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-xl mb-8 border border-emerald-100">
               <span className="text-5xl">🏆</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tighter">
               Adventure Completed
            </h2>
            <p className="text-emerald-700 font-black uppercase tracking-[0.2em] text-xs mb-8">Memories to last a lifetime</p>
            <div className="w-16 h-1 bg-emerald-400/30 rounded-full" />
        </div>
      );
    }
  };

  return (
    <section 
      ref={bookRef}
      className="py-16 md:py-24 bg-white print:py-8 mobile-journal-trigger"
    >
      <div className="max-w-full mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-12 md:mb-16 px-4">
          <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter mb-4">
            Our <span className="text-brand-blue uppercase">Journal</span>
          </h2>
          <p className="text-slate-500 font-medium italic text-lg md:text-xl">The pages of your journey unfold...</p>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:flex justify-center book-container">
          <div
            className="relative w-full max-w-[1400px] flex bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] rounded-lg overflow-visible"
            style={{ height: '800px' }}
          >
            <div className="absolute inset-0 flex">
                <div className="flex-1 bg-slate-50 border-r border-slate-100"></div>
                <div className="flex-1 bg-white"></div>
            </div>

            <div className="absolute left-1/2 top-0 bottom-0 w-[4px] bg-gradient-to-r from-black/15 via-black/5 to-black/15 z-[1000] pointer-events-none transform -translate-x-1/2" />

            <div className="absolute left-1/2 top-0 w-1/2 h-full z-10 transition-transform duration-500">
              {physicalPages.map((page, i) => (
                <div
                  key={i}
                  data-id={i}
                  className="page-element absolute inset-0 cursor-pointer origin-left"
                  onClick={flipPage}
                  style={{ zIndex: physicalPages.length - i }}
                >
                  <div className="page-front absolute inset-0 bg-white shadow-[-10px_0_20px_-10px_rgba(0,0,0,0.1)] border-l border-slate-50">
                     <PageContent data={page.front} side="front" />
                  </div>
                  <div className="page-back absolute inset-0 bg-white shadow-[10px_0_20px_-10px_rgba(0,0,0,0.1)] border-r border-slate-50">
                     <PageContent data={page.back} side="back" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE VIEW */}
        <MobileJournal />

        {/* FEEDBACK UI */}
        <div className="mt-12 md:mt-16 text-center">
           <div className="inline-flex items-center gap-4 bg-slate-100/80 px-6 md:px-8 py-3 md:py-4 rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm backdrop-blur-sm animate-bounce cursor-default select-none">
              <span className="text-xl md:text-2xl">📖</span>
              <p className="text-slate-700 font-black text-xs md:text-sm uppercase tracking-widest">
                <span className="md:hidden">Scroll to explore your journey</span>
                <span className="hidden md:inline">Flip the page for the next chapter</span>
              </p>
           </div>
        </div>

        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #e2e8f0;
            border-radius: 20px;
          }
          
          .page-front, .page-back {
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
          }
        `}</style>
      </div>
    </section>
  );
};

export default ShareableItineraryBook;
