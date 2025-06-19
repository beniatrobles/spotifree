<?php

namespace Database\Seeders;

use App\Models\Artist;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ArtistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Artist::create(['name' => 'Rosalía', 'image' => 'images/artists/rosalia.jpg']);
        Artist::create(['name' => 'Bad Bunny', 'image' => 'images/artists/badbunny.jpg']);
    }
}
