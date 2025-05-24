<?php

namespace App\Http\Controllers;

use App\Http\Resources\DoctorUserResource;
use App\Models\DoctorUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class DoctorUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $validateData = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string'
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'The username & password field is required'
            ], 401);
        }

        $username = DoctorUser::where('username', $request->username)->first();
        if (Auth::guard('doctors')->attempt($request->only('username', 'password'))) {
            return response()->json([
                'body' => new DoctorUserResource($username)
            ], 200);
        }

        return response()->json([
            'message' => 'Username or Password incorrect'
        ], 401);
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
