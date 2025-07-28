// src/components/CelebrationContext.js
import React, { createContext, useState } from "react";

export const CelebrationContext = createContext();

export default function CelebrationContextProvider({ children }) {
  const [showFireworks, setShowFireworks] = useState(false);

  return (
    <CelebrationContext.Provider value={{ showFireworks, setShowFireworks }}>
      {children}
    </CelebrationContext.Provider>
  );
}
