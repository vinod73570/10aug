// src/components/FloatingHearts.js
import React, { useEffect, useState } from 'react';
import './FloatingHearts.css';

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Math.random().toString(36).substr(2, 9);
      const size = Math.random() * 20 + 20;
      const left = Math.random() * 100;
      setHearts(prev => [...prev, { id, size, left }]);

      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== id));
      }, 3000);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-hearts-container">
      {hearts.map(h => (
        <div
          key={h.id}
          className="heart"
          style={{
            left: `${h.left}%`,
            width: `${h.size}px`,
            height: `${h.size}px`
          }}
        />
      ))}
    </div>
  );
}
