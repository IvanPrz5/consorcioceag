<?php

namespace App\Http\Controllers;

use DateInterval;
use DateTime;
use Exception;
use Illuminate\Http\Request;
use NumberFormatter;

class UtileriasController extends Controller
{

    public function totalaLetra($valor)
    {
        $formatterES = new NumberFormatter("es_MX", NumberFormatter::SPELLOUT);
        return $formatterES->format($valor); 
    }


    public  function meses()
    {
        $meses = array(
            ["id" => 1, "mes" => "ENERO"],
            ["id" => 2, "mes" => "FEBRERO"],
            ["id" => 3, "mes" => "MARZO"],
            ["id" => 4, "mes" => "ABRIL"],
            ["id" => 5, "mes" => "MAYO"],
            ["id" => 6, "mes" => "JUNIO"],
            ["id" => 7, "mes" => "JULIO"],
            ["id" => 8, "mes" => "AGOSTO"],
            ["id" => 9, "mes" => "SEPTIEMBRE"],
            ["id" => 10, "mes" => "OCTUBRE"],
            ["id" => 11, "mes" => "NOVIEMBRE"],
            ["id" => 12, "mes" => "DICIEMBRE"],

        );
        return  $meses;
    }


    // function to append a string 
    public function append_string ($str1, $str2) {
        
        // Using Concatenation assignment
        // operator (.=)
        $str1 .=$str2;
        
        // Returning the result 
        return $str1;
    }

    public function fechaLetra($fecha)
    {

        $fecha = $fecha;
        $fechaEntera = strtotime($fecha);
        $anio = date("Y", $fechaEntera);
        $mes = date("m", $fechaEntera);
        $dia = date("d", $fechaEntera);

        $fechaLetra = '' . $dia;


        $meses = $this->meses();

        foreach ($meses as $mesBuscar) {


            if ($mesBuscar['id'] =   $mes) {
                $fechaLetra = $fechaLetra . ' DE '  .   $mesBuscar['mes']   .   ' ' . $anio;
                break;
            }
        }

        return $fechaLetra;
    }


    public function fechaLetraDistinta($fecha, $tipo,  $sumar)
    {


        $fechaDate = date("Y-m-d", strtotime($fecha));



        $fechaEntera = new DateTime($fecha);


        if ($tipo ==  '+') {
            $yesterdayTime = $fechaEntera->add(new DateInterval($sumar));
        } else {
            $yesterdayTime = $fechaEntera->sub(new DateInterval($sumar));
        }


        $fechaDate =   strtotime($yesterdayTime->format('Y-m-d'));


        //  return $yesterdayTime->format('Y-m-d');

        $anio = date("Y", $fechaDate);
        $mes = date("m", $fechaDate);
        $dia = date("d", $fechaDate);




        $fechaLetra = '' . $dia;


        $meses = $this->meses();



        foreach ($meses as $mesBuscar) {


            if ($mesBuscar['id'] ==   $mes) {

                $fechaLetra = $fechaLetra . ' DE '  .   $mesBuscar['mes']   .   ' ' . $anio;
                break;
            }
        }
        //  return $anio.'-'.$mes.'-'.$dia.'  ***'.$busca.'***  '.$fechaLetra;
        return $fechaLetra;
    }




    public  function años()
    {
        $años = array();


        for ($i =  (date("Y") - 3); $i <=  date("Y"); $i++) {
            $años[] =  ["id" => $i, "año" => $i];
        }
        return  $años;
    }

    public function xmlArray(Request $request)
    {
        $xml = $request->file('xml');
        return $this->LeerXml($xml);
    }

    protected function  LeerXml($filex)
    {



        error_reporting(E_ALL ^ E_NOTICE);
        try {
            $xmlObj = new xmlReturn();
            $xmlArray = array();

            $tipoDeComprobante  = "";

            $xml = simplexml_load_file($filex);



            $ns = $xml->getNamespaces(true);
            $xml->registerXPathNamespace('cfdi', $ns['cfdi']);
            $xml->registerXPathNamespace('tfd', $ns['tfd']);



            foreach ($xml->xpath('//cfdi:Comprobante') as $cfdiComprobante) {



                $xmlObj->fecha =  $cfdiComprobante['Fecha']->__toString();
                $xmlObj->total =  number_format($cfdiComprobante['Total']->__toString(), 2);
                $xmlObj->subTotal = $cfdiComprobante['SubTotal']->__toString();
                $xmlObj->descuento = $cfdiComprobante['Descuento'];

                if ($xmlObj->descuento == null) {
                    $xmlObj->descuento = "0.00";
                }
            }




            foreach ($xml->xpath('//cfdi:Comprobante//cfdi:Emisor') as $Emisor) {

                $xmlObj->emisorRfc = $Emisor['Rfc']->__toString();
                $xmlObj->emisorNombre  = $Emisor['Nombre']->__toString();
                $xmlObj->emisorRegimen  = $Emisor['RegimenFiscal']->__toString();
            }


            foreach ($xml->xpath('//cfdi:Comprobante//cfdi:Receptor') as $Receptor) {

                $xmlObj->receptorRfc = $Receptor['Rfc']->__toString();
                $xmlObj->receptorNombre  = $Receptor['Nombre']->__toString();
                // dd($xmlObj->receptorRfc);
            }


            // CONCEPTOS


            foreach ($xml->xpath('//cfdi:Comprobante//cfdi:Conceptos//cfdi:Concepto') as $concepto) {
                $xmlObj->concepto = $xmlObj->concepto . '' . $concepto['Cantidad']->__toString()  . ' ' . $concepto['Descripcion']->__toString() . ', '  ;
                array_push($xmlObj->arrayCantidad, $concepto['Cantidad']->__toString());
                array_push($xmlObj->arrayDescripcion, $concepto['Descripcion']->__toString());
                array_push($xmlObj->arrayImporte, $concepto['Importe']->__toString());
            }








            foreach ($xml->xpath('//tfd:TimbreFiscalDigital') as $tfd) {
                $xmlObj->fechaTimbrado = $tfd['FechaTimbrado']->__toString();
                $xmlObj->uuid = $tfd['UUID']->__toString();
            }


            return    json_encode($xmlObj);
        } catch (Exception  $th) {


            return "no " . $th->getMessage();
        }
    }
}

class xmlReturn
{
    public $fecha;
    public $total;
    public $subTotal;
    public $descuento;

    public $emisorRfc;
    public $emisorNombre;
    public $emisorRegimen;

    public $receptorRfc;
    public $receptorNombre;
    public $fechaTimbrado;
    public $uuid;
    public $concepto  = '';
    public $arrayCantidad = [];
    public $arrayDescripcion = [];
    public $arrayImporte = [];
}
