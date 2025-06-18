<?php
namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()->likes()->with('song')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'song_id' => 'required|exists:songs,id',
        ]);

        $like = $request->user()->likes()->firstOrCreate(['song_id' => $data['song_id']]);

        return response()->json($like, 201);
    }

    public function destroy(Request $request, $songId)
    {
        $like = $request->user()->likes()->where('song_id', $songId)->first();

        if ($like) {
            $like->delete();
            return response()->json(['message' => 'Like eliminado']);
        }

        return response()->json(['message' => 'Like no encontrado'], 404);
    }
}
