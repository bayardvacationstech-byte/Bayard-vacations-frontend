// Dummy data for shareable itinerary demo
// This mimics the structure of actual package data

export const dummyItineraries = {
  "demo-001": {
    id: "demo-001",
    bookingRef: "BVT2026001",
    customerName: "Mr. & Mrs. Sharma",
    packageName: "Magical Bali Escape",
    packageSlug: "bali-6n7d",
    region: "Bali",
    destination: "Bali, Indonesia",
    duration: "6 Nights / 7 Days",
    travelDates: {
      checkIn: "2026-03-15",
      checkOut: "2026-03-22",
      displayCheckIn: "15 March 2026",
      displayCheckOut: "22 March 2026"
    },
    travelers: {
      adults: 2,
      children: 0
    },
    pricing: {
      basePrice: 89999,
      taxes: 8999,
      totalPrice: 98998,
      currency: "INR",
      perPerson: false
    },
    heroImage: "/img/bali-hero.png",
    
    // New fields for enhanced shareable page
    highlights: [
      "6 nights in luxurious 5-star beachfront resort",
      "Spectacular sunrise trek at Mount Batur volcano",
      "Full-day Nusa Penida island adventure with snorkeling",
      "Exciting water sports package included",
      "Traditional Balinese spa and massage experience",
      "Romantic sunset dinner cruise with unlimited drinks",
      "Professional English-speaking tour guide throughout",
      "All entrance fees and transfers included"
    ],
    
    overview: `Experience the magic of Bali with this carefully curated 6-night, 7-day adventure that combines cultural exploration, thrilling adventures, and pure relaxation. From the moment you arrive at Ngurah Rai International Airport, you'll be immersed in the island's enchanting beauty and warm hospitality.

This premium package takes you through Bali's most iconic destinations – explore the emerald rice terraces of Ubud, witness breathtaking sunrises from Mount Batur, discover the dramatic cliffs of Nusa Penida, and unwind at world-class beach clubs in Seminyak.

Perfect for couples, families, and adventure seekers, this itinerary offers the perfect balance of guided tours and free time. Stay in a luxurious 5-star resort with private beach access, indulge in authentic Balinese cuisine, and create memories that will last a lifetime.`,
    
    faqs: [
      {
        question: "What documents are required for Bali travel?",
        answer: "Indian passport holders need a passport valid for at least 6 months from the travel date. Visa on arrival is available at Ngurah Rai International Airport for ₹500,000 IDR (approx ₹2,500 INR) for 30 days."
      },
      {
        question: "Is the Mount Batur trek suitable for beginners?",
        answer: "Yes, the Mount Batur trek is suitable for most fitness levels. The trek takes approximately 2 hours uphill at a moderate pace. Our experienced guides will assist you throughout the journey, and there are rest points along the way."
      },
      {
        question: "What is the best time to visit Bali?",
        answer: "The best time to visit Bali is during the dry season from April to October. However, Bali is a year-round destination. March offers pleasant weather with fewer crowds and better hotel rates."
      },
      {
        question: "Are meals included in the package?",
        answer: "The package includes daily breakfast at the resort, plus specific meals mentioned in the itinerary (welcome dinner, lunches on tour days, and farewell dinner cruise). Other meals give you flexibility to explore Bali's amazing culinary scene."
      },
      {
        question: "Can I customize the itinerary?",
        answer: "Absolutely! This itinerary is flexible and can be customized based on your preferences. Contact our travel experts to discuss modifications, add extra nights, or include additional activities."
      },
      {
        question: "What should I pack for this trip?",
        answer: "Pack light, comfortable clothing suitable for tropical weather. Essential items include: swimwear, sunscreen (SPF 50+), comfortable walking shoes, modest clothing for temples, a light jacket for early morning trek, and your camera!"
      }
    ],
    
    testimonials: [
      {
        name: "Rahul & Priya Mehta",
        location: "Mumbai, India",
        rating: 5,
        review: "Our Bali honeymoon with Bayard Vacations was absolutely magical! Every detail was perfectly planned. The Mount Batur sunrise trek was the highlight - watching the sun rise above the clouds was breathtaking. The resort was stunning, and our guide Made was incredibly knowledgeable and friendly."
      },
      {
        name: "Anita Sharma",
        location: "Delhi, India",
        rating: 5,
        review: "As a solo female traveler, I felt completely safe and well taken care of. The itinerary had a perfect mix of adventure and relaxation. The Nusa Penida tour exceeded all expectations - Kelingking Beach is even more beautiful in person! Highly recommend Bayard Vacations."
      },
      {
        name: "Vikram & Family",
        location: "Bangalore, India",
        rating: 5,
        review: "Traveled with my wife and two kids (8 and 12 years). The team customized activities suitable for children. Kids loved the monkey forest and water sports. The resort had excellent facilities for families. Best family vacation we've had! Thank you Bayard team!"
      },
      {
        name: "Sneha Patel",
        location: "Ahmedabad, India",
        rating: 5,
        review: "Everything was seamless from start to finish. The sunset dinner cruise was romantic and memorable. Our tour guide went above and beyond to ensure we had the best experience. The spa treatments at the resort were world-class. Will definitely book with Bayard again!"
      }
    ],
    
    paymentTerms: `Booking Amount: 25% of total package cost required to confirm booking

Balance Payment: Full payment must be received 21 days before departure date

Payment Methods: We accept payments via bank transfer, credit card, debit card, UPI, and online payment gateways

Installment Option: For bookings made 60+ days in advance, we offer flexible EMI options (contact us for details)

Group Bookings: Special payment terms available for groups of 6+ travelers

Payment Confirmation: A payment receipt and booking confirmation will be sent within 24 hours of receiving payment`,
    
    cancellationPolicy: `Free Cancellation: Full refund if cancelled 45+ days before departure (minus ₹2,000 processing fee)

30-44 Days: 50% of total package cost will be deducted

15-29 Days: 75% of total package cost will be deducted

Less than 15 Days: No refund

Amendment Charges: Date changes subject to availability - ₹5,000 per person amendment fee applies

Force Majeure: In case of natural disasters or COVID-19 related travel restrictions, we offer flexible rebooking options

Refund Timeline: Refunds will be processed within 15 working days to the original payment method

Note: Airline cancellation charges (if flights booked through us) will be as per airline policy`,
    
    bookingTerms: `Validity: This quotation is valid for 7 days from the date of issue

Confirmation: Booking is confirmed only after receipt of advance payment and confirmation email from Bayard Vacations

Documents: Valid passport copies required at time of booking

Travel Insurance: Highly recommended and available at additional cost. Covers medical emergencies, trip cancellation, and lost baggage

Itinerary Changes: Right to minor itinerary changes due to unforeseen circumstances (weather, flight schedules, etc.)

Responsibility: Bayard Vacations acts as an agent. We are not responsible for delays, accidents, losses, or damages during the tour

Package Rates: Based on current rates. Subject to change if there's a major increase in fuel prices or government taxes

Child Policy: Child (2-11 years) with extra bed: 70% of adult cost | Child without bed: 50% of adult cost | Infant (0-2 years): Complimentary

Special Requests: Dietary requirements, special occasions, accessibility needs - please inform at time of booking`,
    
    itineraries: [
      {
        day: 1,
        title: "Arrival in Bali - Welcome to Paradise",
        activities: [
          {
            activity: "Airport Pickup",
            description: "Our representative will greet you at Ngurah Rai International Airport with a traditional welcome"
          },
          {
            activity: "Hotel Check-in",
            description: "Transfer to your luxurious beachfront resort in Seminyak"
          },
          {
            activity: "Welcome Dinner",
            description: "Enjoy a romantic beachside dinner featuring authentic Balinese cuisine"
          }
        ],
        overnight: "Seminyak, Bali",
        meals: ["Dinner"],
        imageRefs: [
          {
            url: "/images/packages/bali/hero.jpg",
            title: "Bali Paradise"
          },
          {
            url: "/images/hotels/seminyak/resort-pool.jpg",
            title: "Seminyak Beach Resort"
          }
        ]
      },
      {
        day: 2,
        title: "Ubud Cultural Experience",
        activities: [
          {
            activity: "Tegallalang Rice Terraces",
            description: "Visit the iconic emerald-green rice paddies and capture stunning photos"
          },
          {
            activity: "Sacred Monkey Forest Sanctuary",
            description: "Walk through ancient temples inhabited by playful monkeys"
          },
          {
            activity: "Ubud Art Market",
            description: "Shop for traditional handicrafts, paintings, and souvenirs"
          },
          {
            activity: "Traditional Balinese Massage",
            description: "Relax with a 90-minute spa treatment at a luxury wellness center"
          }
        ],
        overnight: "Seminyak, Bali",
        meals: ["Breakfast", "Lunch"],
        imageRefs: [
          {
            url: "/images/packages/bali/hero.jpg",
            title: "Rice Terraces"
          },
          {
            url: "/images/packages/bali/monkey-forest.jpg",
            title: "Sacred Monkey Forest"
          },
          {
            url: "/images/packages/bali/tanah-lot.jpg",
            title: "Temple Views"
          }
        ]
      },
      {
        day: 3,
        title: "Water Sports & Beach Relaxation",
        activities: [
          {
            activity: "Water Sports Adventure",
            description: "Enjoy parasailing, jet skiing, and banana boat rides at Tanjung Benoa Beach"
          },
          {
            activity: "Beach Club Experience",
            description: "Spend the afternoon at a premium beach club with infinity pool and ocean views"
          },
          {
            activity: "Sunset at Tanah Lot Temple",
            description: "Witness a breathtaking sunset at the iconic sea temple"
          }
        ],
        overnight: "Seminyak, Bali",
        meals: ["Breakfast"],
        imageRefs: [
          {
            url: "/images/packages/bali/water-sports.jpg",
            title: "Water Sports at Tanjung Benoa"
          },
          {
            url: "/images/packages/bali/tanah-lot.jpg",
            title: "Tanah Lot Temple at Sunset"
          }
        ]
      },
      {
        day: 4,
        title: "Nusa Penida Island Tour",
        activities: [
          {
            activity: "Fast Boat to Nusa Penida",
            description: "Cruise across crystal-clear waters to the stunning island"
          },
          {
            activity: "Kelingking Beach (T-Rex Cliff)",
            description: "Visit the famous cliff viewpoint with dramatic ocean views"
          },
          {
            activity: "Angel's Billabong & Broken Beach",
            description: "Explore natural infinity pools and unique rock formations"
          },
          {
            activity: "Snorkeling at Crystal Bay",
            description: "Swim with tropical fish and sea turtles in pristine waters"
          }
        ],
        overnight: "Seminyak, Bali",
        meals: ["Breakfast", "Lunch"],
        imageRefs: [
          {
            url: "/images/packages/bali/kelingking-beach.jpg",
            title: "Kelingking Beach Viewpoint"
          },
          {
            url: "/images/packages/bali/kelingking-beach.jpg",
            title: "Nusa Penida Views"
          },
          {
            url: "/images/packages/bali/water-sports.jpg",
            title: "Crystal Clear Waters"
          }
        ]
      },
      {
        day: 5,
        title: "Mount Batur Sunrise Trek",
        activities: [
          {
            activity: "Early Morning Trek",
            description: "Hike up Mount Batur volcano (2:00 AM start) to catch the spectacular sunrise"
          },
          {
            activity: "Breakfast on the Summit",
            description: "Enjoy hot coffee and eggs cooked using volcanic steam while watching the sunrise"
          },
          {
            activity: "Hot Springs Relaxation",
            description: "Soak in natural hot springs with views of the volcano and lake"
          },
          {
            activity: "Coffee Plantation Tour",
            description: "Learn about Balinese coffee production and taste the famous Luwak coffee"
          }
        ],
        overnight: "Seminyak, Bali",
        meals: ["Breakfast", "Lunch"],
        imageRefs: [
          {
            url: "/images/packages/bali/mount-batur.jpg",
            title: "Sunrise from Mount Batur"
          },
          {
            url: "/images/packages/bali/mount-batur.jpg",
            title: "Mount Batur Summit"
          }
        ]
      },
      {
        day: 6,
        title: "Leisure Day & Shopping",
        activities: [
          {
            activity: "Free Time at Resort",
            description: "Relax by the pool or enjoy the resort's amenities at your own pace"
          },
          {
            activity: "Seminyak Shopping",
            description: "Explore boutique stores, designer shops, and local markets in Seminyak"
          },
          {
            activity: "Farewell Dinner Cruise",
            description: "Enjoy a luxury sunset dinner cruise with live music and unlimited drinks"
          }
        ],
        overnight: "Seminyak, Bali",
        meals: ["Breakfast", "Dinner"],
        imageRefs: [
          {
            url: "/images/hotels/seminyak/pool-view.jpg",
            title: "Resort Pool Area"
          },
          {
            url: "/images/packages/bali/tanah-lot.jpg",
            title: "Sunset Views"
          }
        ]
      },
      {
        day: 7,
        title: "Departure - Until We Meet Again",
        activities: [
          {
            activity: "Hotel Check-out",
            description: "Enjoy a leisurely breakfast and complete check-out formalities"
          },
          {
            activity: "Airport Transfer",
            description: "Private transfer to Ngurah Rai International Airport for your return flight"
          }
        ],
        overnight: null,
        meals: ["Breakfast"],
        imageRefs: []
      }
    ],

    hotelDetails: {
      name: "The Seminyak Beach Resort & Spa",
      category: "5-Star Deluxe",
      location: "Seminyak, Bali",
      rating: 5,
      roomType: "Deluxe Ocean View Room",
      amenities: [
        "Private Beach Access",
        "Infinity Pool",
        "Full-Service Spa",
        "Multiple Dining Options",
        "Fitness Center",
        "Free Wi-Fi",
        "24/7 Room Service"
      ],
      checkIn: "15 March 2026 (2:00 PM)",
      checkOut: "22 March 2026 (12:00 PM)",
      images: [
        "/images/hotels/seminyak/resort-pool.jpg",
        "/images/hotels/seminyak/pool-view.jpg",
        "/images/packages/bali/hero.jpg"
      ]
    },

    inclusions: [
      "Round-trip airport transfers in private air-conditioned vehicle",
      "6 nights accommodation in 5-star resort with daily breakfast",
      "All sightseeing and transfers as per itinerary",
      "Professional English-speaking tour guide",
      "Nusa Penida island tour with fast boat transfers",
      "Mount Batur sunrise trek with breakfast",
      "Water sports package (parasailing, jet ski, banana boat)",
      "Traditional Balinese massage (90 minutes)",
      "Sunset dinner cruise with unlimited drinks",
      "Welcome dinner at beachside restaurant",
      "All entrance fees and parking charges",
      "GST and service charges"
    ],

    exclusions: [
      "International airfare and visa charges",
      "Travel insurance (highly recommended)",
      "Lunches and dinners (unless specified)",
      "Personal expenses (laundry, telephone, minibar, etc.)",
      "Tips and gratuities for guides and drivers",
      "Optional activities not mentioned in itinerary",
      "Any increase in government taxes",
      "Anything not mentioned in inclusions"
    ],

    flightDetails: {
      included: false,
      note: "Flight tickets are not included. We can assist with flight bookings at competitive rates."
    },

    importantNotes: [
      "Passport must be valid for at least 6 months from travel date",
      "Visa on arrival available for Indian passport holders",
      "Carry comfortable walking shoes and swimwear",
      "Sun protection (sunscreen, hat, sunglasses) is essential",
      "Modest clothing required for temple visits",
      "Mount Batur trek requires moderate fitness level",
      "Water sports subject to weather conditions"
    ],

    contactInfo: {
      companyName: "Bayard Vacations",
      phone: "+91 98765 43210",
      whatsapp: "+91 98765 43210",
      email: "support@bayardvacations.com",
      website: "www.bayardvacations.com",
      emergencyContact: "+91 98765 43211",
      operatingHours: "24/7 Support Available"
    }
  }
};

// Helper function to get itinerary by ID
export const getItineraryById = (id) => {
  return dummyItineraries[id] || null;
};

// Helper function to get all itinerary IDs
export const getAllItineraryIds = () => {
  return Object.keys(dummyItineraries);
};
