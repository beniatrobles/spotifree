<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\SongController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Rutas Públicas
|--------------------------------------------------------------------------
*/

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Música - públicas
Route::get('/artists', [ArtistController::class, 'index'])->name('artists.index');
Route::get('/artist/{id}', [ArtistController::class, 'show']);

Route::get('/albums', [AlbumController::class, 'index'])->name('albums.index');
Route::get('/albums/{id}', [AlbumController::class, 'show']);
Route::get('/albums/{id}/songs', [SongController::class, 'songsByAlbum']);

Route::get('/songs', [SongController::class, 'index'])->name('songs.index');


/*
|--------------------------------------------------------------------------
| Rutas Protegidas (require token)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // Info del usuario autenticado
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/playlists', [PlaylistController::class, 'index']);  
    Route::post('/playlists', [PlaylistController::class, 'store']); 
    Route::get('/playlists/{id}', [PlaylistController::class, 'show']);
});
