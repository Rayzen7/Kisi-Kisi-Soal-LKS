<?php

namespace App\Http\Controllers;

use App\Models\Society;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function login(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'id_card_number' => 'required',
            'password' => 'required',
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => $validateData->errors(),
            ], 401);
        }

        $user = Society::where('id_card_number', $request->id_card_number)->first();
        $checkPassword = $user->where('password', $request->password)->first();

        if ($user && $checkPassword) {
            $token = $user->createToken("access_token")->plainTextToken;
            return response()->json([
                'name' => $user->name,
                'born_date' => $user->born_date,
                'gender' => $user->gender,
                'token' => $token,
                'regional' => $user->regional
            ], 200);
        }
        return response()->json([
            'message' => "ID Card Number or Password incorrect"
        ], 401);


    }

    public function logout(Request $request)
    {
        $token = PersonalAccessToken::findToken($request->bearerToken());
        if (!$token) {
            return response()->json([
                "message" => "Invalid token",
            ], 401);
        }

        $token->delete();
        return response()->json([
            "message" => "Logout success",
        ], 200);
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
