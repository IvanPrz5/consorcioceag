<?php

namespace Database\Seeders;

use App\Models\roles;
use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = new roles();
        $roles->descripcion = 'PROGRAMADOR';
        $roles->save();

        $roles = new roles();
        $roles->descripcion = 'EGRESOS';
        $roles->save();




    }
}
