// src/components/RealisticBalloons.js
import React, { useEffect, useState } from "react";
import "./RealisticBalloons.css";

const balloonImages = [
  "/balloon.png"
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
        size: Math.random() * 20 + 40, // width between 40-60px
        delay: Math.random() * 2, // random animation delay
      };
      setBalloons((prev) => [...prev, newBalloon]);

      // Remove after 12s (balloon float duration)
      setTimeout(() => {
        setBalloons((prev) => prev.filter((b) => b.id !== newBalloon.id));
      }, 12000);
    };

    const interval = setInterval(spawnBalloon, 400); // One balloon every 0.4s
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
          }}
          alt="balloon"
        />
      ))}
    </>
  );
}
