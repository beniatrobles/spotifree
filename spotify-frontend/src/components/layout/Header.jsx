import React from 'react'
import '../../css/header.css';

export const Header = () => {
    return (
        <div className="header">
            <img src="/spotify.png" alt="logo" className="logo" />
            
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
