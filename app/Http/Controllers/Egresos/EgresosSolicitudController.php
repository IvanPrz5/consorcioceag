<?php

namespace App\Http\Controllers\Egresos;

use App\Http\Controllers\Controller;
use App\Models\EgresosSolicitud;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;

class EgresosSolicitudController extends Controller
{
    public function solicitudes($idEmpresa, $fecha ){

        $date = Carbon::parse($fecha);
        // $date = Carbon::createFromFormat('Y-m-d', $fecha)->format('Y-m-d');

        return EgresosSolicitud::where('idEmpresa', $idEmpresa)
        ->whereMonth(   'created_at',$date->month )
        ->whereYear('created_at' , $date->year)->orderBy('created_at', 'desc')
        ->get();
    }


    public function crearSolicitud(Request $request){



        $solicitud = new EgresosSolicitud;
        $solicitud->fill($request->all());
        try{
           //  return $solicitud->idEmpresa;
            $folio =  EgresosSolicitud::where('idEmpresa','=', $solicitud->idEmpresa)->max('folio') +1   ;
        }catch(Exception $e){
            $folio = 1;
        }


        $solicitud->folio = $folio;



        $solicitud->estatus = true;

        $solicitud->save();
        return $solicitud;

    }

}
