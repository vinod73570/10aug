


// src/components/MusicCenter.js
import React, { createContext, useRef, useEffect, useState } from "react";

export const MusicContext = createContext();

const playlist = [
  // { src: "/music/romantic1.mp3" },
  { src: "/music/romantic2.mp3" },
  { src: "/music/romantic3.mp3" },
  { src: "/music/romantic4.mp3" },
  { src: "/music/romantic5.mp3" },
  { src: "/music/romantic6.mp3" },
  { src: "/music/romantic7.mp3" },
];


export default function MusicCenter({ children }) {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(new Audio(playlist[0].src));

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(playlist[currentTrack].src);
    audioRef.current.loop = false;
    audioRef.current.muted = isMuted;

    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    }

    audioRef.current.onended = () => {
      setCurrentTrack((prev) => (prev + 1) % playlist.length);
    };
  }, [currentTrack]);

  useEffect(() => {
    isPlaying ? audioRef.current.play().catch(() => {}) : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.muted = isMuted;
  }, [isMuted]);

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        togglePlay: () => setIsPlaying((p) => !p),
        nextTrack: () => setCurrentTrack((i) => (i + 1) % playlist.length),
        toggleMute: () => setIsMuted((m) => !m),
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}
