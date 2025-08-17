import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);     // segundos transcurridos
  const [duration, setDuration] = useState(0);     // duración en segundos
  const [volume, setVolume] = useState(0.8);

  // Eventos del <audio>
  useEffect(() => {
    const audio = audioRef.current;
    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    audio.volume = volume;

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  // Control de volumen reactivo
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const playSong = (song) => {
    const audio = audioRef.current;

    // Si es otra canción, cambiamos la src
    if (!currentSong || currentSong.id !== song.id) {
      audio.src = `http://localhost:8000/${song.audio_path}`;
      setCurrentSong(song);
      setProgress(0);
    }

    audio.play().then(() => {
      setIsPlaying(true);
    }).catch((e) => {
      console.warn('El navegador bloqueó la reproducción automática:', e);
    });
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!currentSong) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true));
    }
  };

  const seek = (seconds) => {
    const audio = audioRef.current;
    audio.currentTime = seconds;
    setProgress(seconds);
  };

  return (
    <PlayerContext.Provider value={{
      currentSong,
      isPlaying,
      progress,
      duration,
      volume,
      setVolume,
      playSong,
      togglePlay,
      seek,
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
