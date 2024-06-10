<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {



        DB::table('users')->insert([
            'nombre' => 'fernando',
            'materno' => 'garcia',
            'paterno' => 'jimenez',
            'celular' => '951-125-1552',

            'email' => 'admon@admon.com',
            'password' => Hash::make('admon'),
            'estatus' => true
        ]);

        DB::table('users')->insert([
            'nombre' => 'prueba ',
            'materno' => 'materno',
            'paterno' => 'materno',
            'celular' => '951-125-1552',

            'email' => 'ceag@ceag.com',
            'password' => Hash::make('ceag'),
            'estatus' => true
        ]);

        DB::table('users')->insert([
            'nombre' => 'prueba ',
            'materno' => 'materno',
            'paterno' => 'materno',
            'celular' => '951-125-1552',

            'email' => 'ceag2@ceag.com',
            'password' => Hash::make('ceag'),
            'estatus' => true
        ]);
   



    }
}
