// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom"; // ❌ No BrowserRouter here!

import Home from "./components/Home";
import Birthday from "./components/Birthday";
import Memories from "./components/Memories";
import Proposal from "./components/Proposal";
import CelebrationContextProvider from "./components/CelebrationContext";
import ThemeContainer from "./components/ThemeContainer";
import MusicCenter from "./components/MusicCenter";

function App() {
  return (
    <CelebrationContextProvider>
      <MusicCenter>
        <Routes>
          <Route path="/" element={<ThemeContainer />}>
            <Route index element={<Home />} />
            <Route path="birthday" element={<Birthday />} />
            <Route path="proposal" element={<Proposal />} />
            <Route path="memories" element={<Memories />} />
          </Route>
        </Routes>
      </MusicCenter>
    </CelebrationContextProvider>
  );
}

export default App;
