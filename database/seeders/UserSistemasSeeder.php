<?php

namespace Database\Seeders;

use App\Models\UserSistemas;
use Illuminate\Database\Seeder;

class UserSistemasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $relacion = new UserSistemas();
        $relacion->idUser = 1  ;
        $relacion->idSistema =  1 ;
        $relacion->idEmpresa = 1 ;
        $relacion->save();

        $relacion = new UserSistemas();
        $relacion->idUser = 1  ;
        $relacion->idSistema =  2 ;
        $relacion->idEmpresa = 1 ;
        $relacion->save();





        $relacion = new UserSistemas();
        $relacion->idUser = 1  ;
        $relacion->idSistema =  2 ;
        $relacion->idEmpresa = 1 ;
        $relacion->save();







        $relacion = new UserSistemas();
        $relacion->idUser = 2  ;
        $relacion->idSistema =  2 ;
        $relacion->idEmpresa = 2 ;
        $relacion->save();

        $relacion = new UserSistemas();
        $relacion->idUser = 2  ;
        $relacion->idSistema =  2 ;
        $relacion->idEmpresa = 3 ;
        $relacion->save();


        $relacion = new UserSistemas();
        $relacion->idUser = 3  ;
        $relacion->idSistema =  2 ;
        $relacion->idEmpresa = 2 ;
        $relacion->save();

        $relacion = new UserSistemas();
        $relacion->idUser = 3  ;
        $relacion->idSistema =  2 ;
        $relacion->idEmpresa = 3 ;
        $relacion->save();






    }
}
