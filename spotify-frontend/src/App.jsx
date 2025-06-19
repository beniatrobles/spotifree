import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App()
{
  const [ artists, setArtists ] = useState( [] );

  useEffect( () =>
  {
    fetchArtists()
  }, [] );

  const fetchArtists = async () =>
  {
    const response = await axios.get( "http://localhost:8000/api/artists" );
    setArtists( response.data )
  }

  return (
    <div>
      <ul>
        { artists.map( ( artist ) => (
          <li key={ artist.id }>
            <p>{ artist.name }</p>
            <img
              src={ `http://localhost:8000/${ artist.image }` }
              alt={ artist.name }
              width="150"
            />
          </li>
        ) ) }
      </ul>
    </div>
  )
}

export default App
