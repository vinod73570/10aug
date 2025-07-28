import React from "react";
import MemoriesCarousel from "./MemoriesCarousel";
import "./Memories.css";
import VideoPlayer from "./VideoPlayer";


const imageList = [
  "/3DImage1.jpg",
  "/3DImage2.jpg",
  "/3DImage3.jpg",
  "/3DImage4.jpg",
  "/3DImage5.jpg",
  "/3DImage6.jpg",
  "/3DImage7.jpg",
  "/3DImage8.jpg"
];

export default function Memories() {
  return (
    <div className="memories-container">
      <h2 className="memories-heading">📸 Our Memories</h2>
      <p className="memories-intro">
        Swipe or drag to rotate our 3D memory carousel…
      </p>

      {/* 💞 3D Carousel */}
      <MemoriesCarousel  images={imageList} />

      {/* 🎥 Simple Video Player */}
    <div >
  <div>
  <VideoPlayer className="videoplayer" />

  {/* 💌 Romantic Text Box */}
  <div className="memories-note">
    <h3>💌 From My Heart to Yours</h3>
    <p>
      Every memory we’ve created is a piece of our beautiful journey.  
      I’ve collected them here not just to look back, but to remind you:  
      you are cherished, adored, and deeply loved — always. 💖
    </p>
  </div>
</div>


      </div>
    </div>
  );
}
