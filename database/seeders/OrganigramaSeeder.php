<?php

namespace Database\Seeders;

use App\Models\Organigrama;
use Illuminate\Database\Seeder;

class OrganigramaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $orga = new Organigrama();
        $orga->descripcion = 'PRESIDENTE MUNICIPAL';
        $orga->save();

        $orga = new Organigrama();
        $orga->descripcion = 'TESORERO MUNICIPAL';
        $orga->save();

        $orga = new Organigrama();
        $orga->descripcion = 'SINDICO MUNICIPAL';
        $orga->save();

        $orga = new Organigrama();
        $orga->descripcion = 'SINDICO MUNICIPAL';
        $orga->save();

        


    }
}
