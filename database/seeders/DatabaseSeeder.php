<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserSeeder::class);
        $this->call(EmpresasSeeder::class);
        $this->call(SistemasSeeder::class);
        $this->call(RolesSeeder::class);
        $this->call(TipoMenuSeeder::class);

        $this->call(MenuSeeder::class);
        $this->call(SubMenuSeeder::class);



        $this->call(EmpresasUserSeeder::class);
        $this->call(EmpresasSistemasSeeder::class);
        $this->call(UserSistemasSeeder::class);
        $this->call(UserRolesSeeder::class);

        $this->call(OrganigramaSeeder::class);
        $this->call(OrganigramaDetalleSeeder::class);

        $this->call(EgresoXmlSeeder::class);
        

       /*  $usuario = new User();


        $usuario->name = "rogelio";
        $usuario->email = "admin@admin.com";
        $usuario->password = bcrypt("admin");
        $usuario->save(); */

    }
}
