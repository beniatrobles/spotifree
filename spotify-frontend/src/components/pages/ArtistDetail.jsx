import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../css/artistDetail.css";
import { usePlayer } from "../../context/PlayerContext";
import { useNavigate } from "react-router-dom";

export default function ArtistDetail()
{
    const { id } = useParams();
    const [ artist, setArtist ] = useState( null );
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ] = useState( null );

    const { playSong } = usePlayer(); // función para reproducir canción

    const navigate = useNavigate();

    useEffect( () =>
    {
        const fetchArtist = async () =>
        {
            try
            {
                const response = await axios.get( `http://localhost:8000/api/artist/${ id }` );
                setArtist( response.data );
            } catch ( err )
            {
                console.error( err );
                setError( "Error al cargar el artista." );
            } finally
            {
                setLoading( false );
            }
        };
        fetchArtist();
    }, [ id ] );

    if ( loading ) return <p className="loading">Cargando artista...</p>;
    if ( error ) return <p>{ error }</p>;

    return (
        <div>
            {/* Banner de fondo */ }
            <div
                className="fondoArtista"
                style={ { backgroundImage: `url(http://localhost:8000/${ artist.image })` } }
            >
                <h1 className="tituloArtista">{ artist.name }</h1>
            </div>

            {/* Canciones */ }
            <h3 className="subtitulo">Canciones Populares</h3>
            <ul className="lista-canciones">
                { artist.songs && artist.songs.length > 0 ? (
                    artist.songs.map( ( song, index ) => (
                        <li
                            key={ song.id }
                            className="cancion-item"
                            onClick={ () => playSong( song ) }
                        >
                            { index + 1 }. { song.title }
                        </li>
                    ) )
                ) : (
                    <p>No hay canciones</p>
                ) }
            </ul>
            <br /><br />
            <h3 className="subtitulo">Discografía</h3>
            <ul className="discografia-list">
                { artist.albums && artist.albums.length > 0 ? (
                    artist.albums.map( ( album ) => (
                        <li key={ album.id }ç
                        onClick={() => navigate(`/album/${album.id}`)}>
                            <img
                                src={ `http://localhost:8000/${ album.image }` }
                                alt={ album.title }
                                className="album-detail-img"
                                
                            />
                            <p>{ album.title }</p>
                        </li>
                    ) )
                ) : (
                    <p>No hay álbumes</p>
                ) }
            </ul>

        </div>
    );
}
