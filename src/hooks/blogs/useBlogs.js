"use client";
import { useState, useCallback } from "react";
import {
  collection,
  query,
  where,
  getDocsFromServer,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { COLLECTIONS } from "@/config";
import { sanitizeDocumentData } from "@/utils/firebase";

export const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBlogs = useCallback(async (options = {}) => {
    const { 
      region = null, 
      category = null, 
      featured = null, 
      limitCount = 6, 
      excludeId = null 
    } = options;

    setIsLoading(true);
    setError(null);

    try {
      const blogsRef = collection(db, COLLECTIONS.BLOGS);
      const constraints = [where("status", "==", "published")];

      if (featured !== null) {
        constraints.push(where("featured", "==", featured));
      }

      if (region) {
        constraints.push(where("region", "==", region));
      } else if (category) {
        constraints.push(where("categories", "array-contains", category));
      }

      constraints.push(orderBy("createdAt", "desc"));
      constraints.push(limit(limitCount + (excludeId ? 1 : 0)));

      const q = query(blogsRef, ...constraints);
      const snapshot = await getDocsFromServer(q);
      
      let fetchedBlogs = [];
      snapshot.forEach((doc) => {
        const data = sanitizeDocumentData(doc);
        if (excludeId && data.id === excludeId) return;
        fetchedBlogs.push(data);
      });

      console.log('[useBlogs] Fetched blogs:', {
        region,
        category,
        totalFetched: fetchedBlogs.length,
        blogs: fetchedBlogs.map(b => ({ id: b.id, title: b.title, region: b.region, tags: b.tags }))
      });

      setBlogs(fetchedBlogs.slice(0, limitCount));
    } catch (err) {
      console.warn("Firestore query failed, attempting in-memory fallback:", err.message);
      
      // Fallback: If query fails (likely missing index), fetch all published blogs and filter in memory
      try {
        const fallbackQ = query(
          collection(db, COLLECTIONS.BLOGS),
          where("status", "==", "published")
        );
        const fallbackSnapshot = await getDocsFromServer(fallbackQ);
        let allBlogs = [];
        fallbackSnapshot.forEach((doc) => {
          allBlogs.push(sanitizeDocumentData(doc));
        });
        
        console.log('[useBlogs] Fallback - All published blogs fetched:', {
          total: allBlogs.length,
          blogs: allBlogs.map(b => ({ 
            id: b.id, 
            title: b.title, 
            region: b.region, 
            tags: b.tags,
            categories: b.categories 
          }))
        });

        // Robust Memory filtering
        let filtered = allBlogs;
        
        if (featured !== null) {
          filtered = filtered.filter(b => b.featured === featured);
        }
        
        if (region) {
          // Filter by region field OR tags containing the region name
          // This allows more flexible matching - blogs can be tagged with region-related keywords
          const regionLower = region.toLowerCase().replace(/-/g, ' ');
          console.log('[useBlogs] Filtering by region:', { region, regionLower });
          
          filtered = filtered.filter(b => {
            // Check if blog has a region field that matches
            if (b.region === region) {
              console.log('[useBlogs] ✓ Blog matched by region field:', b.title);
              return true;
            }
            
            // Check if any tag contains the region name
            if (b.tags && Array.isArray(b.tags)) {
              const hasMatchingTag = b.tags.some(tag => 
                tag.toLowerCase().includes(regionLower)
              );
              if (hasMatchingTag) {
                console.log('[useBlogs] ✓ Blog matched by tags:', b.title, b.tags);
              }
              return hasMatchingTag;
            }
            
            return false;
          });
          
          console.log('[useBlogs] After region filtering:', {
            filteredCount: filtered.length,
            filteredBlogs: filtered.map(b => ({ id: b.id, title: b.title }))
          });
        } else if (category) {
          filtered = filtered.filter(b => b.categories && b.categories.includes(category));
        }

        // Memory sorting by date
        filtered.sort((a, b) => {
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
          return dateB - dateA;
        });

        if (excludeId) {
          filtered = filtered.filter(b => b.id !== excludeId);
        }

        // Final Global Fallback: If still empty after filtering, just take the most recent blogs
        if (filtered.length === 0) {
          filtered = allBlogs;
          filtered.sort((a, b) => {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
            return dateB - dateA;
          });
          if (excludeId) {
            filtered = filtered.filter(b => b.id !== excludeId);
          }
        }
        
        setBlogs(filtered.slice(0, limitCount));
      } catch (fallbackErr) {
        console.error("Critical: Fallback also failed:", fallbackErr);
        setError(fallbackErr);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { blogs, isLoading, error, fetchBlogs };
};
