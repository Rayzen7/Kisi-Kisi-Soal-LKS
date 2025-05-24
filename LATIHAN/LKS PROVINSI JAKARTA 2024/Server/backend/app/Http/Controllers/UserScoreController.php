<?php

namespace App\Http\Controllers;

use App\Models\Games;
use App\Models\GameVersion;
use App\Models\Score;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserScoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function userScore($username)
    {
        $user = User::where('username', $username)->first();
        $score = Score::where('user_id', $user->id)->orderByDesc('score')->get();
        return response()->json([
            'username' => $user->username,
            'registeredTimestamp' => $user->updated_at,
            'authoredGames' => $user->game->map(function($data) {
                return [
                   'slug' => $data->slug,
                   'title' => $data->title,
                   'description' => $data->description,
                ];
            })->toArray(),
            'highScore' => $score->pluck('gameversion')->pluck('game')->map(function($data) use ($score) {
                return [
                    'game' => [
                        'slug' => $data->slug,
                        'title' => $data->title,
                        'description' => $data->description,
                    ],
                    'score' => $score->max('score'),
                    'timestamp' => $score->pluck('updated_at')->last()
                ];
            })->values()->first()
        ]);
    }

    public function score($slug)
    {
        $game = Games::where('slug', $slug)->first();
        $score = Score::whereIn('game_version_id', $game->gameversion->pluck('id'))->orderBy('score', 'DESC')->get();
        return response()->json([
            'scores' => $score->map(function($data) {
                return [
                    'username' => $data->user->username,
                    'score' => $data->score,
                    'timestamp' => $data->updated_at
                ];
            })->toArray()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $slug)
    {
        $user = Auth::user();
        $game = Games::where('slug', $slug)->first();
        $validateData = Validator::make($request->all(), [
            'score' => 'required'
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'status' => 'Invalid',
                'message' => $validateData->errors()
            ]);
        }


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
