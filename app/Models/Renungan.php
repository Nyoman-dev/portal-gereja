<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Renungan extends Model
{
    protected $fillable = [
        'tanggal',
        'judul',
        'slug',
        'deskripsi',
    ];
}
