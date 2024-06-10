<?php

namespace Database\Seeders;

use App\Models\sistemas;
use Illuminate\Database\Seeder;

class SistemasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $sistemas = new sistemas();
        $sistemas->nombre = 'CONFIGURACION GENERAL' ;
        $sistemas->descripcion = 'SISTEMAS' ;
        $sistemas->imagen = '/' ;
        $sistemas->save();

        $sistemas = new sistemas();
        $sistemas->nombre = 'EGRESOS' ;
        $sistemas->descripcion = 'SISTEMA DE EGRESOS MUNICIPAL' ;
        $sistemas->imagen = '/' ;
        $sistemas->save();



    }
}
