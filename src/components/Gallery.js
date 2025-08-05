import React, { useState } from 'react';
import galleryFolders from '../components/galleryFolders';
import './Gallery.css';

export default function Gallery() {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [unlocked, setUnlocked] = useState({});
  const [password, setPassword] = useState('');

  const handleFolderClick = (folder) => {
    setPassword('');
    setSelectedFolder(folder);
  };

  const handleUnlock = () => {
    if (selectedFolder.password === password) {
      setUnlocked(prev => ({ ...prev, [selectedFolder.name]: true }));
      setPassword('');
    } else {
      alert('❌ Wrong password!');
    }
  };

  const handleBack = () => setSelectedFolder(null);

  const isLocked = selectedFolder?.type === 'private' && !unlocked[selectedFolder.name];

  return (
    <div className="gallery-container">
      {/* ─── Sidebar / Folder List ─── */}
      <aside className="sidebar" aria-label="Folders">
        <h2>📁 Folders</h2>
        <div className="folder-list">
          {galleryFolders.map((f, i) => (
            <button
              key={i}
              className={`folder-btn ${selectedFolder?.name === f.name ? 'active' : ''}`}
              onClick={() => handleFolderClick(f)}
            >
              {f.name} {f.type === 'private' && '🔒'}
            </button>
          ))}
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <main className="gallery-main">
        {!selectedFolder ? (
          <p className="placeholder-text">📂 Select a folder to view its media</p>

        ) : isLocked ? (
          <div className="password-box">
            <button className="back-btn" onClick={handleBack}>← Back to folders</button>
            <p>This folder is private. Enter password to unlock:</p>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              aria-label="Password"
            />
            <button onClick={handleUnlock}>Unlock</button>
          </div>

        ) : (
          <>
            <div className="media-header">
              <button className="back-btn" onClick={handleBack}>← Back</button>
              <h3>{selectedFolder.name}</h3>
            </div>
            <div className="media-grid">
              {selectedFolder.media.map((item, idx) =>
                item.type === 'image' ? (
                  <img
                    key={idx}
                    src={item.src}
                    alt={item.alt || `Photo ${idx+1}`}
                    loading="lazy"
                  />
                ) : (
                  <video key={idx} controls preload="metadata">
                    <source src={item.src} type="video/mp4" />
                    Your browser does not support HTML5 video.
                  </video>
                )
              )}
            </div>
          </>
        )}
      </main>
    </div>
);
}
