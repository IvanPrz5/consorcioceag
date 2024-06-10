<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSistemas extends Model
{
    use HasFactory;



    public function getSistemaEmpresaAttribute()
    {
        return $this->attributes['idSistema'] .' '. $this->attributes['idEmpresa'];
    }
}
