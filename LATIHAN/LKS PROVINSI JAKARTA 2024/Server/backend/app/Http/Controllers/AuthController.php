<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use function Symfony\Component\Clock\now;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'username' => 'required|unique:users,username|min:4',
            'password' => 'required|min:5'
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'status' => 'Invalid',
                'error' => $validateData->errors()
            ], 422);
        }

        $user = User::create([
            'username' => $request->username,
            'password' => $request->password,
        ]);

        $token = $user->createToken('access_token')->plainTextToken;
        return response()->json([
            'status' => 'Success',
            'token' => $token
        ], 201);
    }

    public function signin(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'username' => 'required|min:4',
            'password' => 'required|min:5'
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'status' => 'Invalid',
                'error' => $validateData->errors()
            ], 422);
        }

        $user = User::where('username', $request->username)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'Invalid',
                'message' => 'Wrong username or password'
            ], 401);
        }

        $user->update([
            'last_login_at' => now(),
        ]);

        $token = $user->createToken('access_token')->plainTextToken;
        return response()->json([
            'status' => 'Success',
            'token' => $token,
            'user' => $user
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
