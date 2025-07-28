// src/components/Birthday.js
import React from "react";
import HeroSection from "./HeroSection";
import CountdownTimer from "./CountdownTimer";
import PhotoCollage from "./PhotoCollage";

export default function Birthday({ onCountdownComplete }) {
  return (
    <div className="birthday-page">
      <HeroSection name="Her Name" />

      {/* Pass onComplete handler here */}
      <CountdownTimer
        // targetDate="2025-08-10T00:00:00"
       
        // targetDate={new Date(Date.now() + 60 * 100).toISOString()}

        onComplete={onCountdownComplete}
      />

      <PhotoCollage />
    </div>
  );
}
