<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserSocietyResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class UserSocietyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        return response()->json([
            'user' => $user
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function login(Request $request)
    {
        $request->validate([
            'id_card_number' => 'required',
            'password' => 'required'
        ]);

        $user = User::where('id_card_number', $request->id_card_number)->with('regional')->first();
        if ($user && $user->password === $request->password) {
            return response()->json([
                'body' => new UserSocietyResource($user)
            ], 200);
        }

        return response()->json([
            'message' => "ID Card Number or Password incorrect"
        ], 401);
    }

    /**
     * Display the specified resource.
     */
    public function logout(Request $request)
    {
        $token = PersonalAccessToken::findToken($request->query('token'));
        $token->delete();
        return response()->json([
            'message' => 'Logout success'
        ], 200);
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
