import React, { useEffect, useState } from 'react';
import axios from 'axios';
import  '../../css/inicio.css';  

export default function Inicio() {
  const [artists, setArtists] = useState([]);
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
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  if (loading) return <p className="loading">Cargando artistas...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="inicio">
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
    </div>
  );
}
