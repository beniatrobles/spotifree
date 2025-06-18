<?php

namespace Database\Seeders;

use App\Models\Playlist;
use App\Models\Song;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlaylistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $user = User::first();
        $song1 = Song::where('title', 'Adventure of a Lifetime')->first();
        $song2 = Song::where('title', 'Believer')->first();

        $playlist = Playlist::create([
            'name' => 'Mis Favoritas',
            'user_id' => $user->id,
            'image' => null,
        ]);

        $playlist->songs()->attach([$song1->id, $song2->id]);
    }
}
