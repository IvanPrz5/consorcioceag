<?php

namespace App\Http\Controllers;

use App\Models\Organigrama;
use Exception;
use Illuminate\Http\Request;

class OrganigramaController extends Controller
{
    public function allOrganigrama(  ){

        $orga =  Organigrama::select()->get();

        return $orga;
    }







    public function crearOrganigrama(Request $request){


        try{
            $orga = new Organigrama();
            $orga->fill($request->all());

            $orga->save();

            return response($orga, 200);

        }catch(Exception $e){

            return response($e->getMessage(), 400);
        }




    }

    public function editarOrganigrama(Request $request){


        try{
            $orga = Organigrama::find($request->id);
            $orga->update($request->all());
            return response($orga, 200);

        }catch(Exception $e){

            return response($e->getMessage(), 400);
        }

    }

    public function borrarOrganigrama($id){


        try{
            $orga = Organigrama::find($id);
            $orga->update(!$orga->estatus);
            return response($orga, 200);

        }catch(Exception $e){

            return response($e->getMessage(), 400);
        }

    }
}
