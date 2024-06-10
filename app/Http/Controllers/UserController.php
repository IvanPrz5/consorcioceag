<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       return User::orderByDesc('id')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            $user = new User();
            $user->fill($request->all());
            $user->save();
            return $user ;
        } catch (Exception $e) {

            return response($e->getMessage(), 403);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        try{


            $salida = User::find( $request->id);





                $salida->update([
                'nombre'  => $request->nombre ,
                'materno' => $request->materno,
                'paterno' => $request->paterno,
                'estatus' => $request->estatus,
               ]);


               if (!$request->password == ''){
                $salida->update([
                    'password' => Hash::make($request->password)
                   ]);

               }



            return   response($salida, 200); ;


        } catch (Exception $e) {

            return response($e->getMessage(), 403);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user  = User::find($id);

        $user->estatus =  !$user->estatus ;

        $user->save();

        return response( 'OK ACTUALIZACION', 200);
    }
}
