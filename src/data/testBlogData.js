const image =
  "https://technovans.com/wp-content/uploads/2019/05/top-12-blogging-tips-for-beginners-1024x683.jpg";

// Dummy blog data
const featuredBlogs = [
  {
    id: 1,
    title: "10 Hidden Gems in Southeast Asia You Must Visit",
    excerpt:
      "Discover untouched paradises and authentic cultural experiences beyond the tourist trails in Southeast Asia.",
    image,
    category: "Destinations",
    author: "Sarah Johnson",
    date: "May 15, 2023",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "How to Pack Like a Pro: Essential Tips for Long-Term Travel",
    excerpt:
      "Master the art of efficient packing with these expert tips that will make your long-term travel experience more comfortable.",
    image,
    category: "Travel Tips",
    author: "Michael Chen",
    date: "April 22, 2023",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "Sustainable Tourism: How to Travel Responsibly in 2023",
    excerpt:
      "Learn how to minimize your environmental impact while maximizing authentic cultural experiences on your next adventure.",
    image,
    category: "Eco-Travel",
    author: "Emma Roberts",
    date: "June 7, 2023",
    readTime: "10 min read",
  },
];

const recentBlogs = [
  {
    id: 4,
    title: "The Ultimate Guide to European Christmas Markets",
    excerpt:
      "Experience the magic of European winter with our comprehensive guide to the most enchanting Christmas markets.",
    image,
    category: "Seasonal",
    author: "David Miller",
    date: "July 2, 2023",
    readTime: "7 min read",
  },
  {
    id: 5,
    title:
      "Budget-Friendly Luxury: 5-Star Experiences Without Breaking the Bank",
    excerpt:
      "Discover how to enjoy luxury travel experiences on a modest budget with these insider tips and tricks.",
    image,
    category: "Budget Travel",
    author: "Jessica Wong",
    date: "July 8, 2023",
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "Digital Nomad Visas: Countries Welcoming Remote Workers in 2023",
    excerpt:
      "A comprehensive guide to countries offering special visas for digital nomads and remote workers.",
    image,
    category: "Digital Nomad",
    author: "Ryan Cooper",
    date: "July 15, 2023",
    readTime: "9 min read",
  },
  {
    id: 7,
    title:
      "Family-Friendly Adventures: Destinations That Both Kids and Parents Will Love",
    excerpt:
      "Plan your next family vacation with these destinations that offer activities for all ages.",
    image,
    category: "Family Travel",
    author: "Sophia Martinez",
    date: "July 18, 2023",
    readTime: "6 min read",
  },
];

const blogCategories = [
  { id: 1, title: "Destinations", count: 24, slug: "destinations" },
  { id: 2, title: "Travel Tips", count: 18, slug: "travel-tips" },
  { id: 3, title: "Budget Travel", count: 12, slug: "budget-travel" },
  { id: 4, title: "Family Travel", count: 9, slug: "family-travel" },
  { id: 5, title: "Eco-Travel", count: 7, slug: "eco-travel" },
  { id: 6, title: "Digital Nomad", count: 10, slug: "digital-nomad" },
];

export { featuredBlogs, recentBlogs, blogCategories };
