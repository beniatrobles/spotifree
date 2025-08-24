# 🎵 Spotifree

Spotifree es un clon de Spotify hecho con **Laravel (Backend)** y **React (Frontend)**.  
Permite gestionar usuarios, playlists, canciones y mucho más. 🚀  

---

## 📂 Tecnologías usadas
- **Backend:** Laravel 10, PHP 8, PostgreSQL
- **Frontend:** React, Vite, Axios, TailwindCSS
- **Autenticación:** Laravel Sanctum
- **ORM:** Eloquent
- **API:** REST

---

## ⚙️ Requisitos previos
Antes de empezar, asegúrate de tener instalado:

- [PHP >= 8.1](https://www.php.net/downloads)
- [Composer](https://getcomposer.org/)
- [Node.js >= 18](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Git](https://git-scm.com/)

---

## 🚀 Instalación y configuración

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/spotifree.git
cd spotifree
cd spotify-backend
composer install
cp .env.example .env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=spotifree
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password
php artisan key:generate
php artisan migrate --seed
php artisan serve
Configurar el Frontend (React)
cd ../spotify-frontend


Instalar dependencias:

npm install


Crear archivo .env:

cp .env.example .env


Configurar URL del backend en .env:

VITE_API_URL=http://127.0.0.1:8000/api


Levantar el servidor frontend:

npm run dev


El frontend estará en http://127.0.0.1:5173.

🛠️ Scripts útiles
Backend
php artisan migrate:fresh --seed   # Reinicia la base de datos
php artisan tinker                 # Consola interactiva
php artisan route:list             # Ver rutas disponibles

Frontend
npm run dev    # Levanta el frontend en desarrollo
npm run build  # Compila para producción
npm run lint   # Linter
