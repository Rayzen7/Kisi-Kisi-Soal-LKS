<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'username' => 'required|unique:users,username',
            'password' => 'required',            
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'status' => 'invalid',
            ], 401);
        }

        $user = User::create([
            'username' => $request->username,
            'password' => $request->password,
        ]);

        $token = $user->createToken('access_token')->plainTextToken;
        return response()->json([
            'status' => 'success',
            'token' => $token,
        ], 201);
    }

    public function signin(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',            
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'status' => 'invalid',
            ], 401);
        }

        $user = User::where('username', $request->username)->first();
        $admin = Admin::where('username', $request->username)->first();
        if ($user && Hash::check($request->password, $user->password)) {
            $user->update([
                'last_login_at' => now()
            ]);

            $token = $user->createToken('access_token')->plainTextToken;
            return response()->json([
                'status' => 'success',
                'token' => $token
            ], 200);
        } else if ($admin && Hash::check($request->password, $admin->password)) {
            $admin->update([
                'last_login_at' => now()
            ]);

            $token = $admin->createToken('access_token')->plainTextToken;
            return response()->json([
                'status' => 'success',
                'token' => $token
            ], 200);
        }

        return response()->json([
            'status' => 'invalid',
        ], 401);
    }

    public function signout(Request $request)
    {
        $token = PersonalAccessToken::findToken($request->bearerToken());
        if (!$token) {
            return response()->json([
                'status' => 'forbidden',
            ], 403);
        }

        $token->delete();
        return response()->json([
            'status' => 'success',
        ], 200);
    }
}
