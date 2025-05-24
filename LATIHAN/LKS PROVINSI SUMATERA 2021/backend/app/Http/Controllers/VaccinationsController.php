<?php

namespace App\Http\Controllers;

use App\Http\Resources\VaccinationsResource;
use App\Models\Spot;
use App\Models\Vaccinations;
use App\Models\VaccinationSpot;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class VaccinationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $vaccination = Vaccinations::with('society', 'doctor', 'vaccine', 'spot')->where('society_id', $user->id)->get();
        $firstDose = $vaccination->where('dose', 1)->first();
        $secondDose = $vaccination->where('dose', 2)->first();

        return response()->json([
        'vaccinations' => [
            'first' => $firstDose ? new VaccinationsResource($firstDose) : null,
            'second' => $secondDose ? new VaccinationsResource($secondDose) : null
        ]
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
        $society = Auth::user();
        $validateData = Validator::make($request->all(), [
            'spot_id' => 'required',
            'date' => 'required|date_format:Y-m-d'
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'error' => [
                    'date' => [
                        'The date does note match the format Y-m-d'
                    ],
                    'spot_id' => [
                        'The spot id field is required'
                    ]
                ]
            ], 401);
        }

        $societyCheck = Vaccinations::with('society')->where('society_id', $society->id)->count();
        if ($societyCheck >= 2) {
            return response()->json([
                'message' => 'Society has been 2x vaccinated'
            ], 401);
        }

        $dateCheck = Vaccinations::with('society')->where('society_id', $society->id)->orderBy('date', 'desc')->first();
        if ($dateCheck) {
            $lastDate = Carbon::parse($dateCheck->date);
            $newDate = Carbon::parse($request->date);

            if ($newDate->lessThanOrEqualTo($lastDate) || $lastDate->diffInDays($newDate) < 30) {
                return response()->json([
                    'error' => 'Wait at least +30 days from 1st Vaccination'
                ], 400);
            }
        }

        $dose = Vaccinations::where('society_id', $society->id)->first();
        if (!$dose) {
            $userDose = 1;
        } else if ($dose->dose == 1) {
            $userDose = 2;
        } else {
            $userDose = 1;            
        }

        Vaccinations::create([
            'spot_id' => $request->spot_id,
            'date' => $request->date,
            'society_id' => $society->id,
            'vaccine_id' => null,
            'dose' => $userDose
        ]);

        return response()->json([
            'message' => 'First|Second vaccinations registered'
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
