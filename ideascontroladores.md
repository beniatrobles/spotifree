# 🎧 Spotifree API - Controladores y Funcionalidades

Este documento describe los **controladores sugeridos** y las **funcionalidades clave** necesarias para construir una API tipo Spotify utilizando Laravel.

---

## 📦 1. UserController

- `register()` – Registro de usuarios
- `login()` – Inicio de sesión (usando JWT o Sanctum)
- `profile()` – Obtener perfil del usuario
- `updateProfile()` – Actualizar nombre, imagen, etc.
- `myPlaylists()` – Listar playlists del usuario
- `myLikes()` – Canciones marcadas como favoritas

---

## 🎤 2. ArtistController

- `index()` – Listar todos los artistas
- `show($id)` – Ver un artista
- `albums($id)` – Ver los álbumes de un artista
- `songs($id)` – Ver canciones del artista

---

## 💿 3. AlbumController

- `index()` – Listar álbumes
- `store()`, `update()`, `destroy()` – CRUD
- `show($id)` – Detalles de un álbum
- `songs($id)` – Canciones del álbum
- `byArtist($artist_id)` – Álbumes de un artista específico

---

## 🎶 4. SongController

- `index()`, `store()`, `update()`, `destroy()` – CRUD
- `show($id)` – Detalles de una canción
- `play($id)` – Acción de reproducción (registro de evento)
- `like($id)` / `unlike($id)` – Marcar/desmarcar como favorita
- `isLiked($id)` – Saber si el usuario dio like
- `search(query)` – Buscar canciones, artistas o álbumes

---

## 📂 5. PlaylistController

- `index()` – Listar playlists del usuario
- `store()` – Crear nueva playlist
- `show($id)` – Ver una playlist
- `update($id)` – Editar nombre o imagen
- `destroy($id)` – Eliminar playlist
- `addSong($playlist_id, $song_id)` – Agregar canción a la playlist
- `removeSong($playlist_id, $song_id)` – Quitar canción
- `songs($playlist_id)` – Ver canciones de la playlist

---

## ❤️ 6. LikeController *(opcional si no está integrado en SongController)*

- `store(user_id, song_id)` – Agregar like
- `destroy(user_id, song_id)` – Eliminar like
- `index(user_id)` – Listar canciones favoritas

---

## ▶️ 7. PlayerController *(reproducción y control de sesión de escucha)*

- `playSong($song_id)` – Reproducir una canción
- `pause()` / `resume()` – Control de reproducción
- `next()` / `previous()` – Navegar en la cola
- `getQueue()` – Ver cola actual
- `addToQueue($song_id)` – Agregar canción a la cola

---

## 🔍 8. DiscoveryController *(explorar nueva música)*

- `trending()` – Ver canciones populares
- `newReleases()` – Últimos lanzamientos
- `recommendations($user_id)` – Recomendaciones personalizadas
- `randomPlaylists()` – Listado aleatorio para explorar

---

## 🛡️ Funcionalidades comunes

- Protección de rutas con middleware `auth:sanctum`
- Paginación (`paginate()`) en resultados largos
- Filtros por artista, álbum, género, popularidad
- Subida de imágenes (perfil, playlists)
- Subida de archivos de audio (si se permite contenido original)

---

## ✅ Siguientes pasos recomendados

- [ ] Crear controladores con `php artisan make:controller`
- [ ] Usar Resource Controllers para CRUD
- [ ] Definir rutas en `routes/api.php`
- [ ] Proteger rutas privadas con middleware de autenticación
- [ ] Aplicar políticas o gates si se requiere control de permisos

