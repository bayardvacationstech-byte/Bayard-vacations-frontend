"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, CalendarCheck, Bus, MapPin, Calendar, Star, Shield, ChevronRight, Ticket, Group, Globe } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";

export default function GroupDepartureClient() {
  const [selectedTab, setSelectedTab] = useState("international");

  // Group departure packages data
  const groupPackages = {
    international: [
      {
        id: 1,
        title: "European Grand Tour",
        location: "10 Cities across Europe",
        duration: "15 Days / 14 Nights",
        image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800",
        price: "$3,999",
        rating: 4.9,
        highlights: ["Fixed Departure", "Group of 25-30", "All Meals Included"],
        category: "Multi-Country Tour",
        departureDate: "March 15, 2026",
        seatsLeft: 12
      },
      {
        id: 2,
        title: "Dubai Shopping Festival Group Tour",
        location: "Dubai, UAE",
        duration: "6 Days / 5 Nights",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
        price: "$2,299",
        rating: 4.8,
        highlights: ["Shopping Festival", "Group Discounts", "Tour Manager"],
        category: "Shopping & City Tour",
        departureDate: "February 10, 2026",
        seatsLeft: 8
      },
      {
        id: 3,
        title: "Thailand Grand Circuit",
        location: "Bangkok-Phuket-Pattaya",
        duration: "8 Days / 7 Nights",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800",
        price: "$1,799",
        rating: 4.7,
        highlights: ["Fixed Group Dates", "30+ Travelers", "Guided Tours"],
        category: "Beach & Culture",
        departureDate: "January 25, 2026",
        seatsLeft: 5
      },
      {
        id: 4,
        title: "Singapore-Malaysia Combo",
        location: "Singapore & Kuala Lumpur",
        duration: "7 Days / 6 Nights",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800",
        price: "$2,199",
        rating: 4.8,
        highlights: ["Group Departure", "City Tours", "Theme Parks"],
        category: "City Explorer",
        departureDate: "February 20, 2026",
        seatsLeft: 15
      }
    ],
    domestic: [
      {
        id: 5,
        title: "Kashmir Group Tour",
        location: "Srinagar-Gulmarg-Pahalgam",
        duration: "6 Days / 5 Nights",
        image: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800",
        price: "₹32,999",
        rating: 4.9,
        highlights: ["Fixed Departure", "Group of 20-25", "Shikara Rides"],
        category: "Mountain & Valley",
        departureDate: "March 5, 2026",
        seatsLeft: 10
      },
      {
        id: 6,
        title: "Rajasthan Heritage Circuit",
        location: "Jaipur-Udaipur-Jodhpur",
        duration: "8 Days / 7 Nights",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
        price: "₹38,999",
        rating: 4.8,
        highlights: ["Group Travel", "Palace Tours", "Cultural Shows"],
        category: "Heritage & Culture",
        departureDate: "February 15, 2026",
        seatsLeft: 7
      },
      {
        id: 7,
        title: "Goa Beach Group Escape",
        location: "North & South Goa",
        duration: "5 Days / 4 Nights",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
        price: "₹24,999",
        rating: 4.6,
        highlights: ["Beach Party", "Group Activities", "Water Sports"],
        category: "Beach Fun",
        departureDate: "January 30, 2026",
        seatsLeft: 18
      },
      {
        id: 8,
        title: "Kerala Backwater Group Tour",
        location: "Cochin-Munnar-Alleppey",
        duration: "6 Days / 5 Nights",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
        price: "₹29,999",
        rating: 4.7,
        highlights: ["Houseboat Stay", "Group Discounts", "Tea Gardens"],
        category: "Nature & Backwaters",
        departureDate: "February 25, 2026",
        seatsLeft: 12
      }
    ]
  };

  const currentPackages = groupPackages[selectedTab];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600">
        {/* Group Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='8' fill='white'/%3E%3Ccircle cx='40' cy='20' r='8' fill='white'/%3E%3Ccircle cx='60' cy='20' r='8' fill='white'/%3E%3Ccircle cx='30' cy='40' r='8' fill='white'/%3E%3Ccircle cx='50' cy='40' r='8' fill='white'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }} />
        </div>

        <Container className="relative h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                <Users className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white uppercase tracking-widest">
                  Travel Theme
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                Group<br />
                <span className="text-cyan-200">Departure</span>
              </h1>

              <p className="text-xl text-white/90 leading-relaxed max-w-xl">
                All things together. Discover our handpicked domestic and international arrivals curated specifically for this theme.
              </p>

              <div className="flex gap-4">
                <Button size="lg" className="bg-white text-indigo-700 hover:bg-cyan-50 font-black px-8 py-6 rounded-2xl shadow-xl">
                  View Departures
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 font-black px-8 py-6 rounded-2xl backdrop-blur-sm">
                  Join a Group
                </Button>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl ring-8 ring-white/20">
                <Image
                  src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800"
                  alt="Group travelers"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 flex items-center justify-center">
                    <Group className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900">Travel Together</p>
                    <p className="text-sm text-slate-600">Fixed dates, fixed groups, guaranteed fun</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Packages Section */}
      <Container className="py-8 md:py-12">
        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-slate-100 rounded-full p-1.5">
            <button
              onClick={() => setSelectedTab("international")}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                selectedTab === "international"
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              International
            </button>
            <button
              onClick={() => setSelectedTab("domestic")}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                selectedTab === "domestic"
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Domestic
            </button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/packages/${pkg.id}`}>
                <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-xs font-black uppercase backdrop-blur-sm">
                        {pkg.category}
                      </div>
                    </div>

                    {/* Seats Left Badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/95 px-2 py-1 rounded-full">
                      <Ticket className="w-3.5 h-3.5 text-red-600" />
                      <span className="text-xs font-bold">{pkg.seatsLeft} Left</span>
                    </div>

                    {/* Location */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-bold">{pkg.location}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {pkg.title}
                    </h3>

                    {/* Departure Date */}
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <CalendarCheck className="w-4 h-4" />
                      <span className="font-medium">{pkg.departureDate}</span>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                      {pkg.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Starting from</p>
                        <p className="text-2xl font-black text-slate-900">{pkg.price}</p>
                      </div>
                      <div className="flex items-center gap-2 text-indigo-600 font-bold group-hover:gap-3 transition-all">
                        <span className="text-sm">Book Now</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Why Group Departure Section */}
      <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 py-16 md:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Why Choose Group Departures?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Travel with confidence in fixed-date group tours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Guaranteed Departures", desc: "Fixed dates with confirmed departures—no cancellations due to low bookings. Your travel plans are secure." },
              { icon: Users, title: "Social Experience", desc: "Meet like-minded travelers, make new friends, and share unforgettable experiences together." },
              { icon: Globe, title: "Cost Effective", desc: "Group discounts on accommodations, transport, and activities make luxury travel more affordable." }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-8"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
