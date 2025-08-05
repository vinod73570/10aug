// src/components/LoveLetterPopup.js

import React from "react";
import "./LoveLetterPopup.css";

export default function LoveLetterPopup({ show, onClose }) {
  if (!show) return null;
  return (
    <div className="letter-overlay" onClick={onClose}>
      <div className="letter-box" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2 className="letter-title">A Letter For You</h2>
        <p className="letter-text">
          My dearest love,<br/><br/>
          From the moment we first met, you’ve brought light and laughter into my life.  
          Today, I celebrate you—your kindness, your beauty, and the magic of us.  
          May every wish you make today come true.<br/><br/>
          Forever yours,<br/>
          ❤️
        </p>
      </div>
    </div>
  );
}
