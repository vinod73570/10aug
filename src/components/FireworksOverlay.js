// src/components/FireworksOverlay.js
import React, { useEffect, useRef } from "react";
import { Fireworks } from "fireworks-js";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import "./FireworksOverlay.css";

export default function FireworksOverlay({ show = false }) {
  const containerRef = useRef(null);
  const fireworksRef = useRef(null);
  const [width, height] = useWindowSize();

  useEffect(() => {
    if (show && containerRef.current && !fireworksRef.current) {
      fireworksRef.current = new Fireworks(containerRef.current, {
        rocketsPoint: { min: 0, max: 100 },
        hue: { min: 0, max: 360 },
        delay: { min: 15, max: 30 },
        speed: 3,
        acceleration: 1.05,
        friction: 0.95,
        gravity: 1.5,
        particles: 60,
        trace: 3,
        explosion: 6,
        autoresize: true,
        brightness: {
          min: 50,
          max: 80,
          decay: { min: 0.015, max: 0.03 },
        },
        boundaries: {
          top: 50,
          bottom: window.innerHeight,
          left: 50,
          right: window.innerWidth,
        },
        sound: {
          enabled: false,
        },
      });

      fireworksRef.current.start();
    }

    return () => {
      if (fireworksRef.current) {
        fireworksRef.current.stop();
        fireworksRef.current = null;
      }
    };
  }, [show]);

  return (
    <>
      <div className="fireworks-container" ref={containerRef} />
      {show && <Confetti width={width} height={height} />}
      {show && (
        <div className="celebration-floating">
          {[...Array(20)].map((_, i) => (
            <div key={`b${i}`} className="balloon" />
          ))}
          {[...Array(15)].map((_, i) => (
            <div key={`h${i}`} className="heart" />
          ))}
        </div>
      )}
    </>
  );
}
