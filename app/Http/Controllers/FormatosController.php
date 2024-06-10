<?php

namespace App\Http\Controllers;

use App\Models\Formatos;
use Exception;
use Illuminate\Http\Request;

class FormatosController extends Controller
{
    public function allFormatos(){
        //  return Formatos::all();
        return Formatos::select('formatos.id', 'formatos.nombre' , 'sistemas.nombre as sistema' , 'formatos.estatus' , 'formatos.formatoHtml')
        ->join('sistemas', 'sistemas.id' , '=' , 'formatos.idSistema' )->get();
    }
    public function formatos($id){

        return Formatos::select('formatos.formatoHtml')
        ->join('sistemas', 'sistemas.id' , '=' , 'formatos.idSistema' )
        ->where('formatos.id', $id)
        ->where('formatos.estatus' , true)
        ->get();

    }


    public function crearFormato(Request $request){
        try{

            $formato = new Formatos();
            $formato->fill($request->all());
            $si = $formato->save();

            return response( $si , 200);
        }catch(Exception $e){

            return response($e->getMessage(), 403);

        }


    }
    public function editarFormato(Request $request){


        try{
            $formato = Formatos::find($request->id);
            $formato->update($request->all());
            return response($formato, 200);

        }catch(Exception $e){

            return response($e->getMessage(), 400);
        }



    }

}
