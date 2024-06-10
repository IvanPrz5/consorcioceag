<?php

namespace App\Http\Controllers;

use App\Models\sistemas;
use App\Models\UserSistemas;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class SistemasController extends Controller
{

    public function index($user , $empresa){
       //  return 'asdas';
        return DB::table('user_sistemas')
        ->join('sistemas', 'sistemas.id', '=', 'user_sistemas.idSistema'    )
        ->join('empresas_users', 'empresas_users.idUser', '=', 'user_sistemas.idUser'   )
        ->select('sistemas.*')
        ->where('empresas_users.idUser','=',$user)
        ->where('empresas_users.idEmpresa','=',$empresa)
        ->where('user_sistemas.idEmpresa','=',$empresa)
        ->where('empresas_users.estatus','=',TRUE)
        ->where('user_sistemas.estatus','=',TRUE)
        ->get();

    }


    public function sistemasUser( $userId ){



        $sistemaMunicipio = UserSistemas::select(  'idSistema', 'idEmpresa'      )
                            ->where(  'idUser'  ,'=', $userId )
                            ->where(  'estatus'  , true )
                            ->get();


        $sisMunTotal = array();
        foreach($sistemaMunicipio  as $sisMun){
            $sisMunTotal[] =  $sisMun->idSistema.','.$sisMun->idEmpresa;
        }


        return $sisMunTotal;


    }




    public function sistemas(){
        return sistemas::where('estatus','=',true)->get();
    }

    public function allSistemas(){
        return sistemas::orderby('id')->get();
    }


    public function  quitarSistemasUsuario($idSistema , $idUser  ){
        try{
            UserSistemas::where('idSistema', '=' , $idSistema )->where('idUser', '=' , $idUser )->update(['estatus' => false]);
            return response('Sistema actualizado', 200);

        }catch(Exception $e){

            return response($e->getMessage(), 401);
        }

    }

    public function guardarNuevoSistema(Request $request){


        // return $request->all();
        if($request->hasFile('imagenFile')){

            $urlLogo = $request->imagenFile->store('public/sistemas/logos');
            $urlLogo = Storage::url($urlLogo); //para poder  obtener url y mostara en publico

        }else{

            $urlLogo = '/' ;
        }





        $sistema = new sistemas();
        $sistema->fill($request->all());
        $sistema->imagen = $urlLogo ;
        // $sistema->descripcion = $request->descripcion;
        $sistema->imagen= $urlLogo;
        $sistema->save();

        return $sistema;



    }

    public function editarSistema(Request $request){

        $sistemaOriginal =  sistemas::find($request->id);

        // return $request->all();
        if($request->hasFile('imagenFile')){

            $urlLogo = $request->imagenFile->store('public/sistemas/logos');
            $urlLogo = Storage::url($urlLogo); //para poder  obtener url y mostara en publico

        }else{

            $urlLogo = $sistemaOriginal->imagen ;
        }


        $sistema = new sistemas();
        $sistema->fill($request->all());
        $sistema->imagen = $urlLogo ;

        $sistema->imagen= $urlLogo;

        $sistemaOriginal->update($sistema->toArray());

        return $sistema;


    }


    public function  modificarSistemasUsuario( $idSistema, $idUser , $idEmpresa ){



        try{




           $userSistemas =   UserSistemas::
            where('idSistema', $idSistema )
           ->where('idUser' , $idUser )
           ->where('idEmpresa', $idEmpresa )
           ->where('estatus', true ) ;

            if ($userSistemas->doesntExist()){

                $relacion = new UserSistemas();
                $relacion->idUser    =   $idUser  ;
                $relacion->idSistema =   $idSistema ;
                $relacion->idEmpresa = $idEmpresa ;
                $relacion->save();

                return response('Sistema asigando', 200);

            }else{

              $userSistemas =   UserSistemas::where('idSistema', '=' , $idSistema )
                            ->where('idUser', '=' , $idUser )
                            ->where('idEmpresa', '=' , $idEmpresa )
                            ->where('estatus', '=' , true ) ;

                            $userSistemas->update(  [ 'estatus'  => false  ]   ) ;



               return response('Sistema eliminado', 200);
            }
        }catch(Exception $e){

        return response($e->getMessage(), 403);
    }



    }


    public function borrarSistema($id){

        try{

            $sistemas = Sistemas::find($id);

            $sistemas->estatus =  !$sistemas->estatus;
            $sistemas->save();
            return response($sistemas, 200);

        }catch(Exception $e){

            return response($e->getMessage(), 400);
        }


    }



}
