<?php

namespace Database\Seeders;

use App\Models\tipoMenu;
use Illuminate\Database\Seeder;

class TipoMenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tipo = new tipoMenu();
        $tipo->descripcion = 'PRINCIPAL' ;
        $tipo->save();


        $tipo = new tipoMenu();
        $tipo->descripcion = 'SUB MENU' ;
        $tipo->save();


    }
}
