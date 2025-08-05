// src/components/SurpriseModal.js
import React, { useEffect, useRef } from "react";
import VideoPlayer from "./VideoPlayer";
import "./SurpriseModal.css";

export default function SurpriseModal({ show, onClose }) {
  const audioRef = useRef(null);

  // When modal opens, play the voice memo
  useEffect(() => {
    if (show && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, [show]);

  if (!show) return null;
  return (
    <div className="surprise-overlay" onClick={onClose}>
      <div className="surprise-box" onClick={e => e.stopPropagation()}>
        <button className="surprise-close" onClick={onClose}>✕</button>

        <h2 className="surprise-title">Your Birthday Surprise 🎁</h2>

        {/* VideoPlayer reused but showing only the montage */}
        <VideoPlayer
          videos={[
            {
              id: 2,
              title: "Surprise Montage 🎥",
              date: "2022-08-10",
              src: "https://res.cloudinary.com/dr4ompqm4/video/upload/Bthg1519_osr7hb.mp4",     // Make sure this is your montage file
              thumb: "/videos/thumb2.jpg",
              description: "A sweet birthday surprise for you 💝",
            }
          ]}
        />

        {/* Voice memo */}
        <audio
          ref={audioRef}
          src="/music/voice-memo.mp3"       /* <-- your audio file path */
          controls
          className="surprise-audio"
        >
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}
