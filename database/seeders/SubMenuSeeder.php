<?php

namespace Database\Seeders;

use App\Models\subMenu;
use Illuminate\Database\Seeder;

class SubMenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->menuNominaProgramador();
         $this->menuEgresos();

         $this->ConfiguracionTotal();


    }









    public function menuNominaProgramador(){





            $subMenu = new subMenu();
            $subMenu->idMenu = 1 ;
            $subMenu->idTipoMenu =  1 ;
                                // $subMenu->idMenuDepende =  ;
            $subMenu->idRol = 1 ;
            $subMenu->consecutivo = 1 ;
            $subMenu->save();


                                                            $subMenu = new subMenu();

                                                            $subMenu->idMenu = 2 ;
                                                            $subMenu->idTipoMenu =  2 ;
                                                            $subMenu->idMenuDepende = 1 ;
                                                            $subMenu->idRol = 1 ;
                                                            $subMenu->consecutivo = 1 ;

                                                            $subMenu->save();


                                                            $subMenu = new subMenu();

                                                            $subMenu->idMenu = 3 ;
                                                            $subMenu->idTipoMenu =  2 ;
                                                            $subMenu->idMenuDepende = 1 ;
                                                            $subMenu->idRol = 1 ;
                                                            $subMenu->consecutivo = 2 ;

                                                            $subMenu->save();


                                                            $subMenu = new subMenu();

                                                            $subMenu->idMenu = 4 ;
                                                            $subMenu->idTipoMenu =  2 ;
                                                            $subMenu->idMenuDepende = 1 ;
                                                            $subMenu->idRol = 1 ;
                                                            $subMenu->consecutivo = 3 ;

                                                            $subMenu->save();


                                                            $subMenu = new subMenu();

                                                            $subMenu->idMenu = 5 ;
                                                            $subMenu->idTipoMenu =  2 ;
                                                            $subMenu->idMenuDepende = 1 ;
                                                            $subMenu->idRol = 1 ;
                                                            $subMenu->consecutivo = 4 ;

                                                            $subMenu->save();


                                                            $subMenu = new subMenu();

                                                            $subMenu->idMenu = 6 ;
                                                            $subMenu->idTipoMenu =  2 ;
                                                            $subMenu->idMenuDepende = 1 ;
                                                            $subMenu->idRol = 1 ;
                                                            $subMenu->consecutivo = 5 ;

                                                            $subMenu->save();


                                                            $subMenu = new subMenu();

                                                            $subMenu->idMenu = 7 ;
                                                            $subMenu->idTipoMenu =  2 ;
                                                            $subMenu->idMenuDepende = 1 ;
                                                            $subMenu->idRol = 1 ;
                                                            $subMenu->consecutivo = 6 ;

                                                            $subMenu->save();


                                                            $subMenu = new subMenu();

                                                            $subMenu->idMenu = 8 ;
                                                            $subMenu->idTipoMenu =  1 ;
                                                            $subMenu->idMenuDepende = 1  ;
                                                            $subMenu->idRol = 1 ;
                                                            $subMenu->consecutivo = 7 ;

                                                            $subMenu->save();


                                                            $subMenu = new subMenu();

                                                            $subMenu->idMenu = 9 ;
                                                            $subMenu->idTipoMenu =  2 ;
                                                            $subMenu->idMenuDepende = 1 ;
                                                            $subMenu->idRol = 1 ;
                                                            $subMenu->consecutivo = 8 ;

                                                            $subMenu->save();

                                                            $subMenu = new subMenu();

                                                            $subMenu->idMenu = 10 ;
                                                            $subMenu->idTipoMenu =  2 ;
                                                            $subMenu->idMenuDepende = 1 ;
                                                            $subMenu->idRol = 1 ;
                                                            $subMenu->consecutivo = 9 ;

                                                            $subMenu->save();




    }


    public function menuEgresos(){




        $subMenu = new subMenu();
        $subMenu->idMenu = 11 ;
        $subMenu->idTipoMenu =  1 ;
                            // $subMenu->idMenuDepende =  ;
        $subMenu->idRol = 2 ;
        $subMenu->consecutivo = 1 ;
        $subMenu->save();


                                                        $subMenu = new subMenu();

                                                        $subMenu->idMenu = 12 ;
                                                        $subMenu->idTipoMenu =  2 ;
                                                        $subMenu->idMenuDepende = 11 ;
                                                        $subMenu->idRol = 2 ;
                                                        $subMenu->consecutivo = 1 ;

                                                        $subMenu->save();


                                                        $subMenu = new subMenu();

                                                        $subMenu->idMenu = 13 ;
                                                        $subMenu->idTipoMenu =  2 ;
                                                        $subMenu->idMenuDepende = 11 ;
                                                        $subMenu->idRol = 2 ;
                                                        $subMenu->consecutivo = 2 ;

                                                        $subMenu->save();


                                                        $subMenu = new subMenu();

                                                        $subMenu->idMenu = 14 ;
                                                        $subMenu->idTipoMenu =  2 ;
                                                        $subMenu->idMenuDepende = 11 ;
                                                        $subMenu->idRol = 2 ;
                                                        $subMenu->consecutivo = 2 ;

                                                        $subMenu->save();




    }
    public function ConfiguracionTotal(){


    }
}
