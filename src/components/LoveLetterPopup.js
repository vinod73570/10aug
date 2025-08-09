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
          meri pyari si baby 😘,<br/><br/>
          itti mehnat to mene kabhi jindgi me nhi kii jitti tere iss birthday ke lia kiaa hu me . 
          baby aapki kasam bahut bahut jada mehnet kii h mene me jo krr sakta thaa kia mene aapke lia and aapke lia ek surprice ready kiaa h 
          button aa rha hoga uspe cick kroo whaa " surprice montage " prr click kroo aapka surprice ready h .
          aapke iss birthday ke liaa to mene sbb chor dia moj masti 🥺 mere sare bhai or bethe h hassi majak chal rha h injoy but tera baby tere lia mehnat kr rha h yhaa
            so baby ,  i really really love you meri jaan ho aap 😘 orr meri iss jaan ko meri taraf se pyara sa 
            <b> "😘😘😘😘😘 HAPPY BIRTHDAY BABY 😘😘😘😘"</b> <br/><br/>
          Forever yours,<br/>
          ❤️
        </p>
      </div>
    </div>
  );
}
