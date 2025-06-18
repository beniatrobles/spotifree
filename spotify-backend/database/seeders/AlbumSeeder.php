<?php

namespace Database\Seeders;

use App\Models\Album;
use App\Models\Artist;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AlbumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $coldplay = Artist::where('name', 'Coldplay')->first();
        $imagine = Artist::where('name', 'Imagine Dragons')->first();

        Album::create([
            'title' => 'A Head Full of Dreams',
            'artist_id' => $coldplay->id,
            'image' => null,
            'release_date' => '2015-12-04',
        ]);

        Album::create([
            'title' => 'Evolve',
            'artist_id' => $imagine->id,
            'image' => null,
            'release_date' => '2017-06-23',
        ]);
    }
}
