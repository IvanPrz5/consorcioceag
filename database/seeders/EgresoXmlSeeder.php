<?php

namespace Database\Seeders;

use App\Models\configuracionEgreso;
use Illuminate\Database\Seeder;

class EgresoXmlSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

            $configuracion = new configuracionEgreso();
            $configuracion->idEmpresa =  3 ;
            $configuracion->descripcion = "jasperIngreso";
            $configuracion->valor = "solicitudHuitzo.jasper" ;
            $configuracion->save();

    }
}
