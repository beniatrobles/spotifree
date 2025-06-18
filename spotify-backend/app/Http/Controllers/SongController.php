<?php

namespace App\Http\Controllers;

use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SongController extends Controller
{
    public function index()
    {
        return Song::with(['artist', 'album'])->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'artist_id' => 'required|exists:artists,id',
            'album_id' => 'nullable|exists:albums,id',
            'audio_file' => 'required|file|mimes:mp3,wav,ogg',
            'image' => 'nullable|file|image|max:2048',
        ]);

        // Subir audio
        $audioPath = $request->file('audio_file')->store('songs/audio', 'public');

        // Subir imagen si viene
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('songs/images', 'public');
        }

        $song = Song::create([
            'title' => $data['title'],
            'artist_id' => $data['artist_id'],
            'album_id' => $data['album_id'] ?? null,
            'audio_path' => $audioPath,
            'image' => $imagePath,
        ]);

        return $song->load('artist', 'album');
    }

    public function show(Song $song)
    {
        return $song->load('artist', 'album');
    }

    public function update(Request $request, Song $song)
    {
        $data = $request->validate([
            'title' => 'sometimes|required|string',
            'artist_id' => 'sometimes|required|exists:artists,id',
            'album_id' => 'nullable|exists:albums,id',
            'audio_file' => 'nullable|file|mimes:mp3,wav,ogg',
            'image' => 'nullable|file|image|max:2048',
        ]);

        if (isset($data['audio_file'])) {
            Storage::disk('public')->delete($song->audio_path);
            $song->audio_path = $request->file('audio_file')->store('songs/audio', 'public');
        }

        if (isset($data['image'])) {
            if ($song->image) {
                Storage::disk('public')->delete($song->image);
            }
            $song->image = $request->file('image')->store('songs/images', 'public');
        }

        $song->fill($data);
        $song->save();

        return $song->load('artist', 'album');
    }

    public function destroy(Song $song)
    {
        if ($song->audio_path) {
            Storage::disk('public')->delete($song->audio_path);
        }
        if ($song->image) {
            Storage::disk('public')->delete($song->image);
        }
        $song->delete();

        return response()->json(['message' => 'Song deleted']);
    }
}
