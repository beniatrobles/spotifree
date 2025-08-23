// src/pages/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../css/auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(null); // Para mostrar preview de la imagen

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("La imagen es obligatoria");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('password_confirmation', passwordConfirm);
      formData.append('image', image);

      const res = await axios.post('http://localhost:8000/api/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setMessage('Registro exitoso!');
      navigate('/'); // redirige al inicio
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error al registrar');
    }
  };

  return (
    <div className="auth-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nombre" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Confirmar Contraseña" 
          value={passwordConfirm} 
          onChange={e => setPasswordConfirm(e.target.value)} 
          required 
        />
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
        />
        {preview && (
          <div style={{ margin: '10px 0' }}>
            <img src={preview} alt="Preview" style={{ width: '100px', borderRadius: '8px' }} />
          </div>
        )}
        <button type="submit">Registrarse</button>
      </form>
      {message && <p style={{ marginTop: '10px' }}>{message}</p>}

      {/* Botón para volver al inicio */}
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
}
