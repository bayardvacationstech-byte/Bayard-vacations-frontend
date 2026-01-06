"use client";
import { useState } from 'react';
import Container from "@/components/ui/Container";
import { Users } from 'lucide-react';

export default function TeamBento() {
  const [filter, setFilter] = useState('All');

  const teamMembers = [
    // Leadership - Large Cards
    { name: 'John Bayard', role: 'Founder & CEO', dept: 'Leadership', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80', size: 'large', quote: 'Building dreams, one journey at a time' },
    { name: 'Sarah Mitchell', role: 'COO', dept: 'Leadership', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80', size: 'large' },
    
    // Sales Team
    { name: 'Michael Chen', role: 'Sales Director', dept: 'Sales', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', size: 'medium' },
    { name: 'Emily Parker', role: 'Senior Consultant', dept: 'Sales', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80', size: 'small' },
    { name: 'David Kumar', role: 'Travel Consultant', dept: 'Sales', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', size: 'small' },
    { name: 'Lisa Anderson', role: 'Sales Associate', dept: 'Sales', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80', size: 'small' },
    { name: 'James Wilson', role: 'Account Manager', dept: 'Sales', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', size: 'medium' },
    { name: 'Sophia Lee', role: 'Client Relations', dept: 'Sales', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80', size: 'small' },
    
    // Tech Team
    { name: 'Priya Patel', role: 'CTO', dept: 'Technology', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80', size: 'large' },
    { name: 'Alex Martinez', role: 'Lead Developer', dept: 'Technology', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80', size: 'medium' },
    { name: 'Nina Zhang', role: 'Full Stack Dev', dept: 'Technology', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', size: 'small' },
    { name: 'Tom Harris', role: 'Backend Engineer', dept: 'Technology', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80', size: 'small' },
    { name: 'Mia Johnson', role: 'Frontend Dev', dept: 'Technology', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80', size: 'small' },
    { name: 'Kevin White', role: 'DevOps Engineer', dept: 'Technology', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80', size: 'medium' },
    
    // Marketing Team
    { name: 'Emma Rodriguez', role: 'Marketing Director', dept: 'Marketing', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80', size: 'medium' },
    { name: 'Daniel Kim', role: 'Content Lead', dept: 'Marketing', image: 'https://images.unsplash.com/photo-1520409364224-63400afe26e5?w=400&q=80', size: 'small' },
    { name: 'Sophie Turner', role: 'Social Media Manager', dept: 'Marketing', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80', size: 'small' },
    { name: 'Marcus Bell', role: 'SEO Specialist', dept: 'Marketing', image: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=400&q=80', size: 'large' },
    { name: 'Isabella Cruz', role: 'Brand Manager', dept: 'Marketing', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80', size: 'small' },
    { name: 'Ryan Moore', role: 'Graphic Designer', dept: 'Marketing', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80', size: 'small' },
    
    // Operations
    { name: 'Amanda Singh', role: 'Operations Manager', dept: 'Operations', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80', size: 'medium' },
    { name: 'Lucas Gray', role: 'Logistics Coordinator', dept: 'Operations', image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&q=80', size: 'small' },
    { name: 'Zoe Adams', role: 'HR Manager', dept: 'Operations', image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&q=80', size: 'small' },
    { name: 'Nathan Scott', role: 'Financial Analyst', dept: 'Operations', image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400&q=80', size: 'small' },
    { name: 'Grace Miller', role: 'Admin Coordinator', dept: 'Operations', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80', size: 'medium' },
    { name: 'Ethan Brooks', role: 'Office Manager', dept: 'Operations', image: 'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=400&q=80', size: 'small' },
    
    // More team members to reach 30
    { name: 'Rachel Green', role: 'QA Engineer', dept: 'Technology', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80', size: 'small' },
    { name: 'Chris Evans', role: 'UI/UX Designer', dept: 'Technology', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&q=80', size: 'small' },
    { name: 'Robert Taylor', role: 'Sales Coordinator', dept: 'Sales', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80', size: 'small' },
    { name: 'Olivia Brown', role: 'Customer Success', dept: 'Sales', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80', size: 'medium' }
  ];

  const departments = ['All', 'Leadership', 'Sales', 'Technology', 'Marketing', 'Operations'];
  
  const filteredMembers = filter === 'All' 
    ? teamMembers 
    : teamMembers.filter(m => m.dept === filter);

  const deptColors = {
    Leadership: 'from-brand-blue to-blue-700',
    Sales: 'from-emerald-500 to-teal-600',
    Technology: 'from-purple-500 to-indigo-600',
    Marketing: 'from-orange-500 to-pink-600',
    Operations: 'from-teal-500 to-cyan-600'
  };

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-white via-slate-50 to-white relative overflow-hidden">
      <Container>
        {/* Header with Filters */}
        <div className="mb-6 md:mb-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-brand-blue" />
              <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-brand-blue">
                Meet Our Team
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-3">
              Meet The Dream Team
            </h2>
            <p className="text-sm md:text-lg text-slate-600">Click a department to filter, or view all</p>
          </div>

          {/* Department Filters - Responsive */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setFilter(dept)}
                className={`px-3 py-2 md:px-6 md:py-3 rounded-full font-bold text-xs md:text-sm uppercase tracking-wider transition-all duration-300 ${
                  filter === dept
                    ? 'bg-gradient-to-r from-brand-blue to-purple-600 text-white shadow-lg scale-105 md:scale-110'
                    : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-brand-blue hover:text-brand-blue'
                }`}
              >
                <span className="hidden sm:inline">{dept}</span>
                <span className="sm:hidden">{dept === 'All' ? 'All' : dept.slice(0, 4)}</span>
                {dept !== 'All' && <span className="ml-1">({teamMembers.filter(m => m.dept === dept).length})</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid - Responsive */}
        <div className="grid grid-cols-6 md:grid-cols-12 gap-2 md:gap-4 auto-rows-[120px] md:auto-rows-[200px]">
          {filteredMembers.map((member, idx) => {
            // Define unique grid spans for bento grid effect - Mobile responsive
            const gridClass = member.size === 'large' 
              ? 'col-span-6 md:col-span-6 row-span-2' 
              : member.size === 'medium'
              ? 'col-span-3 sm:col-span-6 md:col-span-4 row-span-1'
              : 'col-span-3 sm:col-span-3 md:col-span-3 row-span-1';

            const isFounder = member.name === 'John Bayard';

            return (
              <div
                key={idx}
                className={`group relative ${gridClass} rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:z-10 ${
                  isFounder ? 'ring-2 md:ring-4 ring-amber-400 ring-offset-2 md:ring-offset-4' : ''
                }`}
              >
                {/* Image Background */}
                <div className="absolute inset-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Dark overlay instead of gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-3 md:p-6 flex flex-col justify-end text-white">
                  {/* Department Badge */}
                  <div className={`absolute top-2 md:top-4 left-2 md:left-4 px-2 md:px-3 py-1 rounded-full backdrop-blur-sm text-xs font-bold uppercase tracking-wider ${
                    isFounder ? 'bg-amber-500 text-white' : 'bg-white/20'
                  }`}>
                    <span className="hidden sm:inline">{member.dept}</span>
                    <span className="sm:hidden">{member.dept.slice(0, 3)}</span>
                  </div>

                  {/* Founder Crown Icon */}
                  {isFounder && (
                    <div className="absolute top-2 md:top-4 right-2 md:right-4 text-2xl md:text-4xl">👑</div>
                  )}

                  {/* Name & Role */}
                  <div className="transform group-hover:-translate-y-2 transition-transform">
                    <h3 className={`font-black mb-0.5 md:mb-1 ${member.size === 'large' ? 'text-lg sm:text-2xl md:text-4xl' : 'text-sm sm:text-base md:text-xl'}`}>
                      {member.name}
                    </h3>
                    <p className={`font-semibold opacity-90 ${member.size === 'large' ? 'text-xs sm:text-sm md:text-lg' : 'text-xs sm:text-sm'}`}>
                      {member.role}
                    </p>
                    {member.quote && (
                      <p className="text-xs md:text-sm mt-1 md:mt-2 italic opacity-80 hidden md:block">&quot;{member.quote}&quot;</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
