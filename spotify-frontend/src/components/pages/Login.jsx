import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../css/auth.css'; // Importa tu CSS personalizado

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                // Guardar token y usuario en localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                // Redirigir al home
                navigate('/');
            } else {
                setError(data.message || 'Error al iniciar sesión');
            }
        } catch (err) {
            setError('Error de conexión con el servidor');
        }
    };

    return (
        <div className="auth-container">
            <h2>Iniciar Sesión</h2>

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Entrar</button>
            </form>

            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

            <div className="links">
                <p>
                    ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
                </p>
            </div>

            <button 
        onClick={() => navigate('/')} 
        style={{
          marginTop: '15px',
          padding: '10px 20px',
          backgroundColor: '#1db954',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'background-color 0.3s'
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = '#1ed760'}
        onMouseOut={e => e.currentTarget.style.backgroundColor = '#1db954'}
      >
        Volver al inicio
      </button>
        </div>
    );
};

export default Login;
