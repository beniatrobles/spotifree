
# 🛠️ Instalación de Laravel + React (API + Frontend)

## 🚀 Backend: Laravel + PostgreSQL

### 1. Instalar Laravel
```bash
composer global require laravel/installer
laravel new nombredelproyecto
```

### 2. Configurar conexión a PostgreSQL
Edita el archivo `.env` en la raíz del proyecto:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=spotify_db
DB_USERNAME=postgres
DB_PASSWORD=toor
```

### 3. Instalar modo API
```bash
php artisan install:api
```

### 4. Definir rutas de API
Agrega tus rutas dentro de `routes/api.php`, por ejemplo:

```php
Route::get('/songs', [SongController::class, 'index']);
```

### 5. Habilitar CORS (Cross-Origin Resource Sharing)

Permite que la API pueda ser accedida desde el frontend (por ejemplo, React):

```bash
php artisan config:publish cors
```

O edita directamente el archivo `config/cors.php` si ya existe.

---

## 🌐 Frontend: React + Vite

### 1. Crear proyecto con Vite
```bash
npm create vite@latest nombredelproyecto -- --template react
cd nombredelproyecto
```

### 2. Instalar dependencias
```bash
npm install
npm install axios
```

---

Ahora puedes iniciar ambos servidores:

- Laravel: `php artisan serve`
- React: `npm run dev`

Y conectar tu frontend con la API usando `axios`.
