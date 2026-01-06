"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamically import map components (leaflet requires browser)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
const Polyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  { ssr: false }
);
const useMap = dynamic(
  () => import("react-leaflet").then((mod) => mod.useMap),
  { ssr: false }
);

// Component to capture map instance and handle panning
function MapController({ mapRef }) {
  if (typeof window !== "undefined") {
    const { useMap: useMapHook } = require("react-leaflet");
    const MapInner = () => {
      const map = useMapHook();
      mapRef.current = map;
      return null;
    };
    return <MapInner />;
  }
  return null;
}

/**
 * Interactive map showing package itinerary with day markers and route visualization
 */
export default function ItineraryMap({ itineraries, citiesList }) {
  const [isClient, setIsClient] = useState(false);
  const [customIcon, setCustomIcon] = useState(null);
  const [airplaneIcon, setAirplaneIcon] = useState(null);
  const [airplanePosition, setAirplanePosition] = useState(null);
  const [airplaneRotation, setAirplaneRotation] = useState(0); // Track plane heading
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeDay, setActiveDay] = useState(1); // Track active day for popup
  const animatingRef = useRef(false); // Use ref to avoid stale closure
  const markerRefs = useRef({}); // Store marker refs for popup control
  const mapRef = useRef(null); // Map reference

  useEffect(() => {
    setIsClient(true);

    // Create custom marker icons for Leaflet
    if (typeof window !== "undefined") {
      const L = require("leaflet");

      // Fix for default marker icon issue in Next.js
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "/leaflet/marker-icon-2x.png",
        iconUrl: "/leaflet/marker-icon.png",
        shadowUrl: "/leaflet/marker-shadow.png",
      });

      // Create custom numbered icon
      const createNumberedIcon = (dayNumber) => {
        return L.divIcon({
          className: "custom-day-marker",
          html: `
            <div class="marker-pin">
              <div class="marker-number">${dayNumber}</div>
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40],
        });
      };

      // Create airplane icon with rotation parameter using a clean SVG icon
      const createAirplaneIcon = (rotation = 0) => {
        return L.divIcon({
          className: "airplane-marker",
          html: `
            <div class="airplane-icon" style="transform: rotate(${rotation}deg);">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #00d9ff; filter: drop-shadow(0 0 8px rgba(0, 217, 255, 0.8));">
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
              </svg>
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });
      };

      // Wrap in arrow function to store the function itself, not execute it
      setCustomIcon(() => createNumberedIcon);
      setAirplaneIcon(() => createAirplaneIcon);
    }
  }, []);

  // Function to animate airplane from one point to another
  const animateAirplane = (fromPoint, toPoint) => {
    // Use ref to check if animating to avoid stale closure
    if (animatingRef.current) return;
    
    animatingRef.current = true;
    setIsAnimating(true);
    setAirplanePosition(fromPoint);
    
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    const fromLat = fromPoint[0];
    const fromLng = fromPoint[1];
    const toLat = toPoint[0];
    const toLng = toPoint[1];
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth easing function
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentLat = fromLat + (toLat - fromLat) * easeProgress;
      const currentLng = fromLng + (toLng - fromLng) * easeProgress;
      
      setAirplanePosition([currentLat, currentLng]);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        animatingRef.current = false;
        setIsAnimating(false);
      }
    };
    
    requestAnimationFrame(animate);
  };

  // Parse cities from citiesList string
  const getCityCoordinates = (cityName) => {
    // Comprehensive destination coordinates database
    const cityCoords = {
      // India - Major Cities
      mumbai: [19.076, 72.8777],
      delhi: [28.6139, 77.209],
      "new delhi": [28.6139, 77.209],
      bangalore: [12.9716, 77.5946],
      bengaluru: [12.9716, 77.5946],
      goa: [15.2993, 74.124],
      jaipur: [26.9124, 75.7873],
      kochi: [9.9312, 76.2673],
      cochin: [9.9312, 76.2673],
      udaipur: [24.5854, 73.7125],
      agra: [27.1767, 78.0081],
      varanasi: [25.3176, 82.9739],
      kolkata: [22.5726, 88.3639],
      chennai: [13.0827, 80.2707],
      hyderabad: [17.385, 78.4867],
      pune: [18.5204, 73.8567],
      ahmedabad: [23.0225, 72.5714],
      surat: [21.1702, 72.8311],
      lucknow: [26.8467, 80.9462],
      kanpur: [26.4499, 80.3319],
      nagpur: [21.1458, 79.0882],
      // Maharashtra Pilgrimage & Tourist Cities
      shirdi: [19.7666, 74.4773],
      "shani shingnapur": [19.3833, 74.45],
      nasik: [19.9975, 73.7898],
      nashik: [19.9975, 73.7898],
      aurangabad: [19.8762, 75.3433],
      "ajanta caves": [20.5519, 75.7033],
      ajanta: [20.5519, 75.7033],
      "ellora caves": [20.0269, 75.1790],
      ellora: [20.0269, 75.1790],
      mahabaleshwar: [17.9256, 73.6394],
      lonavala: [18.7481, 73.4072],
      panchgani: [17.9256, 73.7983],
      kolhapur: [16.7050, 74.2433],
      alibaug: [18.6414, 72.8722],
      // Other pilgrimage cities
      tirupati: [13.6288, 79.4192],
      varanasi: [25.3176, 82.9739],
      kashi: [25.3176, 82.9739],
      vrindavan: [27.5833, 77.6833],
      mathura: [27.4924, 77.6737],
      ayodhya: [26.7922, 82.1998],
      puri: [19.8135, 85.8312],
      dwarka: [22.2394, 68.9678],
      somnath: [20.9050, 70.4020],
      ujjain: [23.1765, 75.7885],
      bodh: [24.6961, 84.9869],
      "bodh gaya": [24.6961, 84.9869],
      bodhgaya: [24.6961, 84.9869],
      indore: [22.7196, 75.8577],
      thane: [19.2183, 72.9781],
      bhopal: [23.2599, 77.4126],
      visakhapatnam: [17.6868, 83.2185],
      pimpri: [18.6298, 73.7997],
      patna: [25.5941, 85.1376],
      vadodara: [22.3072, 73.1812],
      ghaziabad: [28.6692, 77.4538],
      ludhiana: [30.901, 75.8573],
      coimbatore: [11.0168, 76.9558],
      madurai: [9.9252, 78.1198],
      chandigarh: [30.7333, 76.7794],
      mysore: [12.2958, 76.6394],
      mysuru: [12.2958, 76.6394],
      jodhpur: [26.2389, 73.0243],
      amritsar: [31.634, 74.8723],
      shimla: [31.1048, 77.1734],
      manali: [32.2396, 77.1887],
      rishikesh: [30.0869, 78.2676],
      haridwar: [29.9457, 78.1642],
      darjeeling: [27.036, 88.2627],
      gangtok: [27.3389, 88.6065],
      ooty: [11.4102, 76.695],
      kodaikanal: [10.2381, 77.4892],
      munnar: [10.0889, 77.0595],
      wayanad: [11.6854, 76.1320],
      coorg: [12.3375, 75.8069],
      pondicherry: [11.9416, 79.8083],
      puducherry: [11.9416, 79.8083],
      rameswaram: [9.2876, 79.3129],
      andaman: [11.6234, 92.7265],
      "port blair": [11.6234, 92.7265],
      leh: [34.1526, 77.577],
      ladakh: [34.1526, 77.577],
      srinagar: [34.0837, 74.7973],
      gulmarg: [34.0484, 74.3805],
      
      // Azerbaijan & Caucasus
      baku: [40.4093, 49.8671],
      ganja: [40.6828, 46.3606],
      sumqayit: [40.5855, 49.6317],
      sheki: [41.1919, 47.1706],
      quba: [41.3611, 48.5133],
      gabala: [40.9981, 47.8456],
      lankaran: [38.7536, 48.8511],
      shamakhi: [40.6319, 48.6422],
      khachmaz: [41.4631, 48.8022],
      mingachevir: [40.7700, 47.0597],
      nakhchivan: [39.2089, 45.4122],
      tbilisi: [41.7151, 44.8271],
      yerevan: [40.1872, 44.5152],
      
      // Southeast Asia
      bali: [-8.3405, 115.092],
      denpasar: [-8.6705, 115.2126],
      ubud: [-8.5069, 115.2625],
      singapore: [1.3521, 103.8198],
      bangkok: [13.7563, 100.5018],
      phuket: [7.8804, 98.3923],
      "kuala lumpur": [3.139, 101.6869],
      penang: [5.4164, 100.3327],
      langkawi: [6.3501, 99.8001],
      hanoi: [21.0285, 105.8542],
      "ho chi minh": [10.8231, 106.6297],
      "halong bay": [20.9101, 107.1839],
      "siem reap": [13.3671, 103.8448],
      "phnom penh": [11.5564, 104.9282],
      yangon: [16.8661, 96.1951],
      mandalay: [21.9588, 96.0891],
      vientiane: [17.9757, 102.6331],
      jakarta: [-6.2088, 106.8456],
      manila: [14.5995, 120.9842],
      boracay: [11.9674, 121.9248],
      
      // Middle East
      dubai: [25.2048, 55.2708],
      "abu dhabi": [24.4539, 54.3773],
      sharjah: [25.3463, 55.4209],
      doha: [25.2854, 51.531],
      muscat: [23.5880, 58.3829],
      riyadh: [24.7136, 46.6753],
      jeddah: [21.5433, 39.1728],
      cairo: [30.0444, 31.2357],
      istanbul: [41.0082, 28.9784],
      ankara: [39.9334, 32.8597],
      jerusalem: [31.7683, 35.2137],
      amman: [31.9454, 35.9284],
      beirut: [33.8886, 35.4955],
      
      // Europe
      london: [51.5074, -0.1278],
      paris: [48.8566, 2.3522],
      rome: [41.9028, 12.4964],
      barcelona: [41.3851, 2.1734],
      madrid: [40.4168, -3.7038],
      berlin: [52.52, 13.405],
      amsterdam: [52.3676, 4.9041],
      brussels: [50.8503, 4.3517],
      vienna: [48.2082, 16.3738],
      prague: [50.0755, 14.4378],
      budapest: [47.4979, 19.0402],
      athens: [37.9838, 23.7275],
      santorini: [36.3932, 25.4615],
      mykonos: [37.4467, 25.3289],
      venice: [45.4408, 12.3155],
      florence: [43.7696, 11.2558],
      milan: [45.4642, 9.19],
      zurich: [47.3769, 8.5417],
      geneva: [46.2044, 6.1432],
      lisbon: [38.7223, -9.1393],
      porto: [41.1579, -8.6291],
      dublin: [53.3498, -6.2603],
      edinburgh: [55.9533, -3.1883],
      copenhagen: [55.6761, 12.5683],
      stockholm: [59.3293, 18.0686],
      oslo: [59.9139, 10.7522],
      helsinki: [60.1699, 24.9384],
      moscow: [55.7558, 37.6173],
      "st petersburg": [59.9311, 30.3609],
      reykjavik: [64.1466, -21.9426],
      
      // Americas
      "new york": [40.7128, -74.006],
      "los angeles": [34.0522, -118.2437],
      "san francisco": [37.7749, -122.4194],
      chicago: [41.8781, -87.6298],
      miami: [25.7617, -80.1918],
      "las vegas": [36.1699, -115.1398],
      seattle: [47.6062, -122.3321],
      boston: [42.3601, -71.0589],
      "washington dc": [38.9072, -77.0369],
      orlando: [28.5383, -81.3792],
      toronto: [43.6532, -79.3832],
      vancouver: [49.2827, -123.1207],
      montreal: [45.5017, -73.5673],
      "mexico city": [19.4326, -99.1332],
      cancun: [21.1619, -86.8515],
      "buenos aires": [-34.6037, -58.3816],
      "rio de janeiro": [-22.9068, -43.1729],
      "sao paulo": [-23.5505, -46.6333],
      lima: [-12.0464, -77.0428],
      cusco: [-13.5319, -71.9675],
      bogota: [4.711, -74.0721],
      santiago: [-33.4489, -70.6693],
      
      // East Asia
      tokyo: [35.6762, 139.6503],
      osaka: [34.6937, 135.5023],
      kyoto: [35.0116, 135.7681],
      seoul: [37.5665, 126.978],
      busan: [35.1796, 129.0756],
      beijing: [39.9042, 116.4074],
      shanghai: [31.2304, 121.4737],
      "hong kong": [22.3193, 114.1694],
      macau: [22.1987, 113.5439],
      taipei: [25.033, 121.5654],
      
      // Oceania
      sydney: [-33.8688, 151.2093],
      melbourne: [-37.8136, 144.9631],
      brisbane: [-27.4698, 153.0251],
      perth: [-31.9505, 115.8605],
      auckland: [-36.8485, 174.7633],
      queenstown: [-45.0312, 168.6626],
      fiji: [-17.7134, 178.065],
      
      // Africa
      "cape town": [-33.9249, 18.4241],
      johannesburg: [-26.2041, 28.0473],
      nairobi: [-1.2864, 36.8172],
      marrakech: [31.6295, -7.9811],
      casablanca: [33.5731, -7.5898],
      cairo: [30.0444, 31.2357],
      luxor: [25.6872, 32.6396],
      zanzibar: [-6.1659, 39.2026],
      "victoria falls": [-17.9243, 25.8572],
      
      // Maldives & Islands
      maldives: [3.2028, 73.2207],
      male: [4.1755, 73.5093],
      mauritius: [-20.1609, 57.5012],
      seychelles: [-4.6796, 55.492],
      bora: [-16.5004, -151.7414],
      "bora bora": [-16.5004, -151.7414],
      tahiti: [-17.6509, -149.4260],
      hawaii: [19.8968, -155.5828],
      honolulu: [21.3099, -157.8581],
      maui: [20.7984, -156.3319],
    };

    const normalizedCity = cityName.toLowerCase().trim();
    
    // Check if we have coordinates for this city
    if (cityCoords[normalizedCity]) {
      return cityCoords[normalizedCity];
    }
    
    // Fallback: Generate dummy coordinates based on city name hash
    // This ensures every city gets a unique, consistent position
    let hash = 0;
    for (let i = 0; i < normalizedCity.length; i++) {
      hash = ((hash << 5) - hash) + normalizedCity.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Generate lat/lng in a reasonable range (India/Asia region as default)
    const lat = 10 + (Math.abs(hash % 30)); // Range: 10 to 40 degrees N
    const lng = 70 + (Math.abs(hash % 50)); // Range: 70 to 120 degrees E
    
    return [lat, lng];
  };

  // Extract route points from itineraries and citiesList
  const getRoutePoints = () => {
    if (!itineraries || itineraries.length === 0) {
      // Fallback to citiesList if no itineraries
      if (!citiesList) return [];
      const cities = citiesList.split("-").filter((city) => city.trim());
      return cities.map((city, index) => ({
        position: getCityCoordinates(city),
        city: city.trim(),
        dayNumber: index + 1,
        itinerary: null,
      }));
    }

    // Create a point for each day in the itinerary
    const points = itineraries.map((itinerary, index) => {
      // Try to extract city from itinerary title or description
      let cityName = null;
      
      // Common patterns in titles: "Arrival to Baku", "Baku - City Tour", "Explore Baku"
      const title = (itinerary.title || '').toLowerCase();
      const description = (itinerary.description || '').toLowerCase();
      
      // Try to extract from title first
      // Pattern: "to [city]", "[city] -", "in [city]", "arrival in/at/to [city]"
      const toMatch = title.match(/(?:to|in|at)\s+([a-z\s]+?)(?:\s*-|\s*$|,)/i);
      const dashMatch = title.match(/^([a-z\s]+?)\s*-/i);
      const singleWordMatch = title.match(/^([a-z]+)$/i);
      
      if (toMatch && toMatch[1]) {
        cityName = toMatch[1].trim();
      } else if (dashMatch && dashMatch[1]) {
        cityName = dashMatch[1].trim();
      } else if (singleWordMatch && singleWordMatch[1]) {
        cityName = singleWordMatch[1].trim();
      }
      
      // If still no city found, try the citiesList as fallback
      if (!cityName && citiesList) {
        const cities = citiesList.split("-").filter((city) => city.trim());
        
        // Use the cities array cyclically or map to the closest city
        if (cities.length > 0) {
          // If we have fewer cities than days, reuse cities
          const cityIndex = Math.min(index, cities.length - 1);
          cityName = cities[cityIndex];
        }
      }
      
      // Last resort: use "Day N Location" as placeholder
      if (!cityName) {
        cityName = `Day ${index + 1} Location`;
      }
      
      return {
        position: getCityCoordinates(cityName),
        city: cityName.trim(),
        dayNumber: index + 1,
        itinerary: itinerary,
      };
    });

    // Add slight offsets to markers at the same location so they're all visible
    const offsetPoints = points.map((point, index) => {
      // Find how many previous points have the same coordinates
      const sameLocationCount = points.slice(0, index).filter(
        p => p.position[0] === point.position[0] && p.position[1] === point.position[1]
      ).length;
      
      if (sameLocationCount > 0) {
        // Add circular offset: larger radius around the original point
        const offsetRadius = 0.05; // About 5km offset for better visibility
        const angle = (sameLocationCount * 45) * (Math.PI / 180); // 45 degrees apart
        const latOffset = offsetRadius * Math.cos(angle);
        const lngOffset = offsetRadius * Math.sin(angle);
        
        return {
          ...point,
          position: [
            point.position[0] + latOffset,
            point.position[1] + lngOffset
          ],
          originalPosition: point.position, // Keep original for polyline
        };
      }
      
      return {
        ...point,
        originalPosition: point.position,
      };
    });

    return offsetPoints;
  };

  // Memoize route points to prevent recalculation on every animation frame
  const routePoints = useMemo(() => getRoutePoints(), [itineraries, citiesList]);

  // Function to fly to next day and open its popup
  const flyToNextDay = (currentDayNumber) => {
    if (animatingRef.current) return;
    if (currentDayNumber >= routePoints.length) return;
    
    const fromPoint = routePoints[currentDayNumber - 1];
    const toPoint = routePoints[currentDayNumber];
    
    if (!fromPoint || !toPoint) return;
    
    animatingRef.current = true;
    setIsAnimating(true);
    
    const fromPos = fromPoint.position;
    const toPos = toPoint.position;
    
    // Calculate rotation angle (heading direction)
    const deltaLat = toPos[0] - fromPos[0];
    const deltaLng = toPos[1] - fromPos[1];
    const angleRadians = Math.atan2(deltaLng, deltaLat);
    const angleDegrees = angleRadians * (180 / Math.PI);
    setAirplaneRotation(angleDegrees);
    
    setAirplanePosition(fromPos);
    
    const duration = 3000; // 3 seconds for smooth flight
    const startTime = performance.now();
    
    const moveAirplane = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const lat = fromPos[0] + (toPos[0] - fromPos[0]) * easeProgress;
      const lng = fromPos[1] + (toPos[1] - fromPos[1]) * easeProgress;
      
      setAirplanePosition([lat, lng]);
      
      if (progress < 1) {
        requestAnimationFrame(moveAirplane);
      } else {
        animatingRef.current = false;
        setIsAnimating(false);
        setActiveDay(currentDayNumber + 1);
        
        // Close current popup
        const currentMarker = markerRefs.current[currentDayNumber];
        if (currentMarker) {
          currentMarker.closePopup();
        }
        
        // Smoothly pan map to destination and open next popup
        if (mapRef.current) {
          mapRef.current.flyTo(toPos, 12, { animate: true, duration: 1.5 });
        }
        
        setTimeout(() => {
          const nextMarker = markerRefs.current[currentDayNumber + 1];
          if (nextMarker) {
            nextMarker.openPopup();
          }
        }, 1600);
      }
    };
    
    requestAnimationFrame(moveAirplane);
  };

  // Auto-open Day 1 popup when map is ready and zoom to Day 1 location
  useEffect(() => {
    if (isClient && routePoints.length > 0) {
      const timer = setTimeout(() => {
        const firstMarker = markerRefs.current[1];
        if (firstMarker) {
          firstMarker.openPopup();
        }
        
        // Zoom to Day 1 location (zoom level 12 for good city detail)
        if (mapRef.current && routePoints[0]) {
          const firstPos = routePoints[0].position;
          mapRef.current.setView(firstPos, 12, { animate: true, duration: 1 });
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isClient, routePoints.length]);

  // Handle day marker click - animate airplane to next day
  const handleDayClick = (dayNumber, position) => {
    setActiveDay(dayNumber);
    
    // If this is not the last day, animate to the next day
    if (dayNumber < routePoints.length) {
      const nextPoint = routePoints.find(p => p.dayNumber === dayNumber + 1);
      if (nextPoint) {
        animateAirplane(position, nextPoint.originalPosition || nextPoint.position);
      }
    }
  };

  // Calculate map center (average of all points)
  const getMapCenter = () => {
    if (routePoints.length === 0) return [-8.3405, 115.092]; // Default to Bali

    const avgLat =
      routePoints.reduce((sum, point) => sum + point.position[0], 0) /
      routePoints.length;
    const avgLng =
      routePoints.reduce((sum, point) => sum + point.position[1], 0) /
      routePoints.length;

    return [avgLat, avgLng];
  };

  // Don't render on server
  if (!isClient) {
    return (
      <div className="w-full h-[400px] bg-slate-800/30 backdrop-blur-sm rounded-2xl animate-pulse flex items-center justify-center">
        <div className="text-slate-400">Loading map...</div>
      </div>
    );
  }

  if (routePoints.length === 0) {
    return (
      <div className="w-full h-[400px] bg-slate-800/30 backdrop-blur-sm rounded-2xl flex items-center justify-center">
        <div className="text-slate-400">
          Map unavailable - location data not found
        </div>
      </div>
    );
  }

  const polylinePositions = routePoints.map((point) => point.originalPosition || point.position);
  const mapCenter = getMapCenter();

  return (
    <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border border-cyan-500/20 shadow-[0_0_30px_rgba(0,217,255,0.1)]">
      <style jsx global>{`
        .custom-day-marker {
          background: transparent;
          border: none;
        }

        .marker-pin {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .marker-pin::before {
          content: "";
          position: absolute;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #00d9ff 0%, #0080ff 100%);
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 4px 15px rgba(0, 217, 255, 0.4);
        }

        .marker-pin::after {
          content: "";
          position: absolute;
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          bottom: 8px;
          box-shadow: 0 0 10px rgba(0, 217, 255, 0.6);
        }

        .marker-number {
          position: relative;
          z-index: 10;
          color: #0a0e1a;
          font-weight: bold;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .leaflet-popup-content-wrapper {
          background: linear-gradient(135deg, #0a0e1a 0%, #151b2e 100%);
          border: 1px solid rgba(0, 217, 255, 0.3);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        .leaflet-popup-content {
          color: white;
          margin: 12px;
        }

        .leaflet-popup-tip {
          background: #0a0e1a;
          border: 1px solid rgba(0, 217, 255, 0.3);
        }

        .leaflet-container {
          background: #f0f0f0;
        }

        .airplane-marker {
          background: transparent;
          border: none;
        }

        .airplane-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00d9ff;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)) drop-shadow(0 0 10px rgba(0, 217, 255, 0.5));
        }

        .airplane-icon svg {
          fill: currentColor;
        }
      `}</style>

      <MapContainer
        center={mapCenter}
        zoom={routePoints.length === 1 ? 12 : 5}
        className="w-full h-full z-0"
        zoomControl={true}
      >
        {/* Standard OSM tiles for better visibility */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Map controller for panning */}
        <MapController mapRef={mapRef} />

        {/* Flight path polyline */}
        {polylinePositions.length > 1 && (
          <Polyline
            positions={polylinePositions}
            pathOptions={{
              color: "#00d9ff",
              weight: 4,
              opacity: 0.8,
              dashArray: "10, 10",
              lineCap: "round",
            }}
          />
        )}

        {/* Day markers with refs for popup control */}
        {routePoints.map((point, index) =>
          customIcon ? (
            <Marker
              key={index}
              position={point.position}
              icon={customIcon(point.dayNumber)}
              ref={(ref) => {
                if (ref) markerRefs.current[point.dayNumber] = ref;
              }}
            >
              <Popup>
                <div className="min-w-[220px]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md text-xs font-bold text-white">
                      DAY {point.dayNumber}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-1 text-cyan-400">
                    {point.itinerary?.title || point.city}
                  </h3>
                  <p className="text-sm text-slate-300 mb-2">{point.city}</p>
                  {point.itinerary?.description && (
                    <p className="text-xs text-slate-400 line-clamp-3 mb-3">
                      {point.itinerary.description
                        .replace(/<[^>]*>/g, "")
                        .substring(0, 120)}
                      ...
                    </p>
                  )}
                  {point.dayNumber < routePoints.length && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        flyToNextDay(point.dayNumber);
                      }}
                      disabled={isAnimating}
                      className={`w-full py-2 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                        isAnimating
                          ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                          : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg'
                      }`}
                    >
                      ✈️ Fly to Day {point.dayNumber + 1}
                    </button>
                  )}
                  {point.dayNumber === routePoints.length && (
                    <div className="w-full py-2 px-4 rounded-lg text-sm font-bold bg-green-600 text-white text-center">
                      🎉 Final Destination
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          ) : null
        )}

        {/* Animated airplane marker */}
        {airplanePosition && airplaneIcon && (
          <Marker
            position={airplanePosition}
            icon={airplaneIcon(airplaneRotation)}
            zIndexOffset={1000}
          />
        )}
      </MapContainer>

      {/* Map overlay info */}
      <div className="absolute top-4 left-4 z-[1000]">
        <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-lg border border-cyan-500/30">
          <div className="text-xs text-cyan-400 font-semibold">
            TRAVEL ROUTE
          </div>
          <div className="text-xs text-slate-300">
            {routePoints.length} destinations
          </div>
        </div>
      </div>
    </div>
  );
}
