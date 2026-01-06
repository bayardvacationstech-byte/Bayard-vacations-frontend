import { useState, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";

// Global state to ensure modal state is accessible across the entire app
let globalModalState = {
  isOpen: false,
  region: "",
};
const globalModalListeners = new Set();

const useModal = () => {
  const [modalState, setModalState] = useState(globalModalState);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Function to update global state and notify all listeners
  const updateGlobalState = useCallback((newState) => {
    globalModalState = { ...globalModalState, ...newState };
    globalModalListeners.forEach((listener) => listener(globalModalState));
  }, []);

  // Function to open modal
  const openModal = useCallback(() => {
    updateGlobalState({ isOpen: true });
  }, [updateGlobalState]);

  // Function to close modal
  const closeModal = useCallback(() => {
    updateGlobalState({ isOpen: false });
  }, [updateGlobalState]);

  // Function to set region
  const setRegion = useCallback(
    (region) => {
      updateGlobalState({ region });
    },
    [updateGlobalState]
  );

  // Subscribe to global state changes
  useEffect(() => {
    const listener = (newState) => {
      setModalState(newState);
    };

    globalModalListeners.add(listener);

    // Cleanup on unmount
    return () => {
      globalModalListeners.delete(listener);
    };
  }, []);

  // Update region based on pathname - only on client side
  useEffect(() => {
    if (isClient && pathname) {
      const segments = pathname.split("/");
      const packageIndex = segments.findIndex(
        (segment) => segment === "packages"
      );
      if (packageIndex !== -1 && segments[packageIndex + 1]) {
        const newRegion = segments[packageIndex + 1];
        // Only update if region is different to prevent unnecessary updates
        if (globalModalState.region !== newRegion) {
          setRegion(newRegion);
        }
      }
    }
  }, [isClient, pathname, setRegion]);

  return {
    isOpen: modalState.isOpen,
    region: modalState.region,
    openModal,
    closeModal,
    setRegion,
  };
};

export default useModal;
