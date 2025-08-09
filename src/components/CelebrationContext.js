// src/components/CelebrationContext.js
import React, { createContext, useState, useEffect } from "react";

export const CelebrationContext = createContext();

export default function CelebrationContextProvider({ children }) {
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    let timer;
    if (showFireworks) {
      // Auto-stop after 3 minutes (180000 ms)
      timer = setTimeout(() => {
        setShowFireworks(false);
      }, 180000);
    }
    return () => clearTimeout(timer);
  }, [showFireworks]);

  return (
    <CelebrationContext.Provider value={{ showFireworks, setShowFireworks }}>
      {children}
    </CelebrationContext.Provider>
  );
}
