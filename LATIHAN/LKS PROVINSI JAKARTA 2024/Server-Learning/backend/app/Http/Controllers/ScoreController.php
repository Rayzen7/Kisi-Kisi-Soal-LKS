<?php

namespace App\Http\Controllers;

use App\Http\Resources\ScoreResource;
use App\Models\Games;
use App\Models\GameVersion;
use App\Models\Scores;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ScoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $scores = Scores::with('user')->orderByDesc('score')->get();
        $highestScore = $scores->groupBy('user_id')->map(function($group) {
            return $group->sortByDesc('score')->first();
        })->values();
        
        return response()->json([
            'scores' => ScoreResource::collection($highestScore)
        ]);
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
    public function store(Request $request, $slug)
    {
        $user = Auth::user();
        $game = Games::where('slug', $slug)->get();
        $gameLast = $game->last();

        $gameversion = GameVersion::where('game_id', $gameLast->id)->get();
        $gameversionLast = $gameversion->last();

        $validateData = Validator::make($request->all(), [
            'score' => 'required'
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'status' => 'Invalid field',
                'error' => $validateData->errors()
            ], 422);
        }

        $score = Scores::create([
            'score' => $request->score,
            'user_id' => $user->id,
            'game_version_id' => $gameversionLast->id
        ]);

        return response()->json([
            'status' => 'Success',
            'score' => $score
        ], 200);
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
