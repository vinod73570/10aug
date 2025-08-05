import React, { useState, useEffect } from 'react';
import { Line } from '@react-three/drei';

/**
 * ConstellationLines:
 * - Animates lines connecting memory stars
 * - Calls `onComplete` when all lines are drawn
 */
export default function ConstellationLines({ points = [], active = false, onComplete }) {
  const [showLines, setShowLines] = useState([]);

  useEffect(() => {
    if (!active || points.length < 2) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i < points.length - 1) {
        setShowLines(prev => [...prev, [points[i], points[i + 1]]]);
        i++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete(); // ✅ trigger ring reveal
      }
    }, 2000); // delay between each line

    return () => clearInterval(interval);
  }, [active, points, onComplete]);

  return (
    <>
      {showLines.map((linePoints, index) => (
        <Line
          key={index}
          points={linePoints}
          color="#00ffff"
          lineWidth={1.5}
          transparent
          opacity={0.95}
        />
      ))}
    </>
  );
}
