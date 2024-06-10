<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use PhpParser\Node\Stmt\TryCatch;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function login(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]   );


        if ($validator->fails()) {
            $errors = $validator->errors();
            return    response()->json( $errors , 422);
        }





        try{

            if ( Auth::attempt(  array('email' => $request->email, 'password' => $request->password) , false)) {


                try {


                    if(User::where('email', $request->email  )->where('estatus', true)->exists()) {
                        $user = User::where('email', $request->email  )->where('estatus', true)->first();


                        $token = $user->createToken('c34g')->accessToken;
                        $response = [
                            'user' => $user,
                            'token' => $token
                        ];

                        return response($response, 201);

                    }else{

                        return response("Usuario no valida", 403);
                    }




                } catch (Exception $e) {

                    return response($e->getMessage(), 403);
                }

            } else {

                return    response()->json(['errors' => ['login'  => ['Los datos son incorrectos']]], 401);
            }

        }catch(Exception $e){

            return    response()->json(['errors' => $e], 402);
        }






    }



    public function logout()
    {
        $user = auth()->user();



        $user->tokens->each(function ($token, $key) {

            $token->delete();
        });


        // $user->tokens;

        return response()->json(['respuesta' => 'Logout exito',   'messager' => 'Adios']);
    }




}
