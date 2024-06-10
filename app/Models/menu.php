<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'descripcion',
        'icono',
        'ruta',
        'id_sistema',
        'estatus',
    ];


    protected $hidden = [
        'created_at',
        'updated_at',
    ];





}
