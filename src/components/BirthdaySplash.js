// src/components/BirthdaySplash.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BirthdayCakeSVG from "./BirthdayCakeSVG";
import FireworksOverlay from "./FireworksOverlay";
import "./BirthdaySplash.css";
import TypewriterMessage from "./TypewriterMessage";
import LoveLetterPopup from "./LoveLetterPopup";
import SurpriseModal from "./SurpriseModal";

export default function BirthdaySplash() {
  const [flamesOn, setFlamesOn] = useState(true);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showUnlock, setShowUnlock] = useState(false);       // ▶️ New: controls Unlock button
  const [showSurprise, setShowSurprise] = useState(false);
  const navigate = useNavigate();

  // Auto‑redirect after 30s
  // useEffect(() => {
  //   const timer = setTimeout(() => navigate("/birthday"), 3000000);
  //   return () => clearTimeout(timer);
  // }, [navigate]);

  // Candle‑blow handler
  const handleBlow = () => {
    setFlamesOn(false);
    setShowFireworks(true);
    setShowText(true);
    // 3s later, show the love‑letter popup
    setTimeout(() => setShowLetter(true), 3000);
  };

  // ▶️ New: when love‑letter closes, reveal the Unlock button
  const handleLetterClose = () => {
    setShowLetter(false);
    setShowUnlock(true);
  };

  return (
    <div className="birthday-splash">
      <button className="close-button" onClick={() => navigate("/birthday")}>
  ✕
</button>
      {/* ✨ Love message appears immediately */}
      <TypewriterMessage
        text="Every moment with you is magical. Today, let's celebrate the day that brought you into this world. 🎂💖"
        speed={40}
      />

      {/* 💓 Heartbeat cake until clicked */}
      <div className={flamesOn ? "heartbeat" : ""}>
        <BirthdayCakeSVG onBlow={handleBlow} />
      </div>

      {/* 🎉 Glitch heading after blow */}
      {showText && (
        <h1 className={`glitch-text ${showFireworks ? "glitch-fade-in" : ""}`}>
          🎉 Happy Birthday My Love 💖
        </h1>
      )}

      {/* 🕯️ Post‑blow prompt */}
      {!flamesOn && (
        <p className="cake-note">You blew out the candles! Make a wish 🕯️</p>
      )}

      {/* 🎆 Fireworks */}
      <FireworksOverlay show={showFireworks} />

      {/* ❤️ Love‑letter popup */}
      <LoveLetterPopup show={showLetter} onClose={handleLetterClose} />

      {/* 🔓 Unlock Surprise Button */}
      {showUnlock && (
        <button
          className="unlock-btn"
          onClick={() => setShowSurprise(true)}
        >
          Unlock the next surprise
        </button>
      )}

      {/* 🎁 Surprise Modal */}
      <SurpriseModal
        show={showSurprise}
        onClose={() => setShowSurprise(false)}
      />
      
    </div>
  );
}
