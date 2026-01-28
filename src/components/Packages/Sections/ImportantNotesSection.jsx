import React, { useState } from "react";
import { Info } from "lucide-react";

const ImportantNotesSection = ({ packageData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Robust data fetching for notes (handles both array and object structures)
  let notes = [];
  
  if (packageData?.sections) {
    if (Array.isArray(packageData.sections)) {
      const section = packageData.sections.find(s => s.id === "important_notes" || s.id === "notes");
      if (section?.items) notes = section.items;
    } else {
      notes = packageData.sections.important_notes || packageData.sections.notes || [];
    }
  }

  // Fallback to top-level fields
  if (notes.length === 0) {
    notes = packageData?.important_notes || 
            packageData?.importantNotes || 
            packageData?.notes || [];
  }

  // If no dynamic data, don't show this section
  if (!notes || notes.length === 0) return null;

  const displayNotes = isExpanded ? notes : notes.slice(0, 6);

  return (
    <div id="notes-section" className="scroll-mt-48 pt-4">
      {/* Standard Header */}
      <div className="mb-8 md:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full mb-4">
          <Info className="w-3.5 h-3.5 text-brand-blue" />
          <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest leading-none">Travel Protocol</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight leading-tight">
          Important <span className="text-brand-blue">Notes</span>
        </h2>
        <p className="text-slate-500 text-sm md:text-lg font-medium">Key guidelines to ensure a smooth travel experience</p>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm relative overflow-hidden group hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-700">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl -mr-40 -mt-40 transition-all duration-700 group-hover:bg-brand-blue/10" />
        <div className="relative z-10">

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
            {displayNotes.map((note, idx) => (
              <li key={idx} className="flex gap-4 items-start bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white/80 hover:bg-white hover:border-brand-blue/20 transition-all duration-300 group/note shadow-sm hover:shadow-md">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-slate-300 group-hover/note:bg-brand-blue transition-all duration-300 flex-shrink-0 group-hover/note:scale-125" />
                <span className="text-sm md:text-base text-slate-600 font-medium leading-relaxed italic">{note}</span>
              </li>
            ))}
          </ul>

          {notes.length > 6 && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="group relative px-8 py-4 bg-white border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] overflow-hidden transition-all duration-300 hover:border-brand-blue hover:text-brand-blue hover:shadow-lg active:scale-95"
              >
                <div className="relative z-10 flex items-center gap-3">
                  {isExpanded ? (
                    <>
                      <svg className="w-4 h-4 rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                      </svg>
                      <span>Show Less</span>
                    </>
                  ) : (
                    <>
                      <span>Read More ({notes.length - 6} more)</span>
                      <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportantNotesSection;
