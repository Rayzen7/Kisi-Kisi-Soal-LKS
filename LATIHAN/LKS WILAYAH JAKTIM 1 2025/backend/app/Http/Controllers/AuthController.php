<?php

namespace App\Http\Controllers;

use App\Models\Simrs_user;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function register(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'user_username' => 'required',
            "user_full_name" => 'required',
            'user_password' => 'required',
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid fields',
                'errors' => $validateData->errors()
            ], 422);
        }

        Simrs_user::create([
            'user_username' => $request->user_username,
            "user_full_name" => $request->user_full_name,
            'user_password' => Hash::make($request->user_password),
        ]);

        return response()->json([
            'message' => 'Register success'
        ], 200);
    }

    public function login(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'user_username' => 'required',
            'user_password' => 'required',
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $validateData->errors()
            ], 401);
        }

        $user = Simrs_user::where('user_username', $request->user_username)->first();
        if (!$user || !Hash::check($request->user_password, $user->user_password)) {
            return response()->json([
                'message' => 'Username or password are incorrect',
            ], 401);
        }

        Auth::login($user);
        $token = $user->createToken('access_token')->plainTextToken;
        return response()->json([
            'message' => 'Login success',
            'token' => $token,
            'user' => $user
        ], 200);
    }

    public function logout(Request $request)
    {
        $token = PersonalAccessToken::findToken($request->bearerToken());
        $token->delete();
        return response()->json([
            'message' => 'Logout success'
        ], 200);
    }
}
