<?php

namespace App\Http\Controllers;

use App\Http\Resources\ConsultationResource;
use App\Models\Consultations;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConsultationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $consultation = Consultations::with('doctor')->where('society_id', $user->id)->get();
        return response()->json([
            'consultation' => ConsultationResource::collection($consultation)
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
        $request->validate([
            'current_symptoms' => 'string|required'
        ]);

        $society = Auth::user();
        Consultations::create([
            'society_id' => $society->id,
            'disease_history' => $request->disease_history,
            'current_symptoms' => $request->current_symptoms,
            'status' => 'pending'
        ]);

        return response()->json([
            'message' => 'Request consultation sent successful'
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
