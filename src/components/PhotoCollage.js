// src/components/PhotoCollage.js
import React from "react";
import "./PhotoCollage.css";  // you can add styles later

export default function PhotoCollage({ images = [] }) {
  return (
    <div className="photo-collage">
      {/* Placeholder: list image URLs */}
      {images.map((src, i) => (
        <img key={i} src={src} alt={`Memory ${i}`} className="photo-collage-img" />
      ))}
    </div>
  );
}
