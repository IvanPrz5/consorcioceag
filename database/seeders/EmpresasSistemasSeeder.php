<?php

namespace Database\Seeders;

use App\Models\empresasSistemas;
use Illuminate\Database\Seeder;

class EmpresasSistemasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $relacion = new empresasSistemas();
        $relacion->idEmpresa = 1  ;
        $relacion->idSistema =  1 ;
        $relacion->save();

        $relacion = new empresasSistemas();
        $relacion->idEmpresa = 1  ;
        $relacion->idSistema =  2 ;
        $relacion->save();

        $relacion = new empresasSistemas();
        $relacion->idEmpresa = 2  ;
        $relacion->idSistema =  2 ;
        $relacion->save();


        $relacion = new empresasSistemas();
        $relacion->idEmpresa = 3  ;
        $relacion->idSistema =  2 ;
        $relacion->save();




    }
}
