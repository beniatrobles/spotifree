import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../../css/header.css';

export const Header = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Intentar obtener usuario desde localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        // Limpiar sesión
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login'); // Redirigir al inicio
    };

    return (
        <div className="header">
            <Link to="/">
                <img src="/spotify.png" alt="logo" className="logo" title='Ir al inicio'/>
            </Link>

            <input 
              type="search" 
              placeholder="Buscar música, artista..." 
              className="searchInput" 
            />

            <div className='sesion'>
                {user ? (
                    <div className="userInfo">
                        <img 
                            src={`http://localhost:8000/storage/${user.image}`} 
                            alt={user.name} 
                            className="userImage" 
                        />
                        <span className="userName">{user.name}</span>
                        <button onClick={handleLogout} className='btnCerrarSesion'>
                            Cerrar Sesión
                        </button>
                    </div>
                ) : (
                    <>
                        <Link to="/register" className='btnRegistrarse'>Registrarse</Link>
                        <Link to="/login">
                            <button className='btnIniciarSesion'>Iniciar Sesión</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};
