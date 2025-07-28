// src/components/BirthdayCake.js
import React from "react";
import "./BirthdayCake.css";

export default function BirthdayCake({ show }) {
  return (
    show && (
      <div className="cake-wrapper">
        <div className="cake">
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="candle">
            <div className="flame"></div>
          </div>
        </div>
      </div>
    )
  );
}
