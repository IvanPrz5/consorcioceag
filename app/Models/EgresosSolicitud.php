<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EgresosSolicitud extends Model
{
    use HasFactory;



    protected $table = 'egresos_solicitudes';

    protected $fillable = [
        'folio',
        'beneficiario',
        'puesto',
        'descripcion',
        'importe',
        'idUsuario',
        'idEmpresa',
        'estatus',
    ];

    protected $hidden = [

        'updated_at',



    ];

}
