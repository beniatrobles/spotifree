<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Artist extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'image'];

    public function albums()
    {
        return $this->hasMany(Album::class);
    }

    public function songs()
    {
        return $this->hasMany(Song::class);
    }
}

