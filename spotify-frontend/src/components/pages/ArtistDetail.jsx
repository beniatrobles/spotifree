import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ArtistDetail()
{
    const { id } = useParams(); // 📌 Aquí recibimos la id desde la URL
    const [ artist, setArtist ] = useState( null );
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ] = useState( null );

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
                setError( 'Error al cargar el artista.' );
            } finally
            {
                setLoading( false );
            }
        };

        fetchArtist();
    }, [ id ] );

    if ( loading ) return <p>Cargando artista...</p>;
    if ( error ) return <p>{ error }</p>;

    return (
        <div
            className="fondoArtista"
            style={ { backgroundImage: `url(http://localhost:8000/${ artist.image })` } }
        >
            <h1>{ artist.name }</h1>
        </div>
    );
}
