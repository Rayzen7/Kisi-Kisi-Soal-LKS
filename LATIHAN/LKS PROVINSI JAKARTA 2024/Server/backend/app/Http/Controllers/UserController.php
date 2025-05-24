<?php

namespace App\Http\Controllers;

use App\Models\Administrators;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function admin()
    {
        $admin = Administrators::all();
        return response()->json([
            'totalElement' => $admin->count(),
            'content' => $admin->map(function($user) {
                return [
                    'username' => $user->username,
                    'last_login_at' => $user->last_login_at ?? null,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                ];
            })
        ], 200);
    }

    public function createUser(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'username' => 'required|min:4|unique:users,username|max:60',
            'password' => 'required|min:4|max:12',
        ], [
            'unique' => 'Username already exists'
        ]);

        if ($validateData->errors()->unique()) {
            return response()->json([
                'status' => 'Invalid',
                'message' => $validateData->errors()->first()
            ], 400);
        }

        if ($validateData->fails()) {
            return response()->json([
                'status' => 'Invalid',
                'message' => $validateData->errors()
            ], 422);
        }

        $user = User::create([
            'username' => $request->username,
            "password" => $request->password,
            'last_login_at' => now(),
        ]);

        return response()->json([
            'status' => 'Success',
            'username' => $user->username
        ], 201);
    }

    public function user()
    {
        $user = User::all();
        return response()->json([
            'totalElement' => $user->count(),
            'content' => $user->map(function($data) {
                return [
                    'username' => $data->username,
                    'last_login_at' => $data->last_login_at ?? null,
                    'created_at' => $data->created_at,
                    'updated_at' => $data->updated_at,
                ];
            })
        ], 200);
    }

    public function show(string $id)
    {
        $user = User::findOrFail($id);
        return response()->json([
            'user' => $user,
        ]);
    }

    public function update(string $id, Request $request)
    {
        $user = User::findOrFail($id);
        $validateData = Validator::make($request->all(), [
            'username' => 'required|min:4|unique:users,username|max:60',
            'password' => 'required|min:4|max:12',
        ], [
            'unique' => 'Username already exists'
        ]);

        if ($validateData->errors()->unique()) {
            return response()->json([
                'status' => 'Invalid',
                'message' => $validateData->errors()->first()
            ], 400);
        }

        if ($validateData->fails()) {
            return response()->json([
                'status' => 'Invalid',
                'message' => $validateData->errors()
            ], 422);
        }

        $user->update([
            'username' => $request->username,
            'password' => $request->password,
        ]);

        return response()->json([
            'status' => 'Success',
            'username' => $request->username,
        ]);
    }

    public function destroy(string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'status' => 'Not-found',
                'message' => 'User not found'
            ], 404);
        }

        $user->delete();
        return response()->json([
            'status' => 'Success',
        ], 204);
    }
}
