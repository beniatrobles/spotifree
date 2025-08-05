<?php

use App\Http\Controllers\ArtistController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/artists',[ArtistController::class,'index'])->name('artists.index');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
