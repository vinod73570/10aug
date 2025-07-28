// src/components/CountdownTimer.js
import React, { useEffect, useState, useContext, useRef } from "react";
import { CelebrationContext } from "./CelebrationContext";
import { MusicContext } from "./MusicCenter"; // ✅ import MusicContext
import "./CountdownTimer.css";

const CountdownTimer = () => {
  // const targetDateRef = useRef(new Date("2025-08-10T00:00:00")); // 🎂 Set your real date
  const targetDateRef = useRef(new Date(Date.now() + 1000)); 

  const { setShowFireworks } = useContext(CelebrationContext);
  const { playBirthdayNow } = useContext(MusicContext); // ✅ Use inside component

  const [now, setNow] = useState(new Date());
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const diff = targetDateRef.current.getTime() - now.getTime();

useEffect(() => {
  if (diff <= 0 && !isBirthday) {
    setIsBirthday(true);
    setShowFireworks(true); // 🔥 this triggers fireworks
    playBirthdayNow?.();    // optional: plays birthday sound
  }
}, [diff, isBirthday, setShowFireworks, playBirthdayNow]);


  const getTime = (ms) => {
    const total = Math.max(ms, 0);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / (1000 * 60)) % 60);
    const seconds = Math.floor((total / 1000) % 60);
    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = getTime(diff);

  return (
    <div className="countdown-container">
      {isBirthday ? (
        <div className="birthday-message">
          🎉 Happy Birthday My Love! 💖 Let the celebration begin! 🎆
        </div>
      ) : (
        <div className="countdown-box">
          <h2 className="countdown-heading">Countdown to Your Special Day 🎂</h2>
          <div className="timer">
            <div className="time-segment"><span>{days}</span><label>Days</label></div>
            <div className="time-segment"><span>{hours}</span><label>Hours</label></div>
            <div className="time-segment"><span>{minutes}</span><label>Mins</label></div>
            <div className="time-segment"><span>{seconds}</span><label>Secs</label></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
