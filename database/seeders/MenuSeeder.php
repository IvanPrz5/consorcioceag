<?php

namespace Database\Seeders;

use App\Models\menu;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {


        // 1
            $menu = new menu();
            $menu->descripcion = 'CONFIGURACION GENERAL';
            $menu->icono = 'mdi-folder-edit-outline';
            $menu->ruta = '';
            $menu->id_sistema = 1  ;
            $menu->save();


        //2
                $menu = new menu();
                $menu->descripcion = 'USUARIO';
                $menu->icono = 'mdi-folder-edit-outline';
                $menu->ruta = '/usuarios';
                $menu->id_sistema = 1  ;
                $menu->save();
        //3
                $menu = new menu();
                $menu->descripcion = 'EMPRESAS';
                $menu->icono = 'mdi-folder-edit-outline';
                $menu->ruta = '/empresa';
                $menu->id_sistema = 1  ;
                $menu->save();
        //4
                $menu = new menu();
                $menu->descripcion = 'ROLES';
                $menu->icono = 'mdi-folder-edit-outline';
                $menu->ruta = '/roles';
                $menu->id_sistema = 1  ;
                $menu->save();
        //5
                $menu = new menu();
                $menu->descripcion = 'MENU';
                $menu->icono = 'mdi-folder-edit-outline';
                $menu->ruta = '/menus';
                $menu->id_sistema = 1  ;
                $menu->save();
        //6
                $menu = new menu();
                $menu->descripcion = 'SISTEMAS';
                $menu->icono = 'mdi-folder-edit-outline';
                $menu->ruta = '/sistemas';
                $menu->id_sistema = 1  ;
                $menu->save();
        //7
                $menu = new menu();
                $menu->descripcion = 'MENU ROLES';
                $menu->icono = 'mdi-folder-edit-outline';
                $menu->ruta = '/menuRoles';
                $menu->id_sistema = 1  ;
                $menu->save();

        //8
                $menu = new menu();
                $menu->descripcion = 'FORMATOS';
                $menu->icono = 'mdi-folder-edit-outline';
                $menu->ruta = '/';
                $menu->id_sistema = 1  ;
                $menu->save();
        //9
                $menu = new menu();
                $menu->descripcion = 'FORMATOS';
                $menu->icono = 'mdi-folder-edit-outline';
                $menu->ruta = '/formatos';
                $menu->id_sistema = 1 ;
                $menu->save();
        //10
                $menu = new menu();
                $menu->descripcion = 'ORGANIGRAMA';
                $menu->icono = 'mdi-folder-edit-outline';
                $menu->ruta = '/organigrama';
                $menu->id_sistema = 1 ;
                $menu->save();





        //11
                $menu = new menu();
                $menu->descripcion = 'EGRESOS';
                $menu->icono = 'mdi-folder-edit-outline';
                $menu->ruta = '/';
                $menu->id_sistema = 2  ;
                $menu->save();

            //12
            $menu = new menu();
            $menu->descripcion = 'SOLICITUDES';
            $menu->icono = '';
            $menu->ruta = '/egresos/solicitudes';
            $menu->id_sistema = 2  ;
            $menu->save();



        //13
                $menu = new menu();
                $menu->descripcion = 'ORGANIGRAMA';
                $menu->icono = '';
                $menu->ruta = '/egresos/organigrama';
                $menu->id_sistema = 2  ;
                $menu->save();
        //14
                $menu = new menu();
                $menu->descripcion = 'ORDEN DE EGRESOS';
                $menu->icono = 'mdi-folder-edit-outline';
                $menu->ruta = '/egresos/capturaEgreso';
                $menu->id_sistema = 2  ;
                $menu->save();


    }
}
