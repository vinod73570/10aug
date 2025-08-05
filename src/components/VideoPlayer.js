// src/components/VideoPlayer.js
import React, { useState, useContext } from "react";
import "./VideoPlayer.css";
import { MusicContext } from "./MusicCenter";

// Rename this so it doesn’t shadow the prop
const defaultVideos = [
  {
    id: 1,
    title: "First Date 🌸",
    date: "2021-06-15",
    src: "/videos/moment1.mp4",
    thumb: "/videos/thumb1.jpg",
    description:
      "Our very first dinner at that little Italian place by the river.",
  },
  {
    id: 2,
    title: "Surprise Montage 🎥",
    date: "2022-08-10",
    src: "/videos/moment1.mp4",
    thumb: "/videos/thumb1.jpg",
    description: "A sweet birthday surprise for you 💝",
  },
  {
    id: 3,
    title: "New Year Vlog ✨",
    date: "2023-01-01",
    src: "/videos/moment1.mp4",
    thumb: "/videos/thumb1.jpg",
    description: "Starting the year with love and laughter!",
  },
];

export default function VideoPlayer({ videos = defaultVideos, compact = false }) {
  const [activeIdx, setActiveIdx] = useState(compact ? 0 : null);
  const { pauseMusic, playMusic } = useContext(MusicContext);

  const handleClose = () => {
    setActiveIdx(null);
    playMusic();
  };

  return (
    <div className="vp-wrapper">
      <h2 className="vp-heading">📺 Video Memories</h2>

      {activeIdx !== null && videos[activeIdx] && (
        <div className="vp-player">
          <button className="vp-close" onClick={handleClose}>
            ❌
          </button>

          <video
            src={videos[activeIdx].src}
            controls
            className="vp-video"
            onPlay={pauseMusic}
            onPause={playMusic}
            onEnded={playMusic}
            autoPlay
          >
            Your browser does not support the video tag.
          </video>

          <h3 className="vp-title">{videos[activeIdx].title}</h3>
          <small className="vp-date">
            {new Date(videos[activeIdx].date).toLocaleDateString()}
          </small>
          <p className="vp-desc">{videos[activeIdx].description}</p>
        </div>
      )}

      <div className="vp-grid">
        {videos.map((v, idx) => (
          <div
            key={v.id}
            className="vp-card"
            onClick={() => {
              setActiveIdx(idx);
              pauseMusic();
            }}
          >
            <img src={v.thumb} alt={v.title} className="vp-thumb" />
            <div className="vp-info">
              <h4 className="vp-card-title">{v.title}</h4>
              <small className="vp-card-date">
                {new Date(v.date).toLocaleDateString()}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
