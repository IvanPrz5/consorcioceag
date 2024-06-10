<?php

namespace Database\Seeders;

use App\Models\OrganigramaDetalle;
use Illuminate\Database\Seeder;

class OrganigramaDetalleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $orga = new OrganigramaDetalle();
        $orga->idEmpresa = 1 ;
        $orga->idOrganigrama = 1 ;
        $orga->año = 2021;
        $orga->nombre = "FERNANDO GARCIA";
        $orga->save();


        $orga = new OrganigramaDetalle();
        $orga->idEmpresa = 1 ;
        $orga->idOrganigrama = 2 ;
        $orga->año = 2021;
        $orga->nombre = "PEDRO JIMENEZ";
        $orga->save();



        $orga = new OrganigramaDetalle();
        $orga->idEmpresa = 1 ;
        $orga->idOrganigrama = 2 ;
        $orga->año = 2020;
        $orga->nombre = "PEDRO";
        $orga->save();



    }
}
