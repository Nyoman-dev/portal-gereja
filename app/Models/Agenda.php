<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agenda extends Model
{
    protected $fillable = [
        'tanggal',
        'tempat_ibadah',
        'waktu_ibadah',
        'pf',
        'pi',
    ];
}
