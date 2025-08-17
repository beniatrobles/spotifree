import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../css/albumDetail.css";
import { usePlayer } from "../../context/PlayerContext"; // 👈 Importa el contexto

export default function AlbumDetail() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { playSong } = usePlayer(); // 👈 Función para reproducir

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
          <li
            key={song.id}
            className="cancion-item"
            onClick={() => playSong(song)} // 👈 Reproducir canción al hacer click
          >
            {index + 1}. {song.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
