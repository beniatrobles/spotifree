import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/inicio.css';

export default function Inicio() {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/artists');
        setArtists(response.data);
      } catch (err) {
        setError('Error al cargar los artistas.');
        console.error(err);
      }
    };

    const fetchAlbums = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/albums');
        setAlbums(response.data);
      } catch (err) {
        setError('Error al cargar los álbumes.');
        console.error(err);
      }
    };

    const fetchSongs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/songs');
        setSongs(response.data);
      } catch (err) {
        setError('Error al cargar las canciones.');
        console.error(err);
      }
    };

    Promise.all([fetchArtists(), fetchAlbums(), fetchSongs()])
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="loading">Cargando datos...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="inicio">
      {/* ARTISTAS */}
      <h2 className="subtitulo">Artistas del mes</h2>
      <div className="lista-artistas">
        {artists.map((artist) => (
          <div key={artist.id} className="artista-card">
            <img
              src={`http://localhost:8000/${artist.image}`}
              alt={artist.name}
              className="artista-imagen"
            />
            <p className="artista-nombre">{artist.name}</p>
          </div>
        ))}
      </div>

      <br /><br />

      {/* ÁLBUMES */}
      <h2 className="subtitulo">Álbumes del mes</h2>
      <div className="lista-albumes">
        {albums.map((album) => (
          <div key={album.id} className="album-card">
            <img
              src={`http://localhost:8000/${album.image}`}
              alt={album.title}
              className="album-imagen"
            />
            <p className="album-nombre">{album.title}</p>
          </div>
        ))}
      </div>

      <br /><br />

      {/* CANCIONES */}
      <h2 className="subtitulo">Canciones en tendencia</h2>
      <div className="lista-songs">
        {songs.map((song) => (
          <div key={song.id} className="song-card">
            <img
              src={`http://localhost:8000/${song.album?.image}`}
              alt={song.title}
              className="song-imagen"
            />
            <div className="song-info">
              <p className="song-title">{song.title}</p>
              <p className="song-sub">
                {song.artist?.name} • {song.album?.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
