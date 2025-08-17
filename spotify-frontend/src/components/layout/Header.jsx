import React from 'react';
import { Link } from 'react-router-dom'; // 👈 Importar Link
import '../../css/header.css';

export const Header = () => {
    return (
        <div className="header">
            <Link to="/">   {/* 👈 al pulsar el logo, te lleva a Inicio */}
                <img src="/spotify.png" alt="logo" className="logo" />
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
