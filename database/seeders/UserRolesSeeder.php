<?php

namespace Database\Seeders;

use App\Models\UserRoles;
use Illuminate\Database\Seeder;

class UserRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $relacion = new UserRoles();
        $relacion->idUser = 1  ;
        $relacion->idRol =  1 ;
        $relacion->save();

        $relacion = new UserRoles();
        $relacion->idUser = 1  ;
        $relacion->idRol =  2 ;
        $relacion->save();

        $relacion = new UserRoles();
        $relacion->idUser = 2  ;
        $relacion->idRol =  2 ;
        $relacion->save();


        $relacion = new UserRoles();
        $relacion->idUser = 3  ;
        $relacion->idRol =  2 ;
        $relacion->save();





    }
}
