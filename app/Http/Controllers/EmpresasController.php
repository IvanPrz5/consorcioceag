<?php

namespace App\Http\Controllers;

use App\Models\empresas;
use App\Models\empresasUser;
use Exception;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class EmpresasController extends Controller
{
    public function index($user){

        return DB::table('empresas')
        ->join('empresas_users', 'idEmpresa', '=', 'empresas.id')
        ->select('empresas.*')
        ->where('empresas_users.idUser','=',$user)
        ->where('empresas_users.estatus','=',TRUE)
        ->where('empresas.estatus','=',TRUE)

        ->get();
        // return empresas::all();

    }
    public function GuardarNuevaEmpresa(Request $request){




        if($request->hasFile('logoArchivo')){

            $urlLogo = $request->logoArchivo->store('public/empresas/logos');
            $urlLogo = Storage::url($urlLogo); //para poder  obtener url y mostara en publico

        }else{

            $urlLogo = '' ;
        }
        if($request->hasFile('cerArchivo')){

            $file = new File($request->cerArchivo);
            $fileHash = str_replace('.' . $file->extension(), '', $file->hashName());
            $fileName = $fileHash . '.' . $request->file('cerArchivo')->getClientOriginalExtension();
            $urlCer = Storage::putFileAs('empresas/sat/'.$request->rfc, $file, $fileName);
        }else{
            $urlCer =  '';
        }

        if($request->hasFile('keyArchivo')){
            $file = new File($request->keyArchivo);
            $fileHash = str_replace('.' . $file->extension(), '', $file->hashName());
            $fileName = $fileHash . '.' . $request->file('keyArchivo')->getClientOriginalExtension();
            $urlKey = Storage::putFileAs('empresas/sat/'.$request->rfc, $file, $fileName);
        }else{
            $urlKey = '' ;

        }

        $empre = new empresas();
        $empre->fill( $request->all());
        $empre->logo =   $urlLogo;
        $empre->cer =    $urlCer ;
        $empre->key = $urlKey;



        if($empre->estatus){
            $empre->estatus = 1 ;
        }else{
            $empre->estatus = 0 ;
        }

        $empre->save();

        return  $empre;


    }


    public function EditarEmpresa(Request $request ){




        if($request->hasFile('logoArchivo')){

            $urlLogo = $request->logoArchivo->store('public/empresas/logos');
            $urlLogo = Storage::url($urlLogo); //para poder  obtener url y mostara en publico

        }else{

            $urlLogo = '' ;
        }
        if($request->hasFile('cerArchivo')){

            $file = new File($request->cerArchivo);
            $fileHash = str_replace('.' . $file->extension(), '', $file->hashName());
            $fileName = $fileHash . '.' . $request->file('cerArchivo')->getClientOriginalExtension();
            $urlCer = Storage::putFileAs('empresas/sat/'.$request->rfc, $file, $fileName);
        }else{
            $urlCer =  '';
        }

        if($request->hasFile('keyArchivo')){
            $file = new File($request->keyArchivo);
            $fileHash = str_replace('.' . $file->extension(), '', $file->hashName());
            $fileName = $fileHash . '.' . $request->file('keyArchivo')->getClientOriginalExtension();
            $urlKey = Storage::putFileAs('empresas/sat/'.$request->rfc, $file, $fileName);
        }else{
            $urlKey = '' ;

        }



        $updateEmpresa = empresas::find($request->id);

         $empresaOriginal =new  empresas() ;//::find($request->id);

         $empresaOriginal->fill( $request->all()  );



        if($urlLogo != ''){
            $empresaOriginal->logo =   $urlLogo;
        }else{
            $empresaOriginal->logo =   $updateEmpresa->logo;
        }


        if($urlCer != ''){
            $empresaOriginal->cer =    $urlCer ;
        }else{
            $empresaOriginal->cer =  $updateEmpresa->cer ;
        }

        if($urlKey != ''){
            $empresaOriginal->key = $urlKey;
        }else{
            $empresaOriginal->key =$updateEmpresa->key;
        }



        $updateEmpresa->update($empresaOriginal->toArray());





        return  $updateEmpresa;

    }



    public function empresasUser( $userId ){
        $sistemas =  empresas::select('empresas.*')
        ->join('empresas_users', 'empresas.id', '=', 'empresas_users.idEmpresa')
        ->where('empresas_users.idUser','=', $userId)
        ->where('empresas_users.estatus','=', true)
        ->get();
        return $sistemas;
    }
    public function empresas(){
        return empresas::where('estatus','=',true)->orderBy('id')->get();
    }

    public function allEmpresas(){
        return empresas::orderBy('id')->get();
    }



    public function  quitarEmpresasUsuario($idEmpresa , $idUser  ){
        try{
            empresasUser::where('idEmpresa', '=' , $idEmpresa )->where('idUser', '=' , $idUser )->update(['estatus' => false]);
            return response('Empresa actualizado', 200);

        }catch(Exception $e){

            return response($e->getMessage(), 401);
        }

    }


    public function  asignarEmpresasUsuario( $idEmpresa, $idUser ){


        try{
            if (empresasUser::where('idEmpresa', '=' , $idEmpresa )->where('idUser', '=' , $idUser )->where('estatus', '=' , true )->doesntExist()){

                $relacion = new empresasUser();
                $relacion->idUser    =   $idUser  ;
                $relacion->idEmpresa =   $idEmpresa ;
                $relacion->save();

                return response('Empresa asignada', 200);

            }else{

                return response('Empresa ya asigando al usuario', 402);
            }
        }catch(Exception $e){

        return response($e->getMessage(), 403);
    }


    }


    public function borrarEmpresa($id) {

        try{

            $empresa = empresas::find($id);

            $empresa->estatus =  !$empresa->estatus;
            $empresa->save();
            return response($empresa, 200);

        }catch(Exception $e){

            return response($e->getMessage(), 400);
        }


    }



}
