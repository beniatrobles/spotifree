<?php

namespace Database\Seeders;

use App\Models\Album;
use App\Models\Artist;
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
        $album1 = Album::where('title', 'A Head Full of Dreams')->first();
        $album2 = Album::where('title', 'Evolve')->first();
        $coldplay = Artist::where('name', 'Coldplay')->first();
        $imagine = Artist::where('name', 'Imagine Dragons')->first();

        Song::create([
            'title' => 'Adventure of a Lifetime',
            'album_id' => $album1->id,
            'artist_id' => $coldplay->id,
            'audio_path' => 'audios/adventure_of_a_lifetime.mp3',
            'duration' => 260,
        ]);

        Song::create([
            'title' => 'Believer',
            'album_id' => $album2->id,
            'artist_id' => $imagine->id,
            'audio_path' => 'audios/believer.mp3',
            'duration' => 220,
        ]);
    }
}
