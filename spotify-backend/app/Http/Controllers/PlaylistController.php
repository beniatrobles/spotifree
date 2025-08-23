<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
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
        //
    }
}
