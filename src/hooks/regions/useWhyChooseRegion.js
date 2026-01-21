"use client";

import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { COLLECTIONS } from "@/config";

/**
 * Custom hook to fetch why_choose_region data from Firestore
 * @param {string} regionId - The ID of the region to fetch data for
 * @returns {Object} - { whyChooseData, isLoading, error }
 */
export function useWhyChooseRegion(regionId) {
  const [whyChooseData, setWhyChooseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!regionId) {
      setIsLoading(false);
      return;
    }

    const fetchWhyChooseData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const docRef = doc(db, COLLECTIONS.WHY_CHOOSE_REGION, regionId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setWhyChooseData(data);
          console.log(`[useWhyChooseRegion] Successfully fetched data for region ID: ${regionId}`, data);
        } else {
          console.log(`[useWhyChooseRegion] No why_choose_region data found for region ID: ${regionId}`);
          setWhyChooseData(null);
        }
      } catch (err) {
        console.error(`[useWhyChooseRegion] Error fetching data for region ID ${regionId}:`, err);
        setError(err);
        setWhyChooseData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWhyChooseData();
  }, [regionId]);

  return { whyChooseData, isLoading, error };
}
