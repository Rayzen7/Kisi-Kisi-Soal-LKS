<?php

namespace App\Http\Controllers;

use App\Http\Resources\VaccinationSpotIdResource;
use App\Http\Resources\VaccinationSpotResource;
use App\Models\Spot;
use App\Models\VaccinationSpot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VaccinationSpotController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $vaccination = Spot::with('vaccines')->where('regional_id', $user->regional_id)->get();
        return response()->json([
            'spots' => VaccinationSpotResource::collection($vaccination)
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $vaccination = Spot::with(['vaccines', 'vaccinations'])->findOrFail($id);
        return response()->json([
            'body' => new VaccinationSpotIdResource($vaccination)
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
