<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class empresas extends Model
{
    use HasFactory;


    protected $fillable = [

        'id'               ,
        'nombre'           ,
        'nombreNominativo' ,
        'rfc'              ,
        'calle'            ,
        'numExt'           ,
        'numInt'           ,
        'agencia'          ,
        'colonia'          ,
        'municipio'        ,
        'distrito'          ,
        'estado'           ,
        'cp'               ,
        'logo'             ,
        'cer'              ,
        'key'              ,
        'passwordKey'      ,
        'celular'          ,
        'correoElectronico',
        'estatus'


    ];




    protected $hidden = [
        'created_at',
        'updated_at',
        'passwordKey',
        'cer',
        'key',
    ];
}
