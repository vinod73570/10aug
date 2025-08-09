import React, { useState, useEffect } from "react";
import "./Home.css";

function Home() {
  const quotes = [
    "“In you, I’ve found the love of my life and my closest, truest friend.”",
    "“Every moment with you is a treasure I will cherish forever.”",
    "“You are my today and all of my tomorrows.”",
    "“I love you not only for what you are, but for what I am when I’m with you.”",
    "“Together is my favorite place to be.”"
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((c) => (c + 1) % quotes.length),
      5000
    );
    return () => clearInterval(timer);
  }, [quotes.length]);

  useEffect(() => {
    const handleMove = (e) => {
      const heart = document.createElement("span");
      heart.className = "cursor-heart";
      heart.textContent = "💖";
      heart.style.left = `${e.clientX - 10}px`;
      heart.style.top = `${e.clientY - 10}px`;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1000);
    };
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("touchmove", handleMove);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("touchmove", handleMove);
    };
  }, []);

  const scrollToJourney = () => {
    const el = document.getElementById("journey");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-container">
      {/* Theme toggle button */}
      {/* <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "day" ? "🌙 Night Mode" : "☀️ Day Mode"}
      </button> */}

      <div className="heart-background"></div>

      <h1 className="home-heading">🎂 Happy Birthday, My Love 💖</h1>
      <p className="home-text">I created this just for you — a little surprise to make your day as special as you are 💕</p>
      <p className="home-subtext">Scroll through your journey, and say “yes” when you’re ready 💍</p>

      <section className="middle">
        <div className="photo">
          <img src="https://res.cloudinary.com/dr4ompqm4/image/upload/v1754715304/IMG_2775_-_Copy_cotiki.jpg" alt="My Love" className="home-photo" />
        </div>

        <div className="message-box">
          <p className="animated-text">You are the reason behind my smile, my love, and my happiness 💕</p>
          <button className="journey-button" onClick={scrollToJourney}>Start Our Love Story 📖</button>
        </div>

        <div className="photo">
          <img src="https://res.cloudinary.com/dr4ompqm4/image/upload/v1754715284/IMG_3384_-_Copy_kjlpjr.jpg" alt="My Love" className="home-photo" />
        </div>
      </section>

      <div className="quote-carousel">
        <p className="quote-text">{quotes[current]}</p>
      </div>

      <div id="journey" className="journey-anchor"></div>
    </div>
  );
}

export default Home;
