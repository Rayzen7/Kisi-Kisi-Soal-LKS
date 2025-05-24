<?php

namespace App\Http\Controllers;

use App\Models\Penalties;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PenaltiesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $penalties = Penalties::all();
        return response()->json([
            'penalties' => $penalties
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
        $validateData = Validator::make($request->all(), [
            'penalties_name' => 'required',
            'description' => 'required',
            'no_car' => 'required',
            'penalties_total' => 'required',
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid Field'
            ], 422);
        }

        Penalties::create([
            'penalties_name' => $request->penalties_name,
            'description' => $request->description,
            'no_car' => $request->no_car,
            'penalties_total' => $request->penalties_total,
        ]);

        return response()->json([
            'message' => 'Create Penalties Success'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $penalties = Penalties::find($id);
        return response()->json([
            'penalties' => $penalties
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
        $penalties = Penalties::find($id);
        $validateData = Validator::make($request->all(), [
            'penalties_name' => 'required',
            'description' => 'required',
            'no_car' => 'required',
            'penalties_total' => 'required',
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid Field'
            ], 422);
        }

        $penalties->update([
            'penalties_name' => $request->penalties_name,
            'description' => $request->description,
            'no_car' => $request->no_car,
            'penalties_total' => $request->penalties_total,
        ]);

        return response()->json([
            'message' => 'Update Penalties Success'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $penalties = Penalties::find($id);
        $penalties->delete();
        return response()->json([
            'message' => 'Delete Penalties Success'
        ]);
    }
}
