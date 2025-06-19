# 🎵 SPOTIFREE – Esquema de Base de Datos (Laravel + PostgreSQL)

---

## 1. `users`
| Campo       | Tipo         | Notas        |
|-------------|--------------|--------------|
| id          | PK           |              |
| name        | string       |              |
| email       | string       | Único        |
| password    | string       |              |
| image       | string       | Nullable     |
| created_at  | timestamp    |              |
| updated_at  | timestamp    |              |

---

## 2. `artists`
| Campo       | Tipo         | Notas        |
|-------------|--------------|--------------|
| id          | PK           |              |
| name        | string       |              |
| image       | string       | Nullable     |
| created_at  | timestamp    |              |
| updated_at  | timestamp    |              |

---

## 3. `albums`
| Campo         | Tipo             | Notas        |
|---------------|------------------|--------------|
| id            | PK               |              |
| title         | string           |              |
| artist_id     | FK → artists.id  |              |
| image         | string           | Nullable     |
| release_date  | date             | Nullable     |
| created_at    | timestamp        |              |
| updated_at    | timestamp        |              |

---

## 4. `songs`
| Campo       | Tipo               | Notas              |
|-------------|--------------------|--------------------|
| id          | PK                 |                    |
| title       | string             |                    |
| album_id    | FK → albums.id     | Nullable           |
| artist_id   | FK → artists.id    |                    |
| audio_path  | string             | Ruta del archivo   |
| duration    | integer            | Opcional           |
| created_at  | timestamp          |                    |
| updated_at  | timestamp          |                    |

---

## 5. `playlists`
| Campo       | Tipo             | Notas        |
|-------------|------------------|--------------|
| id          | PK               |              |
| name        | string           |              |
| user_id     | FK → users.id    |              |
| image       | string           | Nullable     |
| created_at  | timestamp        |              |
| updated_at  | timestamp        |              |

---

## 6. `playlist_song` (Tabla Pivote)
| Campo       | Tipo                 |
|-------------|----------------------|
| playlist_id | FK → playlists.id    |
| song_id     | FK → songs.id        |

---

## 7. `likes` (Opcional - Para dar like a canciones)
| Campo       | Tipo               |
|-------------|--------------------|
| id          | PK                 |
| user_id     | FK → users.id      |
| song_id     | FK → songs.id      |
| created_at  | timestamp          |

---

## 🔗 Relaciones

- Un **usuario** tiene muchas **playlists**
- Un **artista** tiene muchos **álbumes**
- Un **álbum**:
  - Pertenece a un **artista**
  - Tiene muchas **canciones**
- Una **canción**:
  - Pertenece a un **artista**
  - Puede pertenecer a un **álbum**
- Una **playlist**:
  - Pertenece a un **usuario**
  - Contiene muchas **canciones**
- Una **canción** puede estar en muchas **playlists** (relación many-to-many)
- Un **usuario** puede dar **like** a muchas **canciones**