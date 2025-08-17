import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../../css/inicio.css';

export default function Inicio()
{
  const [ artists, setArtists ] = useState( [] );
  const [ albums, setAlbums ] = useState( [] );
  const [ songs, setSongs ] = useState( [] );
  const [ loading, setLoading ] = useState( true );
  const [ error, setError ] = useState( null );

  const navigate = useNavigate();

  useEffect( () =>
  {
    const fetchArtists = async () =>
    {
      try
      {
        const response = await axios.get( 'http://localhost:8000/api/artists' );
        setArtists( response.data );
      } catch ( err )
      {
        setError( 'Error al cargar los artistas.' );
        console.error( err );
      }
    };

    const fetchAlbums = async () =>
    {
      try
      {
        const response = await axios.get( 'http://localhost:8000/api/albums' );
        setAlbums( response.data );
      } catch ( err )
      {
        setError( 'Error al cargar los álbumes.' );
        console.error( err );
      }
    };

    const fetchSongs = async () =>
    {
      try
      {
        const response = await axios.get( 'http://localhost:8000/api/songs' );
        setSongs( response.data );
      } catch ( err )
      {
        setError( 'Error al cargar las canciones.' );
        console.error( err );
      }
    };

    Promise.all( [ fetchArtists(), fetchAlbums(), fetchSongs() ] )
      .finally( () => setLoading( false ) );
  }, [] );

  if ( loading ) return <p className="loading">Cargando datos...</p>;
  if ( error ) return <p className="error">{ error }</p>;

  return (
    <div className="inicio">
      {/* ARTISTAS */ }
      <h2 className="subtitulo">Artistas del mes</h2>
      <div className="lista-artistas">
        { artists.map( ( artist ) => (
          <div key={ artist.id } className="artista-card">
            <img
              src={ `http://localhost:8000/${ artist.image }` }
              alt={ artist.name }
              className="artista-imagen"
            />
            <p className="artista-nombre">{ artist.name }</p>
          </div>
        ) ) }
      </div>

      <br /><br />

      {/* ÁLBUMES */ }
      <h2 className="subtitulo">Álbumes del mes</h2>
      <div className="lista-albumes">
        { albums.map( ( album ) => (
          <div
            key={ album.id }
            className="album-card"
            onClick={ () => navigate( `/album/${ album.id }` ) }
          >
            <img
              src={ `http://localhost:8000/${ album.image }` }
              alt={ album.title }
              className="album-imagen"
            />
            <p className="album-nombre">{ album.title }</p>
          </div>
        ) ) }
      </div>

      <br /><br />

      {/* CANCIONES */ }
      <h2 className="subtitulo">Canciones en tendencia</h2>
      <div className="lista-songs">
        { songs.map( ( song ) => (
          <div
            key={ song.id }
            className="song-card"
            onClick={ () => navigate( `/album/${ song.album.id }`, { state: { highlightSongId: song.id } } ) }
          >
            <img
              src={ `http://localhost:8000/${ song.album?.image }` }
              alt={ song.title }
              className="song-imagen"
            />
            <div className="song-info">
              <p className="song-title">{ song.title }</p>
              <p className="song-sub">
                { song.artist?.name } • { song.album?.title }
              </p>
            </div>
          </div>
        ) ) }
      </div>
      {/* Línea separadora */ }
      <hr className="footer-line" />
      <footer className="footer">
        <div className="footer-contenedor">
          {/* Columna Empresa */ }
          <div className="footer-col">
            <h4>Empresa</h4>
            <ul>
              <li>Acerca de</li>
              <li>Empleo</li>
              <li>For the Record</li>
            </ul>
          </div>

          {/* Columna Comunidades */ }
          <div className="footer-col">
            <h4>Comunidades</h4>
            <ul>
              <li>Para artistas</li>
              <li>Desarrolladores</li>
              <li>Publicidad</li>
              <li>Inversores</li>
              <li>Proveedores</li>
            </ul>
          </div>

          {/* Columna Enlaces útiles */ }
          <div className="footer-col">
            <h4>Enlaces útiles</h4>
            <ul>
              <li>Asistencia</li>
              <li>App gratis para móvil</li>
              <li>Popular por país</li>
            </ul>
          </div>

          {/* Columna Planes */ }
          <div className="footer-col">
            <h4>Planes de Spotify</h4>
            <ul>
              <li>Premium Individual</li>
              <li>Premium Duo</li>
              <li>Premium Familiar</li>
              <li>Premium para Estudiantes</li>
              <li>Spotify Free</li>
            </ul>
          </div>
        </div>

        {/* Línea separadora */ }
        <hr className="footer-line" />

        {/* Copyright */ }
        <div className="footer-bottom">
          <p>© 2025 Spotify AB</p>
        </div>
      </footer>
    </div>
  );
}
