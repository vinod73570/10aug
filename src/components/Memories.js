import React from "react";
import MemoriesCarousel from "./MemoriesCarousel";
import "./Memories.css";
import VideoPlayer from "./VideoPlayer";


const imageList = [
  "https://res.cloudinary.com/dr4ompqm4/image/upload/v1754714679/3DImage2_yljl5z.jpg",
   "https://res.cloudinary.com/dr4ompqm4/image/upload/v1754714679/3DImage8_rruh7d.jpg",
    "https://res.cloudinary.com/dr4ompqm4/image/upload/v1754714679/3DImage7_vbcjgi.jpg",
     "https://res.cloudinary.com/dr4ompqm4/image/upload/v1754714679/3DImage1_xhival.jpg",
      "https://res.cloudinary.com/dr4ompqm4/image/upload/v1754714679/3DImage4_m0ce36.jpg",
       "https://res.cloudinary.com/dr4ompqm4/image/upload/v1754714679/3DImage6_rnul5c.jpg",
        "https://res.cloudinary.com/dr4ompqm4/image/upload/v1754714679/3DImage5_klyyzk.jpg",
    "https://res.cloudinary.com/dr4ompqm4/image/upload/v1754714679/3DImage3_lvup36.jpg",






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
