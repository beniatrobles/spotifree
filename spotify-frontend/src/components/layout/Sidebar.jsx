import React from 'react'
import '../../css/sidebar.css';

export const Sidebar = () =>
{
    return (
        <div className='sidebar'>
            <div className='anadirBiblioteca'>
                <h2>Tu biblioteca</h2>
                <button className='btnAnadir'>
                    <img src="/sumar.png" alt="Añadir" className='iconoAnadir' />
                </button>
            </div>
            <div className='crearLista'>
                <h2>Crea tu primera lista</h2>
                <p>Es muy facil, y te echaremos una mano</p>
                <button className='btnCrearLista'>Crear lista</button>
            </div>
            <div className='enlacesFooter'>
                <a href="#">Legal</a>
                <a href="#">Centro de Privacidad</a>
                <a href="#">Política de Privacidad</a>
                <a href="#">Cookies</a>
                <a href="#">Sobre los anuncios</a>
            </div>
        </div>

    )
}

