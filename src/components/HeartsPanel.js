// src/components/HeartsPanel.js
import React, { useState } from "react";
// import "./HeartsPanel.css"; // optional: small CSS file if you'd like

/**
 * HeartsPanel
 * - Simple, editable sections where you can write your heart-feelings.
 * - This component is shown after the password is accepted.
 */
export default function HeartsPanel({ onClose }) {
  const [sections, setSections] = useState([
    { title: "To My Love", body: "Write your feelings here..." },
    { title: "Memories", body: "Share special memories..." },
    { title: "Promises", body: "Promises for the future..." },
  ]);

  const updateSection = (idx, field, value) => {
    const copy = sections.slice();
    copy[idx] = { ...copy[idx], [field]: value };
    setSections(copy);
  };

  return (
    <div className="hearts-panel" role="dialog" aria-modal="true">
      <div className="hearts-message">
        <h2>Your Secret Notes</h2>
        <p>Write whatever you want — these are private to you.</p>
      </div>

      <div style={{ padding: 12 }}>
        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <input
              aria-label={`section-title-${i}`}
              value={s.title}
              onChange={(e) => updateSection(i, "title", e.target.value)}
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 8,
                marginBottom: 6,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.02)",
                color: "#fff",
              }}
            />
            <textarea
              aria-label={`section-body-${i}`}
              value={s.body}
              onChange={(e) => updateSection(i, "body", e.target.value)}
              rows={4}
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
                color: "#fff",
              }}
            />
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button className="ring-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
