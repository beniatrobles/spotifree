import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/sidebar.css';

export const Sidebar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [user, setUser] = useState(null);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistImage, setPlaylistImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchPlaylists();
    }
  }, []);

  const fetchPlaylists = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8000/api/playlists', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPlaylists(res.data.playlists || []);
    } catch (err) {
      console.error('Error al cargar playlists', err);
    }
  };

  const handleRestrictedAction = () => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      setShowCreateModal(true);
    }
  };

  const handleGoToLogin = () => {
    setShowLoginModal(false);
    navigate('/login');
  };

  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setPlaylistName('');
    setPlaylistImage(null);
    setPreview(null);
    setError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPlaylistImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if (!playlistName) {
      setError('El nombre es obligatorio');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', playlistName);
      if (playlistImage) formData.append('image', playlistImage);

      const token = localStorage.getItem('token');

      const res = await axios.post('http://localhost:8000/api/playlists', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Playlist creada:', res.data.playlist);
      handleCloseCreateModal();
      fetchPlaylists(); // Recargar playlists
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear playlist');
    }
  };

  return (
    <div className='sidebar'>
      <div className='anadirBiblioteca'>
        <h2>Tu biblioteca</h2>
        <button className='btnAnadir' onClick={handleRestrictedAction}>
          <img src="/sumar.png" alt="Añadir" className='iconoAnadir' />
        </button>
      </div>

      {/* Playlists */}
      {user && playlists.length > 0 ? (
        <div className='playlistContainer'>
          {playlists.map((pl) => (
            <div key={pl.id} className='playlistItem'>
              <img
                src={pl.image ? `http://localhost:8000/storage/${pl.image}` : '/default_playlist.png'}
                alt={pl.name}
                className='playlistImg'
              />
              <span>{pl.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className='crearLista'>
          <h2>Crea tu primera lista</h2>
          <p>Es muy fácil, y te echaremos una mano</p>
          <button className='btnCrearLista' onClick={handleRestrictedAction}>
            Crear lista
          </button>
        </div>
      )}

      <div className='enlacesFooter'>
        <a href="#">Legal</a>
        <a href="#">Centro de Privacidad</a>
        <a href="#">Política de Privacidad</a>
        <a href="#">Cookies</a>
        <a href="#">Sobre los anuncios</a>
      </div>

      {/* Modal de login */}
      {showLoginModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h3>Inicia sesión</h3>
            <p>Debes iniciar sesión para realizar esta acción.</p>
            <div className="modalButtons">
              <button onClick={handleGoToLogin} className="btnModalLogin">Iniciar Sesion</button>
              <button onClick={handleCloseLoginModal} className="btnModalClose">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de crear playlist */}
      {showCreateModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h3>Crear Playlist</h3>
            <form onSubmit={handleCreatePlaylist}>
              <input
                type="text"
                placeholder="Nombre de la playlist"
                value={playlistName}
                onChange={e => setPlaylistName(e.target.value)}
              />
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {preview && <img src={preview} alt="Preview" />}
              <div className="modalButtons">
                <button type="submit" className="btnModalLogin">Crear</button>
                <button type="button" onClick={handleCloseCreateModal} className="btnModalClose">Cancelar</button>
              </div>
            </form>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};
