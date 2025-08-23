import React from 'react';
import { Link } from 'react-router-dom'; 
import '../../css/header.css';

export const Header = () => {
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
                <a href="" className='btnRegistrarse'>Registrarse</a>
                <button className='btnIniciarSesion'>Iniciar Sesion</button>
            </div>
        </div>
    )
}
