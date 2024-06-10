<?php

namespace Database\Seeders;

use App\Models\empresasUser;
use Illuminate\Database\Seeder;

class EmpresasUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $relacion = new empresasUser();
        $relacion->idEmpresa = 1;
        $relacion->idUser =  1 ;
        $relacion->save();


        $relacion = new empresasUser();
        $relacion->idEmpresa = 2;
        $relacion->idUser =  2 ;
        $relacion->save();

        $relacion = new empresasUser();
        $relacion->idEmpresa = 3;
        $relacion->idUser =  2 ;
        $relacion->save();








        $relacion = new empresasUser();
        $relacion->idEmpresa = 2;
        $relacion->idUser =  3 ;
        $relacion->save();
        
        $relacion = new empresasUser();
        $relacion->idEmpresa = 3;
        $relacion->idUser =  3 ;
        $relacion->save();



    }
}
