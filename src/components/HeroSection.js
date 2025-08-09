// src/components/HeroSection.js
import React from "react";
import "./HeroSection.css";

export default function HeroSection({ name = "Darling" }) {
  return (
    <section className="hero-section">
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-title">Happy Birthday, {name} !</h1>
        <p className="hero-subtitle">May your day be as beautiful as you are ✨</p>
      </div>
      
    </section>
  );
}
    