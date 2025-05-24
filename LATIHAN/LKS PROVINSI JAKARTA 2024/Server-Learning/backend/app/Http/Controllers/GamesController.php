<?php

namespace App\Http\Controllers;

use App\Http\Resources\GamesResource;
use App\Models\Games;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Str;

class GamesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $size = $request->input('size', 10);
        $sortBy = $request->input('sortBy', 'title');
        $sortDir = $request->input('sortDir', 'ASC');

        $game = Games::orderBy($sortBy, $sortDir)->paginate($size);
        return response()->json([
            'page' => $game->currentPage(),
            'size' => $size,
            'totalElement' => $game->count(),
            'content' => GamesResource::collection($game)
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
    public function store(Request $request)
    {
        $user = Auth::user();
        $validateData = Validator::make($request->all(), [
            'title' => 'required|min:3',
            'description' => 'required'
        ]);

        $game = games::where('title', $request->title)->first();
        if ($game) {
            return response()->json([
                'status' => 'Invalid',
                'slug' => 'Game title already exists'
            ], 400);
        }

        if ($validateData->fails()) {
            return response()->json([
                'status' => 'Invalid',
                'error' => $validateData->errors()
            ], 422);
        }

        $game = Games::create([
            'title' => $request->title,
            'description' => $request->description,
            'slug' => \Illuminate\Support\Str::slug(($request->title)),
            'created_by' => $user->id
        ]);

        return response()->json([
            'status' => 'Success',
            'slug' => $game->slug
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $game = Games::where('slug', $slug)->firstOrFail();
        return response()->json([
            'content' => new GamesResource($game)
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
    public function update(Request $request, $slug)
    {
        $game = Games::where('slug', $slug)->firstOrFail();
        $validateData = Validator::make($request->all(), [
            'title' => 'required|min:3',
            'description' => 'required'
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'status' => 'Invalid field',
                'error' => $validateData->errors()
            ],422);
        }

        $game->update([
            'title' => $request->title,
            'description' => $request->description,
            'slug' => \Illuminate\Support\Str::slug($request->title)
        ]);

        return response()->json([
            'status' => 'Success',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($slug)
    {
        $game = Games::where('slug', $slug)->firstOrFail();
        $game->delete();

        return response()->json([
            'status' => 'Success'
        ], 204);
    }
}
