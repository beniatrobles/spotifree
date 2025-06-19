<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Song extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'album_id', 'artist_id', 'audio_path', 'duration'];

    public function album()
    {
        return $this->belongsTo(Album::class);
    }

    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }

    public function playlists()
    {
        return $this->belongsToMany(Playlist::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }
}
