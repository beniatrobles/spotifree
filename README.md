# 🎵 Spotifree

Spotifree es un clon de Spotify hecho con **Laravel (Backend)** y **React (Frontend)**.  
Permite gestionar usuarios, playlists, canciones y mucho más. 🚀  

---

## 📂 Tecnologías usadas
- **Backend:** Laravel 10, PHP 8, PostgreSQL
- **Frontend:** React, Vite, Axios, CSS vanilla
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
```
## 2️⃣ Configurar el Backend (Laravel)

```bash
cd spotify-backend
composer install
cp .env.example .env   # En Windows PowerShell: copy .env.example .env

```
Edita .env con tus credenciales de PostgreSQL

```bash
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=spotifree
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password

```

Genera la clave de la aplicación
```bash
php artisan key:generate
```

Genera la clave de la aplicación
```bash
php artisan migrate --seed
php artisan storage:link
```

Inicia el servidor
```bash
php artisan serve
```

📌 Backend disponible en: http://127.0.0.1:8000


## 3️⃣ Configurar el Frontend (React + Vite)
```bash
cd ../spotify-frontend
npm install
cp .env.example .env
```

Edita spotify-frontend/.env

```bash
VITE_API_URL=http://127.0.0.1:8000/api
```
Levanta el servidor de desarrollo

```bash
npm run dev
```
📌 Frontend disponible en: http://127.0.0.1:5173
