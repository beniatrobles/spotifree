<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\Request;

class AlbumController extends Controller
{
    public function index()
    {
        return Album::with('artist')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'artist_id' => 'required|exists:artists,id',
            'image' => 'nullable|string',
        ]);

        return Album::create($data);
    }

    public function show(Album $album)
    {
        return $album->load('artist', 'songs');
    }

    public function update(Request $request, Album $album)
    {
        $data = $request->validate([
            'title' => 'sometimes|required|string',
            'artist_id' => 'sometimes|required|exists:artists,id',
            'image' => 'nullable|string',
        ]);

        $album->update($data);

        return $album;
    }

    public function destroy(Album $album)
    {
        $album->delete();

        return response()->json(['message' => 'Album deleted successfully']);
    }
}