<?php

use App\Http\Controllers\AlbumController;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\SongController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/artists',[ArtistController::class,'index'])->name('artists.index');
Route::get('/albums',[AlbumController::class,'index'])->name('albums.index');
Route::get('/songs',[SongController::class,'index'])->name('songs.index');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
