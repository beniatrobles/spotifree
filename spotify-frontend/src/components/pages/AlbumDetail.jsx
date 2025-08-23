import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "../../css/albumDetail.css";
import { usePlayer } from "../../context/PlayerContext";

export default function AlbumDetail() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { playSong } = usePlayer();

  const location = useLocation();
  const highlightSongId = location.state?.highlightSongId || null;
  const [highlighted, setHighlighted] = useState(null);

  // Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    if (highlightSongId) {
      setHighlighted(highlightSongId);
      const timer = setTimeout(() => setHighlighted(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [highlightSongId]);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/albums/${id}`);
        setAlbum(res.data);
      } catch (err) {
        setError("Error al cargar el álbum");
        console.error(err);
      }
    };

    const fetchSongs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/albums/${id}/songs`
        );
        setSongs(res.data);
      } catch (err) {
        setError("Error al cargar las canciones del álbum");
        console.error(err);
      }
    };

    Promise.all([fetchAlbum(), fetchSongs()]).finally(() => setLoading(false));
  }, [id]);

  // Abrir modal y cargar playlists
  const handleAddToPlaylistClick = async (song) => {
    setSelectedSong(song);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/playlists", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserPlaylists(res.data.playlists || []);
      setShowAddModal(true);
    } catch (err) {
      console.error(err);
      alert("Error al cargar playlists");
    }
  };

  // Añadir canción a playlist seleccionada
  const addSongToPlaylist = async (playlistId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:8000/api/playlists/${playlistId}/add-song`,
        { song_id: selectedSong.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(
        `Canción añadida a ${
          userPlaylists.find((p) => p.id === playlistId).name
        }`
      );
      setShowAddModal(false);
      setSelectedSong(null);
    } catch (err) {
      console.error(err);
      alert("Error al añadir la canción");
    }
  };

  if (loading) return <p className="loading">Cargando álbum...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="album-detail">
      <div className="album-header">
        <img
          src={`http://localhost:8000/${album.image}`}
          alt={album.title}
          className="album-detail-img"
        />
        <div>
          <h2>{album.title}</h2>
          <p>{album.artist?.name}</p>
        </div>
      </div>

      <h3 className="subtitulo">Canciones</h3>
      <ul className="lista-canciones">
        {songs.map((song, index) => (
          <li key={song.id} className="cancion-item">
            <span onClick={() => playSong(song)}>
              {index + 1}. {song.title}
            </span>
            <button
              className="add-btn"
              onClick={() => handleAddToPlaylistClick(song)}
            >
              ➕
            </button>
          </li>
        ))}
      </ul>

      {/* Modal para seleccionar playlist */}
      {showAddModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h3>Selecciona la playlist</h3>
            {userPlaylists.length === 0 ? (
              <p>No tienes playlists aún.</p>
            ) : (
              userPlaylists.map((pl) => (
                <button
                  key={pl.id}
                  className="btnModalLogin"
                  onClick={() => addSongToPlaylist(pl.id)}
                >
                  {pl.name}
                </button>
              ))
            )}
            <button
              onClick={() => setShowAddModal(false)}
              className="btnModalClose"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
