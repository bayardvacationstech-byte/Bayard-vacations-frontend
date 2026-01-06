import { v4 as uuidv4 } from "uuid";

const dealsData = [
  {
    id: uuidv4(),
    duration: {
      nights: 5,
      days: 6,
    },
    discountedPrice: 35499,
    originalPrice: 42599,
    destination: "vietnam",
    description:
      "Discover Hanoi’s historic charm, cruise Halong Bay’s emerald waters, and unwind on Da Nang’s golden beaches—all at unbeatable prices!",
    img: "/img/deals/vietnam.jpg",
  },
  {
    id: uuidv4(),
    duration: {
      nights: 3,
      days: 4,
    },
    discountedPrice: 22999,
    originalPrice: 27599,
    destination: "malaysia",
    description:
      "From Kuala Lumpur’s dazzling skyline to lush rainforests, pristine beaches, and rich cultural heritage—unlock an unforgettable journey with our Malaysia package today!",
    img: "/img/deals/malaysia.jpg",
  },
  {
    id: uuidv4(),
    duration: {
      nights: 4,
      days: 5,
    },
    discountedPrice: 18799,
    originalPrice: 22599,
    destination: "kerala",
    description:
      "Explore Cochin’s charm, Munnar’s lush tea gardens, Thekkady’s tranquil wildlife, and Alleppey’s serene backwaters.",
    img: "/img/deals/kerala.jpg",
  },
  {
    id: uuidv4(),
    duration: {
      nights: 4,
      days: 5,
    },
    discountedPrice: 18799,
    originalPrice: 22599,
    destination: "andaman",
    description:
      "Escape to this tropical paradise with our exclusive offer and experience crystal-clear waters, stunning beaches, and vibrant marine life like never before!",
    img: "/img/deals/andaman.jpg",
  },
  {
    id: uuidv4(),
    duration: {
      nights: 4,
      days: 5,
    },
    discountedPrice: 18799,
    originalPrice: 22599,
    destination: "thailand",
    description:
      "Discover vibrant culture, stunning beaches, and unforgettable experiences with our exclusive package!",
    img: "/img/deals/thailand.jpg",
  },
];

export default dealsData;
