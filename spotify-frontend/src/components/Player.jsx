import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import '../css/player.css';

const formatTime = (s) => {
  if (!s && s !== 0) return '0:00';
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${ss}`;
};

export default function Player() {
  const { currentSong, isPlaying, progress, duration, togglePlay, seek, volume, setVolume } = usePlayer();

  if (!currentSong) return null;

  return (
    <div className="player">
      {/* Info */}
      <div className="player-info">
        <img
          src={`http://localhost:8000/${currentSong.album?.image}`}
          alt={currentSong.title}
        />
        <div className="player-meta">
          <p className="player-title">{currentSong.title}</p>
          <p className="player-sub">{currentSong.artist?.name}</p>
        </div>
      </div>

      {/* Controles */}
      <div className="player-center">
        <button className="player-btn" onClick={togglePlay}>
          {isPlaying ? '⏸' : '▶️'}
        </button>

        <div className="player-progress">
          <span className="time">{formatTime(progress)}</span>
          <input
            type="range"
            min={0}
            max={Math.floor(duration || 0)}
            value={Math.floor(progress || 0)}
            onChange={(e) => seek(Number(e.target.value))}
          />
          <span className="time">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volumen */}
      <div className="player-right">
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          aria-label="Volumen"
        />
      </div>
    </div>
  );
}
