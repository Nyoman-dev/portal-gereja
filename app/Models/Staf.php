<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Staf extends Model
{
    protected $fillable = [
        'nama',
        'jabatan',
        'alamat',
        'telepon',
        'kode_jabatan'
    ];
}
