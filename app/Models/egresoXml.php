<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class egresoXml extends Model
{


    use HasFactory;


    protected $fillable = [

        'id'               ,
        'idEmpresa' ,
        'emisorRfc'           ,
        'emisorNombre' ,
        'receptorRfc'              ,
        'receptorNombre'            ,
        'total'           ,
        'fechaFactura'           ,
        'uuid'          ,
        'descripcion'          ,
        'destino'        ,
        'autorizo'          ,
        'autorizoNombre'           ,
        'solicito',
        'solicitoNombre',
        'asunto',
        'ramo',
        'numOficio',
        'personaMoral',
        'representanteLegal',
        'fechaLlegada',
        'estatus'


    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

}
