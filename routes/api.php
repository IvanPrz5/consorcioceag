<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmpresasController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\SistemasController;
use App\Http\Controllers\UserController;

use App\Http\Controllers\Egresos\EgresosSolicitudController;
use App\Http\Controllers\EgresoXmlController;
use App\Http\Controllers\FormatosController;
use App\Http\Controllers\OrganigramaController;
use App\Http\Controllers\OrganigramaDetalleController;
use App\Http\Controllers\ReportesController;
use App\Http\Controllers\UtileriasController;
use App\Models\Formatos;
use App\Models\OrganigramaDetalle;
// use App\Http\Controllers\Egresos\EgresosSolicitudController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/login',  [ AuthController::class , 'login'  ]);
Route::middleware('auth:api')->get('/allUser',  [ AuthController::class , 'allUser'  ]);
Route::middleware('auth:api')->post('/logout',  [ AuthController::class , 'logout'  ]   );


Route::middleware('auth:api')->get('/allEmpresas/{user}',  [ EmpresasController::class , 'index'  ]   );
Route::put('/Empresa/nueva',  [ EmpresasController::class , 'GuardarNuevaEmpresa'  ]   );
Route::put('/Empresa/editar',  [ EmpresasController::class , 'EditarEmpresa'  ]   );



Route::middleware('auth:api')->get('/allSistemas/{user}/{empresa}',  [ SistemasController::class , 'index'  ]   );



Route::middleware('auth:api')->post('/menu/{user}/{sistema}',  [ MenuController::class , 'menu'  ]   );



Route::get('/menu/allMenus',  [ MenuController::class , 'allMenus'  ]   );
Route::get('/menu',  [ MenuController::class , 'menus'  ]   );
Route::post('/menu/nueva',  [ MenuController::class , 'crearMenu'  ]   );
Route::post('/menu/editar',  [ MenuController::class , 'editarMenu'  ]   );
Route::delete('/menu/borrar/{id}',  [ MenuController::class , 'borrarMenu'  ]   );

Route::delete('/menu/eliminar/{id}',  [ MenuController::class , 'eliminarMenu'  ]   );
Route::post('/menu/agregar/{idMenu}/{tipoMenu}/{idDepedencia}/{idRol}',  [ MenuController::class , 'agregarMenu'  ]   );

Route::get('/menu/menuPrincipal/{idRol}',  [ MenuController::class , 'menuPrincipal'  ]   );
Route::get('/menu/subMenuPrincipal/{idRol}/{idMenu}',  [ MenuController::class , 'subMenuPrincipal'  ]   );


// se quito para pruebas sin utentificacion
//Route::middleware('auth:api')->get('/rolesUser/{user}',[RolesController::class,'rolesUser']);


Route::get('/usuarios',  [ UserController::class , 'index'  ]   );
Route::post('/usuarios',  [ UserController::class , 'store'  ]   );
Route::post('/usuariosEditar',  [ UserController::class , 'update'  ]   );
Route::delete('/usuarios/{id}',  [ UserController::class , 'destroy'  ]   );


// Route::resource('usuarios',UserController::class );


// roles
Route::get('/rolesUser/{user}',[RolesController::class,'rolesUser']);
Route::get('/roles',[RolesController::class,'roles']);
Route::get('/allRoles',[RolesController::class,'allRoles']);
Route::post('/roles/nueva',[RolesController::class,'nuevoRol']);
Route::post('/roles/editar',[RolesController::class,'editarRol']);
Route::delete('/roles/borrar/{id}',[RolesController::class,'borrarRol']);




Route::delete('/roles/quitarRol/{idRol}/{idUsuario}',  [ RolesController::class , 'quitarRolUsuario'  ]   );
Route::post('/roles/agregarUsuario/{idRol}/{idUsuario}',  [ RolesController::class , 'asignarRolUsuario'  ]   );

//sistemas
Route::get('/sistemasUser/{user}',[SistemasController::class,'sistemasUser']);
Route::get('/sistemas',[SistemasController::class,'sistemas']);
Route::get('/sistemas/allSistemas',[SistemasController::class,'allSistemas']);
Route::delete('/sistemas/borrar/{id}',[SistemasController::class,'borrarSistema']);
Route::post('/sistemas/actualizarSistemas/{idSistemas}/{idUsuario}/{idEmpresa}',  [ SistemasController::class , 'modificarSistemasUsuario'  ]   );



Route::put('/sistemas/nueva',  [ SistemasController::class , 'guardarNuevoSistema'  ]   );
Route::put('/sistemas/editar',  [ SistemasController::class , 'editarSistema'  ]   );


Route::get('/formatos',[FormatosController::class,'allFormatos']);
Route::get('/formatos/{id}',[FormatosController::class,'Formatos']);
Route::post('/formatos/crearFormato',[FormatosController::class,'crearFormato']);
Route::post('/formatos/editarFormato',[FormatosController::class,'editarFormato']);


Route::get('/allOrganigrama',[OrganigramaController::class,'allOrganigrama']);
Route::delete('/organigrama/borrar/{id}',[OrganigramaController::class,'borrarOrganigrama']);
Route::post('/organigrama/nueva',[OrganigramaController::class,'crearOrganigrama']);
Route::post('/organigrama/editar',[OrganigramaController::class,'editarOrganigrama']);

Route::get('/organigramaActivo/{anio}/{idEmpresa}',[OrganigramaDetalleController::class,'OrganigramaAñoActivos']);
Route::get('/organigramaNoAsignado/{anio}/{idEmpresa}',[OrganigramaDetalleController::class,'noAsigandos']);

Route::post('/crearOrganigramaDetalle',[OrganigramaDetalleController::class,'crearOrganigrama']);
Route::post('/editarOrganigramaDetalle',[OrganigramaDetalleController::class,'editarOrganigrama']);
Route::delete('/borrarOrganigramaDetalle/{id}',[OrganigramaDetalleController::class,'borrarOrganigrama']);







//empresas
Route::get('/empresasUser/{user}',[EmpresasController::class,'empresasUser']);
Route::get('/empresas',[EmpresasController::class,'empresas']);
Route::get('/empresas/allEmpresas',[EmpresasController::class,'allEmpresas']);
Route::delete('/empresas/borrar/{id}',[EmpresasController::class,'borrarEmpresa']);



Route::delete('/empresas/quitarEmpresa/{idEmpresa}/{idUsuario}',  [ EmpresasController::class , 'quitarEmpresasUsuario'  ]   );
Route::post('/empresas/agregarEmpresa/{idEmpresa}/{idUsuario}',  [ EmpresasController::class , 'asignarEmpresasUsuario'  ]   );







Route::get('/egresos/allSolicitudes/{idEmpresa}/{fecha}',[EgresosSolicitudController::class,'solicitudes']);
Route::post('/egresos/crearSolicitud',[EgresosSolicitudController::class,'crearSolicitud']);




Route::get('/egresos/allSolicitudes/{idEmpresa}/{fecha}',[EgresosSolicitudController::class,'solicitudes']);
Route::post('/egresos/crearSolicitud',[EgresosSolicitudController::class,'crearSolicitud']);


Route::get('/egresos/allegresosXml/{mes}/{anio}/{idEmpresa}',[EgresoXmlController::class,'allEgresoXml']);
Route::post('/egresos/agregarEgresoXml',[EgresoXmlController::class,'guardarNuevoEgresoXml']);
Route::post('/egresos/editarEgresoXml',[EgresoXmlController::class,'editarEgresoXml']);
Route::post('/egresos/subirImagen',[EgresoXmlController::class,'subirImagen']);
Route::get('/egresos/listaImagen/{id}',[EgresoXmlController::class,'ListadoFotos']);
Route::delete('/egresos/borrarImagen/{id}',[EgresoXmlController::class,'borrarFotos']);



Route::get('/meses',[UtileriasController::class,'meses']);
Route::get('/años',[UtileriasController::class,'años']);
Route::post('/xmlArray',[UtileriasController::class,'xmlArray']);




Route::get('/reporteEgresoSolicitud/{idEgreso}',[ReportesController::class,'reporteEgresoSolicitud']);
Route::get('/reporteEgresoAutorizacion/{idEgreso}',[ReportesController::class,'reporteEgresoAutorizacion']);
Route::get('/reporteRecepcion/{idEgreso}',[ReportesController::class,'reporteRecepcion']);
