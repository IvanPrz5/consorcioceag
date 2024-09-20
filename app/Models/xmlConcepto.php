<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class xmlConcepto extends Model
{
    use HasFactory;

    protected $table = 'xml_conceptos';
    
    protected $fillable = [
        'cantidad',
        'descripcion',
        'importe',
        'idXmlEgreso',
        'estatus',
    ];

    protected $hidden = [
        'updated_at',
    ];

}
