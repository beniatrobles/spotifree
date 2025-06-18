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
   public function run()
    {
        Artist::create(['name' => 'Coldplay', 'image' => null]);
        Artist::create(['name' => 'Imagine Dragons', 'image' => null]);
    }
}
