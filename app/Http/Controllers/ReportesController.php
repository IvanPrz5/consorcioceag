<?php

namespace App\Http\Controllers;

use App\Models\egresoXml;
use App\Models\empresas;
use App\Models\configuracionEgreso;
use App\Models\Organigrama;

use PHPJasper\PHPJasper;
use App\Http\Controllers\UtileriasController;
use App\Models\OrganigramaDetalle;
use App\Models\xmlConcepto;
use Illuminate\Support\Facades\Log;

class ReportesController extends Controller
{


    public function  reporteEgresoSolicitud($idEgreso)
    {




        $xml = egresoXml::find($idEgreso);
        $empresa = empresas::find($xml->idEmpresa);

        $xmlConcepto = xmlConcepto::where('idXmlEgreso', '=', $idEgreso)->get();


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
            $input = base_path() . '/app/report/egresos/SolicitudV2.jasper';
        } else {
            $configuracion = configuracionEgreso::select('valor')->where('idEmpresa', '=', $xml->idEmpresa)->where('descripcion', '=',  'jasperIngreso')->first();
            $input = base_path() . '/app/report/egresos/' . $configuracion->valor;
        }

        $dire =  strpos(__FILE__, 'app');

        $output = base_path() . '/public/storage/pdf/generados/' . $idEgreso . '-Solicitud';

        $arrayTotal = explode('.', $xml->total);

        $totalLetra = $uti->totalaLetra($arrayTotal[0]);

        /* 
            Funcion para hacer saltos de linea
            ya que no se encuentra libreria para
            fields en jasper report con php
        */
        $array = array();
        $array2 = array();
        foreach($xmlConcepto->all() as $key => $item){

            $trozosReferencia = str_split($item['descripcion'], 68);
            $numLineas = count($trozosReferencia);

            $saltoLinea = str_repeat("saltoLinea", $numLineas);

            $descripcionConSalto = implode("saltoLinea", $trozosReferencia);
            
            array_push($array, $item['cantidad'] .= $saltoLinea);
            array_push($array2, $descripcionConSalto);
        }


        $teso = OrganigramaDetalle::where('idEmpresa', "=",  $xml->idEmpresa)
        ->where('año', "=",  $anio)
        ->where('idOrganigrama', '=', 2)->first();

        $presi = OrganigramaDetalle::where('idEmpresa', "=",  $xml->idEmpresa)
            ->where('año', "=",  $anio)
            ->where('idOrganigrama', '=', 1)
            ->first();

        $options = [
            'format' => ['pdf'],
            'params' => [
                'municipio' => $empresa->nombre,
                'distrito' => $empresa->distrito,
                'nombre1' => $teso->nombre,
                'nombre2' => $presi->nombre,
                //'nombreFijo' => 'COMISION DE HACIENDA',
                'cargo' =>   'TESORERO MUNICIPAL',
                'cargo2' =>  'PRESIDENTE MUNICIPAL',
                //'cargoFijo' =>   'REGIDOR DE HACIENDA',
                'texto1' =>  $xml->descripcion,
                'texto2' =>  $xml->destino,
                'fecha' => $fechaLetra,
                'total' => '$ ' . $xml->total,
                'totalLetra' => $totalLetra . ' pesos '. $arrayTotal[1] . '/100',
                'asunto' => $xml -> asunto,
                
                //'fondo' => substr(__FILE__, 0,   $dire) . 'app\report\egresos\\' . $empresa->nombre . '.png',
                'headerImg' => substr(__FILE__, 0,   $dire) . 'app\report\egresos\\' . $empresa->nombre . 'HEADER.png',
                'footerImg' => substr(__FILE__, 0,   $dire) . 'app\report\egresos\\' . $empresa->nombre . 'FOOTER.png',
                
                'cantidad' => implode("endString", $array),
                'descripcion' => implode("endString", $array2),
                'numOficio' => $xml->numOficio,
            ],
           /*  'db_connection' => [
                'driver' => 'mysql', //mysql, ....
                'username' => 'root',
                'password' => 'Qazxsw2',
                'host' => '127.0.0.1',
                'database' => 'consorcioceag',
                'port' => '3306'
            ] */
        ];

        $jasper = new PHPJasper;

        $jasper->process(
            $input,
            $output,
            $options,
        )->execute();
        //return $array;
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
            ->where('idOrganigrama', '=', 2)
            ->first();



        $presi = OrganigramaDetalle::where('idEmpresa', "=",  $xml->idEmpresa)
            ->where('año', "=",  $anio)
            ->where('idOrganigrama', '=', 1)
            ->first();

        $cargoteso = Organigrama::where('id', "=",  $teso->idOrganigrama)
            ->first();

        $dire =  strpos(__FILE__, 'app');
        $uti =  new  UtileriasController;
        $input = base_path() . '/app/report/egresos/AutorizacionV2.jasper';
        $jdbc_dir = __DIR__ . '/vendor/geekcom/phpjasper/bin/jaspertarter/jdbc';

        $arrayTotal = explode('.', $xml->total);

        $totalLetra = $uti->totalaLetra($arrayTotal[0]);

        $output = base_path() . '/public/storage/pdf/generados/' . $idEgreso . '-Autorizacion';
        $options = [
            'format' => ['pdf'],
            'params' => [
                'municipio' => $empresa->nombre,
                'distrito' =>  ' ' . $empresa->distrito,
                'nombre1' =>  $presi->nombre,
                'nombre2' => $teso->nombre,     // SIMPRE EL TESORERO
                'nombre3' => $xml->solicito,
                'cargo' =>   'PRESIDENTE MUNICIPAL',
                'cargo2' =>  $cargoteso->descripcion,   //
                'cargo3' =>   $xml->solicitoNombre, //
                'texto1' =>  $xml->descripcion,
                'texto2' =>  $xml->destino,
                'ramo' =>  $xml->ramo,
                'fecha' =>    $uti->fechaLetraDistinta($xml->fechaFactura, '-', 'P1D'),
                'fecha2' =>    $uti->fechaLetraDistinta($xml->fechaFactura, '-', 'P2D'),
                'total' => '$ ' . $xml->total,
                'anio' => date('Y', strtotime($xml->fechaFactura)),
                'totalLetra' => $totalLetra . ' pesos '. $arrayTotal[1] . '/100',
                'asunto' => $xml -> asunto,
                 //'fondo' => substr(__FILE__, 0,   $dire) . 'app\report\egresos\\' . $empresa->nombre . '.png',
                 'headerImg' => substr(__FILE__, 0,   $dire) . 'app\report\egresos\\' . $empresa->nombre . 'HEADER.png',
                 'footerImg' => substr(__FILE__, 0,   $dire) . 'app\report\egresos\\' . $empresa->nombre . 'FOOTER.png',
                 
                'numOficio' => $xml->numOficio,

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

    public function  reporteEgresoRecepcion($idEgreso)
    {

        $uti =  new  UtileriasController;


        $xml = egresoXml::find($idEgreso);
        $empresa = empresas::find($xml->idEmpresa);

        $fechaEntera = strtotime($xml->fechaFactura);
        $fechaLetra  = $uti->fechaLetraDistinta($xml->fechaFactura, '-', 'P0D');
        //     $fechaAutorizo = strtotime($fechaEntera."+ 2 days");
        //    $fechaSolicitud = strtotime($fechaEntera."- 2 days");

        $anio = date("Y", $fechaEntera);

        $fechaLetra  = $uti->fechaLetraDistinta($xml->fechaFactura, '-', 'P2D');

        /* 
            Funcion para hacer saltos de linea
            ya que no se encuentra libreria para
            fields en jasper report con php
        */
        $xmlConcepto = xmlConcepto::where('idXmlEgreso', '=', $idEgreso)->get();

        $array = array();
        $array2 = array();
        foreach($xmlConcepto->all() as $key => $item){

            $trozosReferencia = str_split($item['descripcion'], 68);
            $numLineas = count($trozosReferencia);

            $saltoLinea = str_repeat("saltoLinea", $numLineas);

            $descripcionConSalto = implode("saltoLinea", $trozosReferencia);
            
            array_push($array, $item['cantidad'] .= $saltoLinea);
            array_push($array2, $descripcionConSalto);
        }


        $teso = OrganigramaDetalle::where('idEmpresa', "=",  $xml->idEmpresa)
            ->where('año', "=",  $anio)
            ->where('idOrganigrama', '=', 2)->first();


        $presi = OrganigramaDetalle::where('idEmpresa', "=",  $xml->idEmpresa)
            ->where('año', "=",  $anio)
            ->where('idOrganigrama', '=', 1)->first();

        $arrayTotal = explode('.', $xml->total);
        $totalLetra = $uti->totalaLetra($arrayTotal[0]);

        $dire =  strpos(__FILE__, 'app');
        $uti =  new  UtileriasController;
        $input = base_path() . '/app/report/egresos/RecepcionV3.jasper';
        $jdbc_dir = __DIR__ . '/vendor/geekcom/phpjasper/bin/jaspertarter/jdbc';
        $output = base_path() . '/public/storage/pdf/generados/' . $idEgreso . '-Recepcion';
        
        $horaAux  = explode('T', $xml->fechaLlegada);

        $fechaDividad = explode("-", $horaAux[1]);
        $meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];


        $horaDividad = explode(":", $horaAux[0]);
        $horaSumada = (int) $horaDividad[0] + 2;

        $options = [
            'format' => ['pdf'],
            'params' => [
                'municipio' => $empresa->nombre,
                'distrito' => $empresa->distrito,
                'nombre1' => $teso->nombre,
                'nombre2' => $xml->solicito,
                //'nombreFijo' => 'COMISION DE HACIENDA',
                'cargo' =>   $xml->autorizoNombre,
                'cargo2' =>   $xml->solicitoNombre,
                //'cargoFijo' =>   'REGIDOR DE HACIENDA',
                'calle' =>  $empresa->calle,
                'numero' =>  $empresa->numExt,
                'codigoPostal' =>  $empresa->cp,

                'hora' =>  $horaAux[0],
                'dia' => $fechaDividad[2],
                'mesLetra' =>  strtoupper($meses[$fechaDividad[1] - 1]),
                'anio' =>  $fechaDividad[0],
                'horaSalida' => $horaSumada . ':34',

                'personaMoral' =>  $xml->personaMoral,
                'representanteLegal' => $xml->representanteLegal,

                'fecha' => $fechaLetra,
                'total' => '$ ' . $xml->total,
                'totalLetra' => $totalLetra . ' pesos '. $arrayTotal[1] . '/100',
                'asunto' => $xml -> asunto,
                
                
                //'fondo' => substr(__FILE__, 0,   $dire) . 'app\report\egresos\\' . $empresa->nombre . '.png',
                'headerImg' => substr(__FILE__, 0,   $dire) . 'app\report\egresos\\' . $empresa->nombre . 'HEADER.png',
                'footerImg' => substr(__FILE__, 0,   $dire) . 'app\report\egresos\\' . $empresa->nombre . 'FOOTER.png',
                
                
                'cantidad' => implode("endString", $array),
                'descripcion' => implode("endString", $array2),
            ],
           /*  'db_connection' => [
                'driver' => 'mysql', //mysql, ....
                'username' => 'root',
                'password' => 'Qazxsw2',
                'host' => '127.0.0.1',
                'database' => 'consorcioceag',
                'port' => '3306'
            ] */
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
