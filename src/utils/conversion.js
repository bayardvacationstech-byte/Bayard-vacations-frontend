/**
 * Triggers conversion events for lead form submissions
 * This function should be called after a successful form submission
 * Tracks conversions in both Google Ads and Taboola
 */
export const trackLeadFormConversion = () => {
  // Google Ads conversion tracking
  if (typeof window !== "undefined" && window.gtag) {
    try {
      window.gtag("event", "conversion", {
        send_to: "AW-17183307275/cEZnCOW0mMcbEKTrtOI_",
        value: 1.0,
        currency: "INR",
      });
    } catch (error) {
      console.error("Google Ads conversion tracking failed:", error);
    }
  }

  // Taboola conversion tracking
  if (typeof window !== "undefined" && window.trackTaboolaConversion) {
    try {
      window.trackTaboolaConversion();
    } catch (error) {
      console.error("Taboola conversion tracking failed:", error);
    }
  }
};
