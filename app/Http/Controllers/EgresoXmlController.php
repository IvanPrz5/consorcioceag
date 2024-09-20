<?php

namespace App\Http\Controllers;

use App\Models\EgresoFotografia;
use App\Models\egresoXml;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EgresoXmlController extends Controller
{
    public function allEgresoXml($mes , $anio , $idEmpresa){
        if($mes == 0){

            return egresoXml::whereYear('fechaFactura', $anio)->where('estatus', true)->where('idEmpresa', $idEmpresa)->get();
        }else{

            return egresoXml::whereYear('fechaFactura', $anio)->whereMonth('fechaFactura', $mes)->where('estatus', true)->where('idEmpresa', $idEmpresa)->get();
        }


    }

    public function eliminarEgreso($id){
        return egresoXml::where('id', '=', $id)->update(['estatus' => false]);
    }

    public function subirImagen (Request $request){


        $datos = $request->file('imagenes');
        $idEgreso = $request->input('idEgreso');

        $salida = "";
        foreach ($datos  as $archivo) {

            $urlLogo = $archivo->store('public/empresas/fotografias');
            $urlLogo = Storage::url($urlLogo); //para poder  obtener url y mostara en publico
            $salida = $salida .  $urlLogo."---";

            $foto  = new EgresoFotografia();
            $foto->ruta = $urlLogo;
            $foto->idEgreso= $idEgreso;
            $foto->save();
        }


        return $this->ListadoFotos(1);

    }




    public function ListadoFotos ( $idEgreso){

        return EgresoFotografia::where('idEgreso','=',$idEgreso)->where('estatus' ,'=', true )->get();
    }


    public function borrarFotos ( $idFoto){

        return  EgresoFotografia::destroy($idFoto) ;
    }





    public function guardarNuevoEgresoXml(Request $request){

        $egresos = new egresoXml();
        $egresos->fill($request->all());
        $egresos->save();
        return $egresos;
    }

    public function editarEgresoXml(Request $request){

        $egreso =  egresoXml::find($request->id);
        $egreso->update($request->all());

        return $egreso;


    }


}
