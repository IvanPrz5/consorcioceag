<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formatos extends Model
{
    use HasFactory;


    protected $fillable = [
        'id',
        'nombre',
        'idSistema',
        'formatoHtml',
        'estatus',
    ];


    protected $hidden = [
        'created_at',
        'updated_at',
    ];


}
