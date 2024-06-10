<?php

namespace Database\Seeders;

use App\Models\empresas;
use Illuminate\Database\Seeder;

class EmpresasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {



        $empresa = new empresas();
        $empresa->nombre = 'SISTEMAS' ;
        $empresa->nombreNominativo= 'CONFIGURACION GENERAL' ;
        $empresa->rfc= '' ;
        $empresa->calle= '' ;
        $empresa->numExt= '' ;
        $empresa->numInt= ' ' ;
        $empresa->agencia= '' ;
        $empresa->colonia= '' ;
        $empresa->municipio= '' ;
        $empresa->distrito= 'Distrito' ;
        $empresa->estado= '' ;
        $empresa->cp= '' ;
        $empresa->logo= '/' ;
        $empresa->cer = '' ;
        $empresa->key = '' ;
        $empresa->passwordKey = '' ;
        $empresa->celular = '' ;
        $empresa->correoElectronico = '' ;
        $empresa->save();


        $empresa = new empresas();
        $empresa->nombre = 'MUESTRA ' ;
        $empresa->nombreNominativo= 'MUNICIPIO 1' ;
        $empresa->rfc= '' ;
        $empresa->calle= '' ;
        $empresa->numExt= '' ;
        $empresa->numInt= ' ' ;
        $empresa->agencia= '' ;
        $empresa->colonia= '' ;
        $empresa->municipio= '' ;
        $empresa->distrito= 'Distrito' ;
        $empresa->estado= '' ;
        $empresa->cp= '' ;
        $empresa->logo= '/' ;
        $empresa->cer = '' ;
        $empresa->key = '' ;
        $empresa->passwordKey = '' ;
        $empresa->celular = '' ;
        $empresa->correoElectronico = '' ;
        $empresa->save();


        $empresa = new empresas();
        $empresa->nombre = 'MUESTRA 2' ;
        $empresa->nombreNominativo= 'MUNICIPIO 2' ;
        $empresa->rfc= '' ;
        $empresa->calle= '' ;
        $empresa->numExt= '' ;
        $empresa->numInt= ' ' ;
        $empresa->agencia= '' ;
        $empresa->colonia= '' ;
        $empresa->municipio= '' ;
        $empresa->distrito= 'Distrito' ;
        $empresa->estado= '' ;
        $empresa->cp= '' ;
        $empresa->logo= '/' ;
        $empresa->cer = '' ;
        $empresa->key = '' ;
        $empresa->passwordKey = '' ;
        $empresa->celular = '' ;
        $empresa->correoElectronico = '' ;
        $empresa->save();


    }
}
