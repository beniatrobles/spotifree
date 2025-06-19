// instalar laravel(backend)
composer global require laravel/installer
laravel new nombredelproyecto
    //conexion con postgresql
    DB_CONNECTION=pgsql
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_DATABASE=spotify_db
    DB_USERNAME=postgres
    DB_PASSWORD=toor

instalar api.php

php artisan install:api

definir rutas

habilitar cors(define si un recurso como la api puede ser accedidos desde un cliente)
php artisan config:publish cors



//instalar react(frontend)
npm create vite@latest nombredelproyecto react
npm install
npm install axios

configurar vite
