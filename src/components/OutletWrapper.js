import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./ThemeContainer.css"; // reuse same styling

export const CelebrationContext = React.createContext();

export function CelebrationContextProvider({ children }) {
  const [showFireworks, setShowFireworks] = useState(false);

  return (
    <CelebrationContext.Provider value={{ showFireworks, setShowFireworks }}>
      {children}
    </CelebrationContext.Provider>
  );
}

export default function OutletWrapper() {
  const [theme, setTheme] = useState("day");
  const toggleTheme = () => setTheme((prev) => (prev === "day" ? "night" : "day"));

  const location = useLocation(); // to highlight active route if needed

  return (
    <div className={`theme-container ${theme}-theme`}>
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/birthday" className="nav-link">Birthday</Link>
        <Link to="/proposal" className="nav-link">Proposal</Link>
        <Link to="/memories" className="nav-link">Memories</Link>

        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "day" ? "🌙 Night Mode" : "☀️ Day Mode"}
        </button>
      </nav>

      <Outlet /> {/* Render current route page */}
    </div>
  );
}
