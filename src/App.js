// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
    <Router>
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
    </Router>
    </CelebrationContextProvider>
  );
}

export default App;
