<?php

namespace App\Http\Controllers;

use App\Models\egresoXml;
use App\Models\empresas;
use App\Models\configuracionEgreso;

use PHPJasper\PHPJasper;
use App\Http\Controllers\UtileriasController;
use App\Models\OrganigramaDetalle;

class ReportesController extends Controller
{

    public function  reporteEgresoSolicitud($idEgreso)
    {




        $xml = egresoXml::find($idEgreso);
        $empresa = empresas::find($xml->idEmpresa);


        $uti =  new  UtileriasController;

        // $xml->fechaFactura=    $uti->fechaLetra($xml->fechaFactura);

        $fechaEntera = strtotime($xml->fechaFactura);
        //  return   $xml->fechaFactura.'---------'.  $uti->fechaLetraDistinta($xml->fechaFactura, '-', 'P2D');
        $fechaLetra  = $uti->fechaLetraDistinta($xml->fechaFactura, '-', 'P2D');

        // return
        $anio = date("Y", $fechaEntera);
        $regi = OrganigramaDetalle::where('idEmpresa', "=",  $xml->idEmpresa)
            ->where('año', "=",  $anio)
            ->where('idOrganigrama', '=', 4)->first();



        $confiEncontrado = configuracionEgreso::where('idEmpresa', '=', $xml->idEmpresa)->where('descripcion', '=',  'jasperIngreso')->count();


        if ($confiEncontrado == 0) {
            $input = base_path() . '/app/report/egresos/solicitud.jrxml';
        } else {
            $configuracion = configuracionEgreso::select('valor')->where('idEmpresa', '=', $xml->idEmpresa)->where('descripcion', '=',  'jasperIngreso')->first();
            $input = base_path() . '/app/report/egresos/' . $configuracion->valor;
        }


        $dire =  strpos(__FILE__, 'app');

        $output = base_path() . '/public/storage/pdf/generados/' . $idEgreso . '-Solicitud';

        $arrayTotal = explode('.', $xml->total);

        $totalLetra = $uti->totalaLetra($arrayTotal[0]);
        $options = [
            'format' => ['pdf'],
            'params' => [
                'municipio' => $empresa->nombre,
                'distrito' => $empresa->distrito,
                'nombre1' => $xml->autorizo,
                'nombre2' => $xml->solicito,
                'nombreFijo' => 'COMISION DE HACIENDA',
                'cargo' =>   $xml->autorizoNombre,
                'cargo2' =>   $xml->solicitoNombre,
                'cargoFijo' =>   'REGIDOR DE HACIENDA',
                'texto1' =>  $xml->descripcion,
                'texto2' =>  $xml->destino,
                'fechaLetra' => $fechaLetra,
                'total' => '$ ' . $xml->total,
                'totalLetra' => $totalLetra . ' pesos '. $arrayTotal[1] . '/100',
                'asunto' => $xml -> asunto,
                'fondo' => substr(__FILE__, 0,   $dire) . 'app\report\egresos\\' . $empresa->nombre . '.png',

            ]
        ];

        $jasper = new PHPJasper;

        $jasper->process(
            $input,
            $output,
            $options
        )->execute();
        // return null;
        return '/storage/pdf/generados/' . $idEgreso . '-Solicitud' . '.pdf';
    }



    public function  reporteEgresoAutorizacion($idEgreso)
    {

        $uti =  new  UtileriasController;


        $xml = egresoXml::find($idEgreso);
        $empresa = empresas::find($xml->idEmpresa);

        $fechaEntera = strtotime($xml->fechaFactura);
        //     $fechaAutorizo = strtotime($fechaEntera."+ 2 days");
        //    $fechaSolicitud = strtotime($fechaEntera."- 2 days");

        $anio = date("Y", $fechaEntera);



        $teso = OrganigramaDetalle::where('idEmpresa', "=",  $xml->idEmpresa)
            ->where('año', "=",  $anio)
            ->where('idOrganigrama', '=', 2)->first();

        $dire =  strpos(__FILE__, 'app');
        $uti =  new  UtileriasController;
        $input = base_path() . '/app/report/egresos/autorizacion.jasper';
        $jdbc_dir = __DIR__ . '/vendor/geekcom/phpjasper/bin/jaspertarter/jdbc';

        $arrayTotal = explode('.', $xml->total);

        $totalLetra = $uti->totalaLetra($arrayTotal[0]);

        $output = base_path() . '/public/storage/pdf/generados/' . $idEgreso . '-Autorizacion';
        $options = [
            'format' => ['pdf'],
            'params' => [
                'municipio' => $empresa->nombre,
                'distrito' => $empresa->distrito,
                'nombre1' => $xml->solicito,
                'nombre2' => $teso->nombre,     // SIMPRE EL TESORERO
                'nombre3' => $xml->autorizo,
                'cargo' =>   $xml->solicitoNombre,
                'cargo2' =>   'TESORERO MUNICIPAL',   //
                'cargo3' =>   $xml->autorizoNombre,   //
                'texto1' =>  $xml->descripcion,
                'texto2' =>  $xml->destino,
                'ramo' =>  $xml->ramo,
                'fecha' =>    $uti->fechaLetraDistinta($xml->fechaFactura, '-', 'P1D'),
                'fecha2' =>    $uti->fechaLetraDistinta($xml->fechaFactura, '-', 'P2D'),
                'total' => '$ ' . $xml->total,
                'anio' => date('Y', strtotime($xml->fechaFactura)),
                'totalLetra' => $totalLetra . ' pesos '. $arrayTotal[1] . '/100',
                'asunto' => $xml -> asunto,
                'fondo' => substr(__FILE__, 0,   $dire) . 'app\report\egresos\\' . $empresa->nombre . '.png',

            ]
        ];

        $jasper = new PHPJasper;

        $jasper->process(
            $input,
            $output,
            $options
        )->execute();




        return '/storage/pdf/generados/' . $idEgreso . '-Autorizacion' . '.pdf';
    }

    public function  reporteRecepcion($idEgreso)
    {

        $uti =  new  UtileriasController;


        $xml = egresoXml::find($idEgreso);
        $empresa = empresas::find($xml->idEmpresa);

        $fechaEntera = strtotime($xml->fechaFactura);
        $fechaLetra  = $uti->fechaLetraDistinta($xml->fechaFactura, '-', 'P0D');
        //     $fechaAutorizo = strtotime($fechaEntera."+ 2 days");
        //    $fechaSolicitud = strtotime($fechaEntera."- 2 days");

        $anio = date("Y", $fechaEntera);



        $teso = OrganigramaDetalle::where('idEmpresa', "=",  $xml->idEmpresa)
            ->where('año', "=",  $anio)
            ->where('idOrganigrama', '=', 2)->first();


        $presi = OrganigramaDetalle::where('idEmpresa', "=",  $xml->idEmpresa)
            ->where('año', "=",  $anio)
            ->where('idOrganigrama', '=', 1)->first();

        $dire =  strpos(__FILE__, 'app');
        $uti =  new  UtileriasController;
        $input = base_path() . '/app/report/egresos/Recepcion2.jasper';
        $jdbc_dir = __DIR__ . '/vendor/geekcom/phpjasper/bin/jaspertarter/jdbc';
        $output = base_path() . '/public/storage/pdf/generados/' . $idEgreso . '-Recepcion';
        $options = [
            'format' => ['pdf'],
            'params' => [
                'municipio' => $empresa->nombre,
                'distrito' => $empresa->distrito,
                'nombre1' => $presi->nombre,
                'nombre2' => $teso->nombre,     // SIMPRE EL TESORERO
                'nombre3' => '',
                'cargo' =>   'PRESIDENTE MUNICIPAL',
                'cargo2' =>   'TESORERO MUNICIPAL',   //
                'cargo3' =>   '',   //
                'texto1' =>  $xml->descripcion,
                'texto2' =>  $xml->destino,
                'fechaLetra' => $fechaLetra,
                'fecha' =>    $uti->fechaLetraDistinta($xml->fechaFactura, '-', 'P1D'),
                'fecha2' =>    $uti->fechaLetraDistinta($xml->fechaFactura, '-', 'P2D'),
                'fondo' => substr(__FILE__, 0,   $dire) . 'app\report\egresos\\' . $empresa->nombreNominativo . '.png',

            ]
        ];

        $jasper = new PHPJasper;

        $jasper->process(
            $input,
            $output,
            $options
        )->execute();




        return '/storage/pdf/generados/' . $idEgreso . '-Recepcion' . '.pdf';
    }
}
