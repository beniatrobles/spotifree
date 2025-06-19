<?php

namespace Database\Seeders;

use App\Models\Song;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SongSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
        public function run(): void
    {
        Song::create([
            'title' => 'Saoko',
            'artist_id' => 1,
            'album_id' => 1,
            'audio_path' => 'audio/rosalia/saoko.mp3'
        ]);

        Song::create([
            'title' => 'Tití Me Preguntó',
            'artist_id' => 2,
            'album_id' => 2,
            'audio_path' => 'audio/badbunny/titi.mp3'
        ]);
    }
}
