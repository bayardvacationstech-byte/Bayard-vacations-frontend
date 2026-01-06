"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { ArrowUpRight, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { COLLECTIONS } from "@/config";
import { sanitizeDocumentData } from "@/utils/firebase";

// Blog Card Component
const BlogCard = ({ blog, featured = false, categories = [] }) => {
  // Format date from Firebase timestamp
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Find the category name based on category ID
  const getCategoryName = () => {
    // If no categories field or empty, return Uncategorized
    if (!blog.categories || blog.categories.length === 0)
      return "Uncategorized";

    // Get the first category ID (assuming we display the primary category)
    const categoryId = blog.categories[0];

    // Find matching category by ID
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Uncategorized";
  };

  return (
    <article
      className={`sm:hoverable-card overflow-hidden rounded-2xl bg-white shadow-md ${featured ? "h-full" : ""}`}
    >
      <div
        className={`relative overflow-hidden ${featured ? "h-[320px]" : "h-[240px]"}`}
      >
        <Image
          src={blog.featuredImage}
          alt={blog.title}
          width={featured ? 600 : 400}
          height={featured ? 400 : 240}
          className="size-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-md bg-brand-blue px-3 py-1 text-xs font-medium text-white">
          {getCategoryName()}
        </div>
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-center gap-4 text-xs text-gray-500">
          <span>{formatDate(blog.createdAt)}</span>
        </div>
        <h3 className="mb-3 line-clamp-2 text-lg font-bold text-brand-blue">
          {blog.title}
        </h3>
        <p className="mb-4 line-clamp-3 text-sm text-gray-600">
          {blog.metaDescription || "Explore this article to learn more..."}
        </p>
        <Link
          href={`/blogs/${blog.slug}`}
          className="flex items-center gap-1 text-sm font-medium text-brand-blue"
        >
          Read more <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </article>
  );
};


const BlogsPage = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Query for blog categories first
        const categoriesQuery = query(collection(db, "blogCategories"));

        const categoriesSnapshot = await getDocs(categoriesQuery);

        // Process categories
        const categories = [];
        categoriesSnapshot.forEach((doc) => {
          categories.push(sanitizeDocumentData(doc));
        });

        // Sort categories by name
        categories.sort((a, b) => a.name.localeCompare(b.name));
        setBlogCategories(categories);

        // Query for featured blogs (with featured field set to true)
        const featuredQuery = query(
          collection(db, COLLECTIONS.BLOGS),
          where("status", "==", "published"),
          where("featured", "==", true),
          orderBy("createdAt", "desc")
        );

        // Query for recent blogs (most recent, regardless of featured status)
        const recentQuery = query(
          collection(db, COLLECTIONS.BLOGS),
          where("status", "==", "published"),
          orderBy("createdAt", "desc"),
          limit(4)
        );

        // Execute queries
        const [featuredSnapshot, recentSnapshot] = await Promise.all([
          getDocs(featuredQuery),
          getDocs(recentQuery),
        ]);

        // Process featured blogs
        const featured = [];
        featuredSnapshot.forEach((doc) => {
          const blogData = sanitizeDocumentData(doc);
          featured.push(blogData);
        });
        setFeaturedBlogs(featured);

        // Process recent blogs
        const recent = [];
        recentSnapshot.forEach((doc) => {
          const blogData = sanitizeDocumentData(doc);
          recent.push(blogData);
        });
        setRecentBlogs(recent);
      } catch (error) {
        console.error("Error fetching blogs:", error);

        // If there's an error due to missing Firebase index, fall back to client-side filtering
        if (error.code === "failed-precondition") {
          console.log("Index error, falling back to client-side filtering");
          fetchAllBlogsAndFilter();
        }
      } finally {
        setLoading(false);
      }
    };

    // Fallback function if we need to do client-side filtering
    const fetchAllBlogsAndFilter = async () => {
      try {
        // Query for blog categories
        const categoriesQuery = query(
          collection(db, COLLECTIONS.BLOG_CATEGORIES)
        );

        const categoriesSnapshot = await getDocs(categoriesQuery);

        // Process categories
        const categories = [];
        categoriesSnapshot.forEach((doc) => {
          categories.push(sanitizeDocumentData(doc));
        });

        // Sort categories by name
        categories.sort((a, b) => a.name.localeCompare(b.name));
        setBlogCategories(categories);

        // Get all published blogs
        const blogsQuery = query(
          collection(db, COLLECTIONS.BLOGS),
          where("status", "==", "published")
        );

        const blogsSnapshot = await getDocs(blogsQuery);

        // Process blogs
        const allBlogs = [];
        blogsSnapshot.forEach((doc) => {
          allBlogs.push(sanitizeDocumentData(doc));
        });

        // Sort blogs by createdAt (newest first)
        allBlogs.sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt);
          const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt);
          return dateB - dateA;
        });

        // Filter for featured blogs
        const featuredBlogs = allBlogs.filter((blog) => blog.featured === true);
        setFeaturedBlogs(featuredBlogs);

        // Get the most recent 4 blogs
        setRecentBlogs(allBlogs.slice(0, 4));
      } catch (error) {
        console.error("Error in fallback fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // FIXED: Count blogs per category - now checks if the blog.categories array includes the categoryId
  const getCategoryCount = (categoryId) => {
    let count = 0;

    // Get all blogs (both featured and recent, but avoid duplicates)
    const allBlogs = [...featuredBlogs];

    // Add recent blogs that aren't already in the featured blogs
    recentBlogs.forEach((recentBlog) => {
      if (!allBlogs.some((blog) => blog.id === recentBlog.id)) {
        allBlogs.push(recentBlog);
      }
    });

    // Count blogs that have this category in their categories array
    count = allBlogs.filter(
      (blog) =>
        blog.categories &&
        Array.isArray(blog.categories) &&
        blog.categories.includes(categoryId)
    ).length;

    return count;
  };

  return (
    <>
      {/* Hero Section - Matching About/FAQ pages */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50" />
        <Container className="relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <BookOpen className="w-4 h-4 text-brand-green" />
              <span className="text-sm font-bold uppercase tracking-wider text-white">Travel Stories</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Explore Our<br />
              <span className="text-brand-green">Blog</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed drop-shadow-md">
              Discover travel tips, destination guides, and inspiring stories to fuel your wanderlust and plan your next adventure.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Blog Posts */}
      <section className="section-padding">
        <Container>
          <h2 className="section-header-margin items-center gap-8 text-2xl uppercase !leading-[150%] text-brand-blue before:hidden before:h-px before:w-10 before:flex-1 before:bg-[#9E9E9E] before:content-[''] after:hidden after:h-px after:w-10 after:flex-1 after:bg-[#9E9E9E] after:content-[''] c-md:flex c-md:before:inline-block c-md:after:inline-block c-lg:text-4xl c-lg:!leading-[130%]">
            <div className="flex flex-col text-center font-nord">
              <span className="text-xl font-light text-[#798290]">
                editor&apos;s choice
              </span>
              <span className="text-4xl font-bold ">featured posts</span>
            </div>
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 c-md:grid-cols-2 c-lg:grid-cols-3">
            {loading ? (
              // Loading placeholder
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-[500px] animate-pulse rounded-2xl bg-gray-200"
                  ></div>
                ))
            ) : featuredBlogs.length > 0 ? (
              featuredBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  featured={true}
                  categories={blogCategories}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No featured blog posts found
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* Recent Blog Posts */}
      <section className="section-padding bg-[#F1F5FC]">
        <Container>
          <h2 className="section-header-margin items-center gap-8 text-2xl uppercase !leading-[150%] text-brand-blue before:hidden before:h-px before:w-10 before:flex-1 before:bg-[#798290] before:content-[''] after:hidden after:h-px after:w-10 after:flex-1 after:bg-[#798290] after:content-[''] c-md:flex c-md:before:inline-block c-md:after:inline-block c-lg:text-4xl c-lg:!leading-[130%]">
            <div className="text-center font-nord">
              <span className="text-4xl font-light text-[#798290]">Latest</span>{" "}
              <span className="text-4xl font-bold">articles</span>
            </div>
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 c-md:grid-cols-2 c-lg:grid-cols-4">
            {loading ? (
              // Loading placeholder
              Array(4)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-[400px] animate-pulse rounded-2xl bg-gray-200"
                  ></div>
                ))
            ) : recentBlogs.length > 0 ? (
              recentBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  categories={blogCategories}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No recent blog posts found
              </p>
            )}
          </div>
          <div className="mt-10 flex justify-center">
            <Button variant="outline" className="rounded-full px-8 py-6">
              <span>View All Posts</span>
              <ArrowUpRight className="ml-2 size-4" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Blog Categories & Newsletter */}
      <section className="section-padding">
        <Container>
          <div className="grid grid-cols-1 gap-10 c-lg:grid-cols-3">
            {/* Categories */}
            <div className="c-lg:col-span-1">
              <h3 className="mb-6 text-2xl font-bold text-brand-blue">
                Blog Categories
              </h3>
              <div className="space-y-3">
                {loading ? (
                  // Loading placeholder
                  Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="h-14 animate-pulse rounded-lg bg-gray-200"
                      ></div>
                    ))
                ) : blogCategories.length > 0 ? (
                  blogCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/blogs/categories/${category.slug}`}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-[#F1F5FC]"
                    >
                      <span className="font-medium text-gray-700">
                        {category.name}
                      </span>
                      {/* Count of blogs per category */}
                      <span className="rounded-full bg-[#E5ECF7] px-3 py-1 text-sm text-brand-blue">
                        {getCategoryCount(category.id)}
                      </span>
                    </Link>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No categories found
                  </p>
                )}
              </div>
            </div>

            {/* Newsletter */}
            <div className="rounded-2xl bg-brand-blue p-8 text-white c-lg:col-span-2">
              <h3 className="mb-2 font-nord text-3xl font-bold">
                Subscribe to Our Newsletter
              </h3>
              <p className="mb-6">
                Get the latest travel tips, destination guides, and exclusive
                offers delivered to your inbox.
              </p>
              <div className="flex flex-col gap-4 c-md:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full rounded-full px-6 py-3 text-gray-800 outline-none"
                />
                <Button
                  variant="success"
                  className="whitespace-nowrap rounded-full px-8 py-3"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default BlogsPage;
