import React, { useEffect, useState } from "react";
import "./SecretHearts.css";

/**
 * SecretHearts
 * - Presentational feelings panel split into sections
 * - Props:
 *    onClose?: () => void  // optional, called when user exits
 *
 * Behavior:
 * - Top-right × closes panel
 * - Footer 'Exit' button closes panel
 * - Esc also closes
 * - If onClose is not provided, the component will still hide itself
 */

const SECTIONS = [
  {
    id: "memories",
    title: "First Memories",
    content: `From the first morning light I noticed you, my world has been kinder. I remember how your smile turned ordinary mornings into tiny celebrations — the quiet way you listen, the little thoughtful things you do without a second thought.`,
  },
  {
    id: "why",
    title: "Why I Love You",
    content: `You taught me patience by being patient with me. You taught me how to laugh at myself and how to find warmth in small rituals: coffee cups at dawn, a shared coat on chilly walks, a song that becomes "our" song. When days are heavy, your presence is my calm. When days are bright, your laugh is my favorite light.`,
  },
  {
    id: "promises",
    title: "Promises",
    content: `I promise to keep learning, to show up when it matters, and to protect the small sacred spaces we create together. I promise to make room for your dreams and to hold your hand when the road bends. I will honor the ordinary days as much as the extraordinary ones.`,
  },
  {
    id: "rituals",
    title: "Little Rituals",
    content: `If forever is measured in slow mornings, in sloppy pancakes and shared blankets, in whispered secrets and honest apologies — then I would gladly count forever with you. Slow coffee at dawn, wandering streets with no destination, and laughing at jokes only we find funny.`,
  },
  {
    id: "closing",
    title: "Always",
    content: `Always and only yours,\n— With all my heart`,
  },
];

export default function SecretHearts({ onClose }) {
  const [active, setActive] = useState(SECTIONS[0].id);
  const [visible, setVisible] = useState(true);

  // Close helper: hides locally and call parent's onClose if provided
  const close = () => {
    setVisible(false);
    try {
      onClose?.();
    } catch (e) {
      // swallow
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  // keyboard control: Esc to close, arrows to navigate
  useEffect(() => {
    const onKey = (e) => {
      if (!visible) return;
      if (e.key === "Escape") {
        close();
      } else if (e.key === "ArrowRight") {
        const i = SECTIONS.findIndex((s) => s.id === active);
        setActive(SECTIONS[Math.min(SECTIONS.length - 1, i + 1)].id);
      } else if (e.key === "ArrowLeft") {
        const i = SECTIONS.findIndex((s) => s.id === active);
        setActive(SECTIONS[Math.max(0, i - 1)].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, visible]);

  if (!visible) return null;

  return (
    <div className="sh-root" role="dialog" aria-modal="true" aria-label="Secret feelings panel">
      <div className="sh-card">
        {/* top-right cross */}
        <button
          className="sh-close-btn"
          onClick={close}
          aria-label="Close secret hearts"
          title="Close"
        >
          ×
        </button>

        <header className="sh-header">
          <div>
            <h1 className="sh-title">Secret Hearts</h1>
            <p className="sh-sub">Some quiet things I want you to always know.</p>
          </div>
        </header>

        <nav className="sh-tabs" aria-label="Sections">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              className={`sh-tab ${s.id === active ? "active" : ""}`}
              onClick={() => setActive(s.id)}
              aria-pressed={s.id === active}
            >
              {s.title}
            </button>
          ))}
        </nav>

        <main className="sh-body" tabIndex={0}>
          {SECTIONS.map((s) => (
            <section
              key={s.id}
              className={`sh-section ${s.id === active ? "show" : "hide"}`}
              aria-hidden={s.id !== active}
            >
              <h2 className="sh-section-title">{s.title}</h2>
              <div className="sh-section-content">
                {s.content.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </main>

        <footer className="sh-footer">
          <div className="sh-footer-note">Use ← / → to navigate • Esc to close</div>
          <div>
            <button className="sh-exit-btn" onClick={close} aria-label="Exit">
              Exit
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
