<?php

namespace App\Http\Controllers;

use App\Models\Games;
use App\Models\GameVersion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Str;

class GameController extends Controller
{
    public function index(Request $request)
    {
        $sortBy = $request->input('sortBy', 'title');
        $sortDir = $request->input('sortDir', 'ASC');
        $size = $request->input('size', 10);

        $game = Games::with('gameversion', 'user')->orderBy($sortBy, $sortDir)->paginate($size);
        return response()->json([
            'page' => $game->currentPage(),
            'size' => $size,
            'totalElements' => $game->count(),
            'content' => $game->map(function($data) {
                return [
                    'slug' => $data->slug,
                    'title' => $data->title,
                    'description' => $data->description,
                    'thumbnail' => '/' . $data->gameversion->pluck('storage_path')->last() . 'thumbnail.png',
                    'uploadTimestamp' => $data->gameversion->pluck('updated_at')->last(),
                    'author' => $data->user->username,
                    'scoreCount' => $data->gameversion->flatMap(function($version) {
                        return $version->gamescore->pluck('score');
                    })->sum()
                ];
            })
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $validateData = Validator::make($request->all(), [
            'title' => 'required|min:3|max:60',
            'description' => 'required|max:200',
            'created_by' => 'exists:users,id'
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'status' => 'Invalid',
                'message' => $validateData->errors()
            ], 422);
        }

        $game = Games::where('title', $request->title)->first();
        if ($game) {
            return response()->json([
                'status' => 'Invalid',
                'slug' => 'Game title already exists'                
            ], 400);
        }

        Games::create([
            'title' => $request->title,
            'description' => $request->description,
            'slug' => \Illuminate\Support\Str::slug($request->title),
            'created_by' => $user->id
        ]);

        return response()->json([
            'status' => 'Success',
            'slug' => 'Generated-game-slug'
        ], 201);
    }

    public function show($slug)
    {
        $game = Games::where('slug', $slug)->with('gameversion')->first();
        if (!$game) {
            return response()->json([
                'status' => 'Invalid',
                'message' => 'Not found'
            ], 404);
        }

        return response()->json([        
            'slug' => $game->slug,
            'title' => $game->title,
            'description' => $game->description,
            'thumbnail' => '/' . $game->gameversion->pluck('storage_path')->last() . 'thumbnail.png',
            'uploadTimestamp' => $game->updated_at,
            'author' => $game->user->username,
            "scoreCount" => $game->gameversion->flatMap(function($data) {
                return $data->gamescore->pluck('score');
            })->sum()            
        ]);
    }

    public function fileStore(Request $request, $slug)
    {
        $game = Games::where('slug', $slug)->first();
        $version = GameVersion::where('game_id', $game->id)->get();

        if ($version->isEmpty()) {
            $request->file('zip')->store('games/' . $game->id . '/v1/', 'public');
            $request->file('image')->store('games/' . $game->id . '/v1/', 'public');
            GameVersion::create([
                'game_id' => $game->id,
                'version' => 'v1',
                'storage_path' => 'games/' . $game->id . '/v1/'
            ]);

            return response()->json([
                'status' => 'Success',
            ], 200);
        }

        $lastVersion = $version->last();
        if ($lastVersion) {
            $currentVersion = $lastVersion->version;
            preg_match('/\d+/', $currentVersion, $matches);
            $newVersion = (Int) $matches[0] + 1;
            $versionNew = 'v' . $newVersion;
        }

        $request->file('zip')->store('games/' . $game->id . '/' . $versionNew . '/', 'public');
        $request->file('image')->store('games/' . $game->id . '/' . $versionNew . '/', 'public');
        GameVersion::create([
            'game_id' => $game->id,
            'version' => $versionNew ?? 'v1',
            'storage_path' => 'games/' . $game->id . '/' . $versionNew . '/'
        ]);

        return response()->json([
            'status' => 'Success',
        ], 200);
    }

    public function serveFile($slug, $version)
    {
        $game = Games::where('slug', $slug)->first();
        $gameVersion = GameVersion::where('game_id', $game->id)->where('version', $version)->first();

        if (!$gameVersion) {
            return response()->json([
                'status' => 'Not found'
            ], 404);
        }

        return response()->json([
            'path' => $gameVersion->storage_path
        ]);
    }

    public function update(Request $request, $slug)
    {
        $user = Auth::user();
        $game = Games::where('slug', $slug)->first();
        $validateData = Validator::make($request->all(), [
            'title' => 'required|min:3|max:60',
            'description' => 'required|max:200',
            'created_by' => 'exists:users,id'
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'status' => 'Invalid',
                'message' => $validateData->errors()
            ], 422);
        }

        $gameCheck = Games::where('title', $request->title)->first();
        if ($gameCheck) {
            return response()->json([
                'status' => 'Invalid',
                'slug' => 'Game title already exists'                
            ], 400);
        }

        $game->update([
            'title' => $request->title,
            'description' => $request->description,
            'created_by' => $user->id,
            'slug' => \Illuminate\Support\Str::slug($request->title)
        ]);

        return response()->json([
            'title' => $game->title,
            'slug' => $game->slug,
        ], 200);
    }

    public function destroy($slug)
    {
        $game = Games::where('slug', $slug)->first();
        if (!$game) {
            return response()->json([
                'status' => 'Invalid',
                'message' => 'Not found',
            ], 404);
        }

        $game->delete();
        return response()->json([
            'status' => 'Success',
        ], 204);
    }
}
