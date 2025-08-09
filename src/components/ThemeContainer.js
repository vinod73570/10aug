// src/components/ThemeContainer.js
import React, { useState,useEffect, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import "./ThemeContainer.css";
import FireworksOverlay from "./FireworksOverlay";
import { MusicContext } from "./MusicCenter";


// import GlowingBirthdayText from "./GlowingBirthdayText";


import RealisticBalloons from "./RealisticBalloons";
import { CelebrationContext } from "./CelebrationContext"; // ✅ Only import, don't redefine

export default function ThemeContainer() {
  const [theme, setTheme] = useState("day");
  const toggleTheme = () => setTheme((t) => (t === "day" ? "night" : "day"));
  useEffect(() => {
  console.log("Window width:", window.innerWidth);
}, []);


  // ✅ Access global fireworks state from context
  const { showFireworks, setShowFireworks } = useContext(CelebrationContext);

  // 🎵 Music controls
  const {
    isPlaying,
    isMuted,
    togglePlay,
    nextTrack,
    toggleMute,
  } = useContext(MusicContext);

  return (
    <div className={`theme-container ${theme}-theme`}>
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/birthday" className="nav-link">Birthday</Link>
        <Link to="/proposal" className="nav-link">Proposal</Link>
        <Link to="/memories" className="nav-link">Memories</Link>
        <Link to="/gallery" className="nav-link">gallery</Link>
       

        {/* 🎵 Music Buttons */}
        {/* <div className="music-controls">
          <button onClick={togglePlay} className="nav-button">
            {isPlaying ? "⏸️" : "▶️"}
          </button>
          <button onClick={nextTrack} className="nav-button">⏭️</button>
          <button onClick={toggleMute} className="nav-button">
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div> */}

        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "day" ? "🌙 Night Mode" : "☀️ Day Mode"}
        </button>
        {/* <GlowingBirthdayText show={showFireworks} /> */}

      </nav>

      <Outlet />

      {/* Celebration Effects */}
      {/* <HeartRain show={showFireworks} /> */}
    
      <RealisticBalloons show={showFireworks} />
      <FireworksOverlay show={showFireworks} />
    </div>
  );
}
