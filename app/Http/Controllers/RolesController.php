<?php

namespace App\Http\Controllers;

use App\Models\roles;
use App\Models\UserRoles;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RolesController extends Controller
{
    public function rolesUser( $userId ){
        $roles =  roles::select('roles.*')
        ->join('user_roles', 'roles.id', '=', 'user_roles.idRol')
        ->where('user_roles.idUser','=', $userId)
        ->where('user_roles.estatus','=', true)
        ->get();
        return $roles;
    }
    public function roles(){
        return roles::where('estatus','=',true)->orderby('id')->get();
    }
    public function allRoles(){
        return roles::orderby('id')->get();
    }

    public function  quitarRolUsuario($idRol , $idUser  ){
        try{
            UserRoles::where('idRol', '=' , $idRol )->where('idUser', '=' , $idUser )->update(['estatus' => false]);
            return response('Rol actualizado', 200);

        }catch(Exception $e){

            return response($e->getMessage(), 401);
        }

    }

    public function  asignarRolUsuario( $idRol , $idUser ){


        try{
            if (UserRoles::where('idRol', '=' , $idRol )->where('idUser', '=' , $idUser )->where('estatus', '=' , true )->doesntExist()){

                $relacion = new UserRoles();
                $relacion->idUser = $idUser  ;
                $relacion->idRol =   $idRol ;
                $relacion->save();

                return response('Rol asigando', 200);

            }else{

                return response('Rol ya asigando al usuario', 402);
            }
        }catch(Exception $e){

        return response($e->getMessage(), 403);
    }
    }


    public function nuevoRol(Request $request){


        try{
            $roles = new Roles();
            $roles->fill($request->all());

            $roles->save();

            return response($roles, 200);

        }catch(Exception $e){

            return response($e->getMessage(), 400);
        }




    }

    public function editarRol(Request $request){


        try{
            $roles = Roles::find($request->id);
            $roles->update($request->all());
            return response($roles, 200);

        }catch(Exception $e){

            return response($e->getMessage(), 400);
        }

    }

    public function borrarRol($id){


        try{

            $roles = Roles::find($id);

            $roles->estatus =  !$roles->estatus;
            $roles->save();
            return response($roles, 200);

        }catch(Exception $e){

            return response($e->getMessage(), 400);
        }

    }




}
