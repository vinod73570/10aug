// src/components/TypewriterMessage.js
import React, { useState, useEffect } from "react";
import "./TypewriterMessage.css";

export default function TypewriterMessage({ text = "", speed = 50, onFinish }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(interval);
        onFinish?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onFinish]);

  return <p className="typewriter-message">{displayed}</p>;
}
