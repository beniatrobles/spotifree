<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use Illuminate\Http\Request;

class PlaylistController extends Controller
{
    public function index()
    {
        return Playlist::with('songs')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'image' => 'nullable|string',
            'song_ids' => 'nullable|array',
            'song_ids.*' => 'exists:songs,id',
        ]);

        $playlist = Playlist::create([
            'name' => $data['name'],
            'user_id' => $data['user_id'],
            'image' => $data['image'] ?? null,
        ]);

        if (!empty($data['song_ids'])) {
            $playlist->songs()->sync($data['song_ids']);
        }

        return $playlist->load('songs');
    }

    public function show(Playlist $playlist)
    {
        return $playlist->load('songs');
    }

    public function update(Request $request, Playlist $playlist)
    {
        $data = $request->validate([
            'name' => 'sometimes|required|string',
            'image' => 'nullable|string',
            'song_ids' => 'nullable|array',
            'song_ids.*' => 'exists:songs,id',
        ]);

        $playlist->update($data);

        if (array_key_exists('song_ids', $data)) {
            $playlist->songs()->sync($data['song_ids']);
        }

        return $playlist->load('songs');
    }

    public function destroy(Playlist $playlist)
    {
        $playlist->delete();

        return response()->json(['message' => 'Playlist deleted']);
    }
}
