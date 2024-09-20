<?php 

namespace App\Http\Controllers;

use App\Models\xmlConcepto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class XmlConceptoController extends Controller {
    
    public function guardarConcepto(Request $request){
        $array = $request->all();

        foreach($array as $key => $item){
            $xmlConcepto = new xmlConcepto();

            $xmlConcepto->cantidad = $item['cantidad'];
            $xmlConcepto->descripcion = $item['descripcion'];
            $xmlConcepto->importe = $item['importe'];
            $xmlConcepto->idXmlEgreso = $item['idXmlEgreso'];
            
            $xmlConcepto->save();
        }

        return $xmlConcepto;
    }
}