<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Playlist;
use App\Models\User;

class PlaylistSeeder extends Seeder
{
    public function run(): void
    {
        Playlist::create([
            'name' => 'Favoritas de Juan',
            'user_id' => User::first()->id,
            'image' => 'images/playlists/favoritas.jpg'
        ]);
    }
}
