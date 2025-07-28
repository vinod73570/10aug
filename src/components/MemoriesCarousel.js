import React, { useRef, useState, useEffect } from "react";
import "./MemoriesCarousel.css";

export default function MemoriesCarousel({ images = [] }) {
  const carouselRef = useRef(null);
  const [angle, setAngle] = useState(0);

  const cellSize = 300;
  const faceCount = images.length;
  const theta = 360 / faceCount;
  const radius = Math.round((cellSize / 2) / Math.tan(Math.PI / faceCount));

  // Auto‑rotate
  useEffect(() => {
    const id = setInterval(() => setAngle(a => a + theta), 3000);
    return () => clearInterval(id);
  }, [theta]);

  // Drag to rotate
  useEffect(() => {
    let startX, startAngle;
    const onMouseDown = e => {
      startX = e.clientX;
      startAngle = angle;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };
    const onMouseMove = e => setAngle(startAngle + (e.clientX - startX) / 2);
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    const el = carouselRef.current;
    el.addEventListener("mousedown", onMouseDown);
    return () => el.removeEventListener("mousedown", onMouseDown);
  }, [angle]);

  if (!images.length) return <p>No images to show.</p>;

  return (
    <div className="carousel-scene">
      {/* Glow orbs behind the carousel */}
      <div className="glow-orb orb1" />
      <div className="glow-orb orb2" />
      <div className="glow-orb orb3" />
    <div className="glow-orb orb4" />

      <div
        className="carousel"
        ref={carouselRef}
        style={{ transform: `translateZ(-${radius}px) rotateY(${angle}deg)` }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="carousel__cell"
            style={{
              transform: `rotateY(${i * theta}deg) translateZ(${radius}px)`
            }}
          >
            <img src={src} alt={`Memory ${i + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
