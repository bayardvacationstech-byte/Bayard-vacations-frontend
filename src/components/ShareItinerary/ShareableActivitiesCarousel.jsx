'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MapPin, Star, Clock, Users } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ShareableActivitiesCarousel = ({ destination = 'Bali' }) => {
  // Dummy activities data - replace with real activities from your backend
  const activities = [
    {
      id: 1,
      title: 'Sunrise Yoga on the Beach',
      location: 'Seminyak Beach',
      image: '/images/hotels/seminyak/pool-view.jpg',
      rating: 4.9,
      reviews: 342,
      duration: '1.5 hours',
      price: '₹1,200',
      groupSize: '2-15 people',
      highlights: ['Professional instructor', 'Peaceful atmosphere', 'All equipment provided']
    },
    {
      id: 2,
      title: 'Scuba Diving Adventure',
      location: 'Tulamben Shipwreck',
      image: '/images/packages/bali/water-sports.jpg',
      rating: 5.0,
      reviews: 567,
      duration: '4 hours',
      price: '₹4,500',
      groupSize: '2-6 people',
      highlights: ['PADI certified', 'Equipment included', 'Underwater photos']
    },
    {
      id: 3,
      title: 'Cooking Class: Balinese Cuisine',
      location: 'Ubud',
      image: '/images/packages/bali/monkey-forest.jpg',
      rating: 4.8,
      reviews: 289,
      duration: '4 hours',
      price: '₹2,800',
      groupSize: '4-12 people',
      highlights: ['Market tour', 'Authentic recipes', 'Take-home cookbook']
    },
    {
      id: 4,
      title: 'White Water Rafting',
      location: 'Ayung River',
      image: '/images/packages/bali/kelingking-beach.jpg',
      rating: 4.7,
      reviews: 445,
      duration: '3 hours',
      price: '₹3,200',
      groupSize: '2-8 people',
      highlights: ['Safety equipment', 'Professional guides', 'Lunch included']
    },
    {
      id: 5,
      title: 'Traditional Balinese Massage',
      location: 'Seminyak Spa',
      image: '/images/hotels/seminyak/resort-pool.jpg',
      rating: 4.9,
      reviews: 678,
      duration: '90 minutes',
      price: '₹2,000',
      groupSize: '1-2 people',
      highlights: ['Aromatherapy oils', 'Quiet ambiance', 'Expert therapists']
    },
    {
      id: 6,
      title: 'Helicopter Tour of Bali',
      location: 'Ngurah Rai Airport',
      image: '/images/packages/bali/hero.jpg',
      rating: 5.0,
      reviews: 156,
      duration: '30 minutes',
      price: '₹18,000',
      groupSize: '1-4 people',
      highlights: ['Aerial views', 'Professional pilot', 'Photo opportunities']
    }
  ];

  return (
    <section className="py-16 bg-white print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/10 rounded-full mb-4">
            <MapPin className="w-5 h-5 text-brand-green" />
            <span className="text-sm font-bold text-brand-green uppercase tracking-wider">Explore More</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            Recommended <span className="text-brand-green">Activities</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Enhance your trip with these hand-picked experiences and adventures
          </p>
        </div>

        {/* Activities Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              prevEl: '.activities-swiper-button-prev',
              nextEl: '.activities-swiper-button-next',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {activities.map((activity) => (
              <SwiperSlide key={activity.id}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-full border border-slate-100">
                  {/* Activity Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold text-slate-900">{activity.rating}</span>
                        <span className="text-xs text-slate-500">({activity.reviews})</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-brand-green text-white text-sm font-bold rounded-full">
                        {activity.price}
                      </span>
                    </div>
                  </div>

                  {/* Activity Content */}
                  <div className="p-6">
                    <div className="flex items-start gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-brand-green shrink-0 mt-1" />
                      <span className="text-xs text-slate-500 font-medium">{activity.location}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-brand-green transition-colors line-clamp-2">
                      {activity.title}
                    </h3>

                    {/* Activity Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span>{activity.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span>{activity.groupSize}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1.5 mb-4">
                      {activity.highlights.slice(0, 2).map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <button className="w-full px-4 py-2.5 bg-brand-green/10 hover:bg-brand-green text-brand-green hover:text-white rounded-xl font-bold transition-all duration-300 text-sm">
                      Learn More
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="activities-swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-green hover:bg-brand-green hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="activities-swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-green hover:bg-brand-green hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShareableActivitiesCarousel;
