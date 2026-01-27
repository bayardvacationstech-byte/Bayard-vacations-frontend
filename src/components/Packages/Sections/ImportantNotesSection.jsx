import React, { useState } from "react";
import { Info } from "lucide-react";

const ImportantNotesSection = ({ packageData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const notes = packageData?.notes || [
    "Standard check-in time is usually 14:00 hrs and check-out is 12:00 hrs.",
    "Early check-in or late check-out is subject to hotel availability and may incur additional charges.",
    "Valid government photo ID is mandatory for all travelers at the time of check-in.",
    "Itinerary sequence may be adjusted based on local conditions, weather, or operational requirements.",
    "Hotel rooms are typically provided on a twin-sharing basis unless otherwise specified.",
    "Triple occupancy rooms may have limited availability and could include a rollaway bed.",
    "All timings mentioned in the itinerary are approximate and subject to change.",
    "Meals included are as per the itinerary; special dietary requirements should be informed in advance.",
    "Transportation will be provided in air-conditioned vehicles as per the group size.",
    "Entrance fees to monuments and attractions are included unless mentioned otherwise.",
    "Personal expenses such as laundry, telephone calls, and minibar are not included.",
    "Travel insurance is highly recommended to cover unforeseen circumstances.",
    "Passport validity of at least 6 months from the date of travel is required for international packages.",
    "Visa requirements and processing are the responsibility of the traveler unless specified.",
    "Flight timings are subject to change by the airline; please reconfirm before departure.",
    "Baggage allowance is as per airline policy; excess baggage charges may apply.",
    "Children below a certain age may be eligible for discounted rates; please check policy.",
    "Senior citizens may require medical clearance for certain adventure activities.",
    "Photography and videography may be restricted at certain locations.",
    "Tipping for guides, drivers, and hotel staff is customary and appreciated but not mandatory."
  ];

  const displayNotes = isExpanded ? notes : notes.slice(0, 6);

  return (
    <div id="notes-section" className="scroll-mt-48 pt-4">
      {/* Standard Header */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-2 md:mb-4 tracking-tight leading-tight">
          Important <span className="text-brand-blue">Notes</span>
        </h2>
        <p className="text-slate-500 text-sm md:text-xl font-medium">Key guidelines to ensure a smooth travel experience</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-12 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
        <div className="relative z-10">

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {displayNotes.map((note, idx) => (
              <li key={idx} className="flex gap-4 items-start text-sm md:text-base text-slate-600 font-medium leading-relaxed group/note text-left">
                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/note:bg-brand-blue transition-colors flex-shrink-0" />
                <span>{note}</span>
              </li>
            ))}
          </ul>

          {notes.length > 6 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="group flex items-center gap-2 text-brand-blue font-bold text-xs uppercase tracking-widest hover:text-blue-700 transition-all"
              >
                {isExpanded ? (
                  <>
                    <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span>Show Less</span>
                  </>
                ) : (
                  <>
                    <span>Read More ({notes.length - 6} more)</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportantNotesSection;
