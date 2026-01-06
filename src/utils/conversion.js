/**
 * Triggers Google Ads conversion event for lead form submissions
 * This function should be called after a successful form submission
 */
export const trackLeadFormConversion = () => {
  // Check if gtag is available (from Google Analytics)
  if (typeof window !== "undefined" && window.gtag) {
    try {
      window.gtag("event", "conversion", {
        send_to: "AW-17117820324/cEZnCOW0mMcbEKTrtOI_",
        value: 1.0,
        currency: "INR",
      });
    } catch (error) {
      console.error("Error tracking conversion:", error);
    }
  } else {
    console.warn(
      "gtag is not available. Make sure Google Analytics is loaded."
    );
  }
};
