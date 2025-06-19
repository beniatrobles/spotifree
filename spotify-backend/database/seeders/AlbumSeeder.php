<?php

namespace Database\Seeders;

use App\Models\Album;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AlbumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
        public function run(): void
    {
        Album::create([
            'title' => 'Motomami',
            'artist_id' => 1,
            'image' => 'images/albums/motomami.jpg',
            'release_date' => '2022-03-18'
        ]);

        Album::create([
            'title' => 'Un Verano Sin Ti',
            'artist_id' => 2,
            'image' => 'images/albums/verano.jpg',
            'release_date' => '2022-05-06'
        ]);
    }
}
