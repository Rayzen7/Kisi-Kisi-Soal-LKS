<?php

namespace App\Http\Controllers;

use App\Http\Resources\PoliklinikResource;
use App\Models\Simrs_poliklinik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PoliklinikController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $size = (int)$request->input('size', 10);
        $poliklinik = Simrs_poliklinik::with('schedule')->paginate($size);
        return response()->json([
            'page' => $poliklinik->currentPage(),
            'size' => $size,
            'poliklinik' => PoliklinikResource::collection($poliklinik)
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
            'pol_name' => 'required|string',
            'pol_description' => ''
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $validateData->errors()
            ], 422);
        }

        Simrs_poliklinik::create([
            'pol_name' => $request->pol_name,
            'pol_description' => $request->pol_description
        ]);

        return response()->json([
            'message' => 'Poliklinik is created'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $poliklinik = Simrs_poliklinik::with('schedule')->find($id);
        if (!$poliklinik) {
            return response()->json([
                'message' => 'Poliklinik not found'
            ], 404);
        }
        
        return response()->json([
            'poliklinik' => $poliklinik
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
        $poliklinik = Simrs_poliklinik::find($id);
        $validateData = Validator::make($request->all(), [
            'pol_name' => 'required|string',
            'pol_description' => ''
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $validateData->errors()
            ], 422);
        }

        $poliklinik->update([
            'pol_name' => $request->pol_name,
            'pol_description' => $request->pol_description
        ]);

        return response()->json([
            'message' => 'Poliklinik modified'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $poliklinik = Simrs_poliklinik::find($id);
            $poliklinik->delete();
            return response()->json([
                'message' => 'Poliklinik deleted'
            ]);
        } catch (\Throwable $th) {
            if ($th) {
                return response()->json([
                    'message' => 'Poliklinik cannot deleted'
                ], 422);
            }
        }
    }
}
