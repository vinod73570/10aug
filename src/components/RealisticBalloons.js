// src/components/RealisticBalloons.js
import React, { useEffect, useState } from "react";
import "./RealisticBalloons.css";

// Multiple balloon colors for variety
const balloonImages = [
  "https://res.cloudinary.com/dr4ompqm4/image/upload/v1754759198/balloon_wcpgfx.png",
  "https://res.cloudinary.com/dr4ompqm4/image/upload/v1754759198/balloon_wcpgfx.png",
  "https://res.cloudinary.com/dr4ompqm4/image/upload/v1754759198/balloon_wcpgfx.png",
  "https://res.cloudinary.com/dr4ompqm4/image/upload/v1754759198/balloon_wcpgfx.png",
  "https://res.cloudinary.com/dr4ompqm4/image/upload/v1754759198/balloon_wcpgfx.png",
  
];

let balloonId = 0;

export default function RealisticBalloons({ show = false }) {
  const [balloons, setBalloons] = useState([]);

  useEffect(() => {
    if (!show) {
      setBalloons([]);
      return;
    }

    const spawnBalloon = () => {
      const newBalloon = {
        id: balloonId++,
        left: Math.random() * 90 + 5, // random horizontal position
        img: balloonImages[Math.floor(Math.random() * balloonImages.length)],
        size: Math.random() * 30 + 40, // width between 40-70px
        delay: Math.random() * 2, // animation delay
        duration: Math.random() * 5 + 8, // float speed between 8-13s
        rotate: Math.random() * 360, // random start rotation
      };
      setBalloons((prev) => [...prev, newBalloon]);

      // Remove after float duration
      setTimeout(() => {
        setBalloons((prev) => prev.filter((b) => b.id !== newBalloon.id));
      }, (newBalloon.duration + 1) * 1000);
    };

    const interval = setInterval(spawnBalloon, 400); // every 0.4s
    return () => clearInterval(interval);
  }, [show]);

  return (
    <>
      {balloons.map((balloon) => (
        <img
          key={balloon.id}
          src={balloon.img}
          className="realistic-balloon"
          style={{
            left: `${balloon.left}%`,
            width: `${balloon.size}px`,
            animationDelay: `${balloon.delay}s`,
            animationDuration: `${balloon.duration}s`,
            transform: `rotate(${balloon.rotate}deg)`,
          }}
          alt="balloon"
        />
      ))}
    </>
  );
}
