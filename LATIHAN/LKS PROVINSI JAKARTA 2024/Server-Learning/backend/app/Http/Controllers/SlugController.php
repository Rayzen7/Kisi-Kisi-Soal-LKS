<?php

namespace App\Http\Controllers;

use App\Models\Games;
use App\Models\GameVersion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SlugController extends Controller
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
    public function store(Request $request, $slug)
    {
        $game = Games::where('slug', $slug)->firstOrFail();
        $gameversion = GameVersion::where('game_id', $game->id)->get();
        $lastversion = $gameversion->last()->version;

        preg_match('/\d+/', $lastversion ?? 'v0', $match);
        $lastversionNumber = isset($match[0]) ? (int)$match[0] : 0;
        $newversion = $lastversionNumber + 1;

        $validateData = Validator::make($request->all(), [
            'storage_path' => 'required|file|mimes:jpeg,png,jpg',
            'game_id' => 'required'
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'status' => 'Invalid field',
                'error' => $validateData->errors()
            ], 422);
        }

        $request->file('storage_path')->store('games/' . $game->id . '/' . 'v' . $newversion . '/', 'public');
        $request->file('zipfile')->store('games/' . $game->id . '/' . 'v' . $newversion . '/', 'public');

        GameVersion::create([
            'game_id' => $request->game_id,
            'version' => 'v' . $newversion,
            'storage_path' => 'games/' . $game->id . '/' . 'v' . $newversion . '/'
        ]);

        return response()->json([

        ]);
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
