<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
   public function run(): void
{
    \App\Models\User::factory()->create([
        'name' => 'Juan',
        'email' => 'juan@example.com',
        'password' => bcrypt('password'),
        'image' => 'images/users/juan.png'

    ]);

    $this->call([
        ArtistSeeder::class,
        AlbumSeeder::class,
        SongSeeder::class,
        PlaylistSeeder::class,
    ]);
}
}
