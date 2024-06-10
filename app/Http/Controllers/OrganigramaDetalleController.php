<?php

namespace App\Http\Controllers;

use App\Models\Organigrama;
use App\Models\OrganigramaDetalle;
use Exception;
use Illuminate\Http\Request;

class OrganigramaDetalleController extends Controller
{
    //
         public function OrganigramaAñoActivos($anio ,   $idEmpresa ){

                  $orgaDeta =  OrganigramaDetalle::join('organigramas', 'idOrganigrama','=','organigramas.id')
                  ->where('año',$anio )->where('idEmpresa', $idEmpresa)
                  ->where('organigrama_detalles.estatus','=',true)
                  ->select(['organigrama_detalles.id' , 'nombre', 'descripcion'])
                  ->get();
                  return $orgaDeta;
         }



         public function  noAsigandos($anio ,  $idEmpresa){


                $idOrga = OrganigramaDetalle::where('año',$anio  )->where('idEmpresa', $idEmpresa)->where( 'estatus' , true )->select('idOrganigrama');
                $noAsig =   Organigrama::whereNotIn(   'id' , $idOrga  )->where('estatus' , true)->get();
                return  $noAsig ;

         }


         public function crearOrganigrama(Request $request){
            try{
                $orga = new OrganigramaDetalle();
                $orga->fill($request->all());

                $orga->save();

                return response($orga, 200);

            }catch(Exception $e){

                return response($e->getMessage(), 400);
            }

         }
         public function editarOrganigrama(Request $request){

            try{
                $org = OrganigramaDetalle::find($request->id);
                $org->update($request->all());
                return response($org, 200);

            }catch(Exception $e){

                return response($e->getMessage(), 400);
            }

         }

         public function borrarOrganigrama($id){


            try{

                $orga = OrganigramaDetalle::where (  'id', $id)->first();


                $orga->update( array('estatus' => false ) );
                return response($orga, 200);

            }catch(Exception $e){

                return response($e->getMessage(), 400);
            }

        }


}
