// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom"; // ❌ No BrowserRouter here!

import Home from "./components/Home";
import Birthday from "./components/Birthday";
import Memories from "./components/Memories";
import ProposalPage from "./components/ProposalPage";
import CelebrationContextProvider from "./components/CelebrationContext";
import ThemeContainer from "./components/ThemeContainer";
import MusicCenter from "./components/MusicCenter";
import BirthdaySplash from "./components/BirthdaySplash"; 
import Gallery from './components/Gallery';

// Inside Routes

function App() {
  return (
    <CelebrationContextProvider>
      <MusicCenter>
        <Routes>
     
          <Route path="/" element={<ThemeContainer />}>
            <Route index element={<Home />} />
            <Route path="/birthday" element={<Birthday />} />
            <Route path="proposal" element={<ProposalPage />} />
            <Route path="memories" element={<Memories />} />
            <Route path="/splash" element={<BirthdaySplash />} />
            <Route path="/gallery" element={<Gallery />} />
            
          </Route>
        </Routes>
      </MusicCenter>
    </CelebrationContextProvider>
  );
}

export default App;


// 🔥 Next Phase: BirthdaySplash Advanced Effects
// #	Feature	Status	Description
// 1️⃣	Typewriter Love Message	⏳ Pending	Message appears immediately on page load before cake
// 2️⃣	Heartbeat Cake Animation	⏳ Pending	Cake pulses with a heartbeat animation before click
// 3️⃣	One-Time Giant Firework	⏳ Pending	Huge center firework fires once when candles go out
// 4️⃣	Love Letter Popup	⏳ Pending	Sweet letter appears after flame is blown
// 5️⃣	Particle Mouse Trail	⏳ Pending	Add magical particles following cursor (via react-tsparticles)
// 6️⃣	Unlock Surprise Button	⏳ Pending	Appears after flame-off: “Unlock the next surprise”
// 7️⃣	Animated Gradient Background	⏳ Pending	God-level animated background gradient behind everything
// 8️⃣	Konami Easter Egg	⏳ Pending	Hidden keyboard combo that triggers a surprise



// ChatGPT said:
// Absolutely—this “Starlit Proposal” is 100% doable. The only reason we haven’t jumped straight into it is because it sits at the intersection of several advanced pieces:

// 3D Starfield Setup

// We need to spin up a React Three Fiber scene, import or fetch a star catalog (e.g. NASA’s public data), and map real celestial coordinates onto our canvas.

// Custom Shaders & Particle Trails

// Drawing “glowing” constellation lines with particle effects means writing or adapting GLSL shaders, which takes a bit of setup and tuning.

// Memory-Orbs & Video Loop Integration

// Those interactive memory orbs require combining WebGL sprites with HTML-overlayed videos or images, and syncing hover states gracefully.

// Spatial Audio & Voiceover

// To get that immersive whisper-voiceover effect, we’d integrate Howler.js or the Web Audio API, load clips, and spatialize them across the 3D scene.

// Timing & Orchestration

// Coordinating all the timed reveals (0–5s sky, 5–12s memory stars, etc.) in a way that feels cinematic means using a robust animation controller (GSAP, React Spring).

// All together, it’s a nontrivial “mini-film in code.” That’s why we paused—so we could nail down the right architecture rather than bolt on a quick hack. But now that we have full clarity, we can start immediately:

// Step 1: Scaffold a React Three Fiber canvas and confirm star-catalog data format (1–2 hours)

// Step 2: Build the <StarOrb> component and get the first memory orb rendering (1–2 hours)

// Step 3: Layer in the particle-trail line animations for the constellation (2–3 hours)

// Step 4: Integrate voiceover and finalize timing orchestration (1–2 hours)

// Step 5: Polish the ring morph and final reveal (1–2 hours)

// Total rough estimate: 6–10 hours of focused work. If you’re ready, I’ll kick off Step 1 and share the starting code skeleton right now. Let me know, and we’ll light up that sky!













// ✨ “Starlit Proposal: Your Constellation of Us”
// 🎬 Overview
// When the page loads, you’re greeted with a vast, dark sky dotted with real stars (pulled from an astronomical API for your special date/location). Over 20 seconds, those stars gently shimmer and drift—then begin to connect, tracing a custom constellation that tells your story: first date, first trip, first “I love you” and finally arcs into the shape of a ring circling the words:

// “Will you marry me?”

// 🔑 Key Beats (0–20s)
// 0–5s | Night-Sky Canvas

// Fade in a WebGL sky using Three.js or React Three Fiber.

// Stars twinkle at real-world positions for your anniversary date & location (via NASA’s open star catalog).

// Gentle ambient piano begins.

// 5–12s | Memory Marker Rise

// Seed five special “memory stars” (slightly larger points) appear at specific coordinates.

// Each pulses and, on hover, shows a 2-second looping snapshot (photo/video) of that moment in a translucent orb.

// 12–17s | Constellation Weave

// Invisible lines draw themselves, connecting the memory stars in chronological order with a glowing, particle-trail effect.

// As each line completes, a whisper-soft voiceover pronounces that memory (“That afternoon in Paris…”).

// 17–20s | Ring & Question Reveal

// The final connection spins around to form a 3D ring orbiting the camera.

// The ring slows and “opens” like a sunrise halo, revealing in its center glowing script:
// “Will you marry me?”

// A subtle burst of star-dust particles showers the scene, and two buttons (“Yes ❤️” / “Forever 💍”) fade in beneath.

// 💻 Tech & Components
// React Three Fiber for the 3D sky and starfield

// Three.js Shaders for particle trails when drawing constellation lines

// Astro API (or local star catalog JSON) for authentic star positions

// Howler.js for spatialized audio cues & voiceover

// React Spring / GSAP for smooth timing control

// Custom <StarOrb> component to hover-reveal memories

// <ConstellationLines> component that animates line drawing

// <RingReveal> to morph lines into the final ring

// 🎯 Why It’s God-Level
// Deeply Personal: Uses your dates and locations to plot real stars.

// Emotional Arc: Nostalgia (memories) → discovery (lines) → commitment (ring).

// Cinematic: Full 3D immersion, voiceover, particle effects, and spatial audio.

// Interactive Easter Egg: Visitors can hover any memory star to relive that moment before the big ask.

// Shall I draft the initial component skeleton (with comments) for “Starlit Proposal”, or would you like adjustments first?