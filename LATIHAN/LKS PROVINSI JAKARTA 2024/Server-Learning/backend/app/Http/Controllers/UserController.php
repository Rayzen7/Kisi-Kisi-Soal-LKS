<?php

namespace App\Http\Controllers;

use App\Models\Games;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
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
    public function showUser($username)
    {
        $user = User::where('username', $username)->with('games')->firstOrFail();
        return response()->json([
            'username' => $user->username,
            'registeredTimestamp' => $user->created_at,
            'authoredGames' => $user->games->map(function($game) {
                return [
                    'slug' => $game->slug,
                    'title' => $game->title,
                    'description' => $game->description
                ];
            })->toArray(),
            'highestscore' => $user->scores->groupBy('user_id')->map(function($score) {
                $scoreHigh = $score->sortByDesc('score')->firstOrFail();
                $gameversionScore = $scoreHigh->versions;
                $game = Games::where('id', $gameversionScore->game_id)->firstOrFail();

                return [
                    "game" => [
                        "slug" => $game->slug,
                        "title" => $game->title,
                        "description" => $game->description
                    ],
                    "score" => $scoreHigh->score,
                    "timestamp" => $scoreHigh->created_at
                ];
            })->values()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'username' => 'required|unique:users,username',
            'password' => 'required',            
        ], [
            'username.unique' => 'Username already exists'
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'status' => 'invalid',
                'message' => $validateData->errors()
            ], 400);
        }

        $user = User::create([
            "username" => $request->username,
            "password" => $request->password,
        ]);

        return response()->json([
            "status" => 'success',
            "username" => $user->username
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::findOrFail($id);
        return response()->json([
            'user' => $user
        ]);
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
        $user = User::findOrFail($id);
        $validateData = Validator::make($request->all(), [
            'username' => 'required|unique:users,username',
            'password' => 'required',            
        ], [
            'username.unique' => 'Username already exists'
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'status' => 'invalid',
                'message' => $validateData->errors()
            ], 400);
        }

        $user->update([
            'username' => $request->username,
            'password' => $request->password,
        ]);

        return response()->json([
            'status' => 'success',
            'username' => $user->username,
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'status' => 'not-found',
                'message' => 'User Not Found',
            ], 403);
        }

        $user->delete();
        return response()->json([
            'message' => 'User deleted'
        ], 204);
    }
}
