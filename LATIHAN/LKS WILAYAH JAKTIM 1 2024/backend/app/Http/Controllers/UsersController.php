<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::where('role_id', 2)->get();
        return response()->json([
            'user' => $user,
        ]);
    }

    public function me()
    {
        $user = Auth::user();
        $me = User::where('id', $user->id)->with('rent', 'return', 'penaltie')->get();
        return response()->json([
            'user' => UserResource::collection($me),
        ]);
    }

    public function register(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'name' => 'required',
            'username' => 'required',
            'email' => 'required|unique:users',
            'phone' => 'required',
            'no_ktp' => 'required',
            'date_of_birth' => 'required',
            'description' => 'required',
            'password' => 'required',
            'role_id' => 'exists:roles,id',
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid Field'
            ], 422);
        }

        User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => $request->password,
            'no_ktp' => $request->no_ktp,
            'phone' => $request->phone,
            'description' => $request->description,
            'date_of_birth' => $request->date_of_birth,
            'role_id' => 2,
        ]);

        return response()->json([
            'message' => 'Create Register Success',
        ]);
    }

    public function login(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid Login'
            ], 401);
        }

        $user = User::where('username', $request->username)->first();
        if (Auth::attempt($request->only(['username', 'password']))) {
            $token = $user->createToken('access_token')->plainTextToken;
            return response()->json([
                'message' => 'Login Success',
                'token' => $token,
                'user' => $user,
            ]);
        }

        return response()->json([
            'message' => 'Invalid Login',
        ], 401);
    }

    public function logout(Request $request)
    {
        $token = PersonalAccessToken::findToken($request->bearerToken());
        $token->delete();
        return response()->json([
            'message' => 'Logout Success',
        ]);
    }

    public function show(string $id)
    {
        $user = User::find($id);
        return response()->json([
            'user' => $user,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $user = User::find($id);
        $validateData = Validator::make($request->all(), [
            'name' => 'required',
            'username' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'no_ktp' => 'required',
            'date_of_birth' => 'required',
            'description' => 'required',
            'password' => 'required',
            'role_id' => 'exists:roles,id',
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid Field'
            ], 422);
        }

        $user->update([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => $request->password,
            'no_ktp' => $request->no_ktp,
            'phone' => $request->phone,
            'description' => $request->description,
            'date_of_birth' => $request->date_of_birth,
            'role_id' => 2,
        ]);

        return response()->json([
            'message' => 'Update Register Success',
        ]);
    }

    public function destroy(string $id)
    {
        $user = User::find($id);
        $user->delete();
        return response()->json([
            'message' => 'Delete Register Success',
        ]);
    }
}
