<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use App\Models\PlaylistSong;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PlaylistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $playlists = Playlist::where('user_id', $user->id)->get();

        return response()->json(['playlists' => $playlists], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048',
        ]);

        $data = [
            'name' => $request->name,
            'user_id' => Auth::id(),
        ];

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('playlists', 'public');
            $data['image'] = $path;
        }

        $playlist = Playlist::create($data);

        return response()->json(['playlist' => $playlist], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $playlist = Playlist::with('songs')->findOrFail($id);

        // Opcional: asegurar que solo el dueño la vea
        if ($playlist->user_id !== Auth::id()) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        return response()->json(['playlist' => $playlist], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Playlist $playlist)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Playlist $playlist)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Playlist $playlist)
    {
        $user = Auth::user();

        // Solo permite borrar si la playlist es del usuario autenticado
        if ($playlist->user_id !== $user->id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }




        $playlist->delete();

        return response()->json(['message' => 'Playlist eliminada correctamente'], 200);
    }

   public function addSong(Request $request, Playlist $playlist)
{
    try {
        // Verifica que la playlist pertenece al usuario
        if ($playlist->user_id !== Auth::id()) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        // Validación
        $request->validate([
            'song_id' => 'required|exists:songs,id',
        ]);

        // Evita duplicados
        $exists = PlaylistSong::where('playlist_id', $playlist->id)
            ->where('song_id', $request->song_id)
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'La canción ya está en la playlist'], 409);
        }

        $playlistSong = PlaylistSong::create([
            'playlist_id' => $playlist->playlist_id,
            'song_id' => $request->song_id,
        ]);

        return response()->json([
            'message' => 'Canción añadida',
            'data' => $playlistSong
        ], 201);

    } catch (\Exception $e) {
        // Esto muestra el error exacto que está causando el 500
        return response()->json([
            'message' => 'Error al añadir canción',
            'error' => $e->getMessage(),
        ], 500);
    }
}

}
