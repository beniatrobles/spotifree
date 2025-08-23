<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlaylistSong extends Model
{
    use HasFactory;

    protected $fillable = ['playlist_id', 'song_id'];

    public $incrementing = false; // <- importante
    protected $primaryKey = null; // <- importante para clave compuesta
    public $timestamps = false;   // si no tienes created_at/updated_at

    public function playlist() {
        return $this->belongsTo(Playlist::class);
    }

    public function song() {
        return $this->belongsTo(Song::class);
    }
}
