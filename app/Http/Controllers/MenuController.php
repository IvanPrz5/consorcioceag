<?php

namespace App\Http\Controllers;

use App\ClasesPropias\menuClass as ClasesPropiasMenuClass;
use App\Models\menu;
use App\Models\roles;
use App\Models\subMenu;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use PhpParser\Node\Expr\Cast\Object_;
use Symfony\Component\VarDumper\Cloner\Data;

class MenuController extends Controller
{
    public function menu( $user, $sistema  ){

        $roles = new RolesController(); // ->roles($user);
        $rolBuscar = $roles->rolesUser($user);
        $inroles = array();
        foreach($rolBuscar  as $roleTem){
            $inroles[] =  $roleTem->id;
        }

        $menus =  DB::table('sub_menus')
        ->join('menus', 'sub_menus.idMenu', '=', 'menus.id')
        ->select('menus.*')
        ->where('sub_menus.idTipoMenu','=','1')
        ->wherein('sub_menus.idRol',$inroles )
        ->where('menus.id_sistema','=',$sistema)
        ->where('menus.estatus','=',TRUE)
        ->where('sub_menus.estatus', true)
        ->get();


        $menurray =  array();
        $i = 0 ;
        $y = 0;
        foreach ( $menus as $menu ) {
            $i = $i +1;
            $men = new menuClass();
            $men->id = $i;
            $men->name = $menu->descripcion;
            $men->icono = $menu->icono;
            $men->ruta = $menu->ruta;


            $submenus =  DB::table('sub_menus')
            ->join('menus', 'sub_menus.idMenu', '=', 'menus.id')
            ->select('menus.*')
            ->where('sub_menus.idTipoMenu','=','2')
            //->where('menus.id_sistema','=',$sistema)
            ->where('sub_menus.idMenuDepende','=',$menu->id)
            ->where('menus.estatus','=',TRUE)
            ->where('sub_menus.estatus', true)
            ->get();

            $submenurray = array();
            $y = $i *10;
            foreach( $submenus as $subMenu){
                $y= $y +1 ;
                $submen = new menuClass();
                $submen->id = $y;
                $submen->name = $subMenu->descripcion;
                $submen->icono = $subMenu->icono;
                $submen->ruta = $subMenu->ruta;
                $submenurray[] = (array)$submen;
            }
            $men->children = $submenurray ;
            array_push($menurray, $men);
        }
        return  $menurray ;

    }




    public function  allMenus () {
        return menu::select('menus.*', 'sistemas.nombre as sistema_nombre' , 'sistemas.id as sistemas_id')
        ->JOIN('sistemas' , "menus.id_sistema","=","sistemas.id"     )
        ->orderby('menus.id')->get();
    }
    public function  menus () {
        return menu::select('menus.*', 'sistemas.nombre as sistema_nombre' , 'sistemas.id as sistemas_id')
        ->JOIN('sistemas' , "menus.id_sistema","=","sistemas.id"     )
        ->where('sistemas.estatus', true)
        ->orderby('menus.id')->get();
    }
    public function crearMenu(Request $request){

       try {

            $menu = new Menu();
            $menu->fill(  $request->all()  );
            $menu->save();
            return response( $menu , 200);

       }catch ( Exception $e ) {
        return response($e->getMessage(), 403);
       }



    }
    public function editarMenu(Request $request){

        try {

            $menu = Menu::find($request->id);
            $menu->update(  $request->all()  );
            return response( $menu , 200);

       }catch ( Exception $e ) {
        return response($e->getMessage(), 403);
       }

    }

    public function borrarMenu($id){


        try {

            $menu = Menu::find($id);
            $menu->estatus =  !$menu->estatus;
            $menu->save();
            return response( $menu , 200);

       }catch ( Exception $e ) {
        return response($e->getMessage(), 403);
       }


    }

    public  function menuPrincipal( $idRol ){




        $menuPrincipal = subMenu::select('menus.id as id',  'sub_menus.id as idRelacion',   'menus.descripcion as descripcion' , 'menus.icono as icono' , 'sistemas.nombre as sistema'  )
        ->join('menus', 'sub_menus.idMenu', '=', 'menus.id')
        ->join( 'sistemas', 'sistemas.id', '=', 'menus.id_sistema'   )
        ->where('sub_menus.idTipoMenu','=','1')
        ->where('sub_menus.idRol',$idRol )
        ->where('sub_menus.estatus', true)
        ->where('menus.estatus','=',TRUE)
        ->get();


        return $menuPrincipal;

    }
    public  function subMenuPrincipal( $idRol , $idMenu ){




        $menuPrincipal = subMenu::select('menus.id as id', 'sub_menus.id as idRelacion','menus.descripcion as descripcion' , 'menus.icono as icono' , 'sistemas.nombre as sistema'  )
        ->join('menus', 'sub_menus.idMenu', '=', 'menus.id')
        ->join( 'sistemas', 'sistemas.id', '=', 'menus.id_sistema'   )
        ->where('sub_menus.idTipoMenu','=','2')
        ->where('sub_menus.idRol',$idRol )
        ->where('sub_menus.idMenuDepende',$idMenu)
        ->where('sub_menus.estatus', true)
        ->where('menus.estatus','=',TRUE)
        ->get();


        return $menuPrincipal;

    }
    public function agregarMenu($idMenu , $tipoMenu , $idDepedencia , $idRol ){

        try{


            $subMenu = new subMenu();
            $subMenu->idMenu =  $idMenu;
            $subMenu->idTipoMenu =  $tipoMenu;

            if($idDepedencia != 0 ){
                $conse =  subMenu::max('consecutivo');

                $subMenu->idMenuDepende =  $idDepedencia;
                $subMenu->consecutivo =   1 ; // subMenu::max('consecutivo')->where(  'idMenuDependencia', $idDepedencia  )->where( 'idTipoMenu' , 2 );

            }else{

                $subMenu->consecutivo = 1 ;//  subMenu::max('consecutivo')->where(  'idRol', $idRol  )->where( 'idTipoMenu' , 1 );

            }

            $subMenu->idRol =  $idRol;

            $subMenu->save();


            return $subMenu;

        }catch(Exception $e){
            return response($e->getMessage(), 403);
        }



    }
    public function eliminarMenu($id){


        try {

            $menu = subMenu::find($id);
            $menu->estatus =  false;
            $menu->save();
            return response( $menu , 200);

       }catch ( Exception $e ) {
        return response($e->getMessage(), 403);
       }

    }



}
class menuClass
{
    public $id ;
    public $name ;
    public $icono ;
    public $ruta ;
    public $children  = array() ;
}
