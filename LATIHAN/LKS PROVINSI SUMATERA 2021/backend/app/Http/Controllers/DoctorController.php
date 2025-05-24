<?php

namespace App\Http\Controllers;

use App\Models\Consultations;
use App\Models\Doctor;
use App\Models\Spot;
use App\Models\Vaccinations;
use App\Models\VaccinationSpot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getConsultation()
    {
        $consultation = Consultations::with('society', 'doctor')->where('status', 'pending')->get();
        return response()->json([
            'consultation' => $consultation
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function showConsultation(string $id)
    {
        $consultation = Consultations::with('society', 'doctor')->where('status', 'pending')->findOrFail($id);
        return response()->json([
            'consultation' => $consultation
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function updateConsultation(Request $request, string $id)
    {
        $user = Auth::user();
        $consultation = Consultations::with('society', 'doctor')->where('status', 'pending')->findOrFail($id);    
        $validateData = Validator::make($request->all(), [
            'status' => 'required',
            'doctor_notes' => 'required'
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid fields'
            ], 401);
        }

        $consultation->update([
            'status' => $request->status,
            'doctor_notes' => $request->doctor_notes,
            'doctor_id' => $user->id
        ]);

        return response()->json([
            'message' => 'User has been respond'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function getFirstVaccination()
    {
        $firstVaccination = Vaccinations::with('society', 'spot', 'doctor', 'vaccine')->where('dose', 1)->whereNull('doctor_id')->get();
        return response()->json([
            'first' => $firstVaccination
        ]);
    }

    public function getSecondVaccination()
    {
        $firstVaccination = Vaccinations::with('society', 'spot', 'doctor', 'vaccine')->where('dose', 2)->whereNull('doctor_id')->get();
        return response()->json([
            'second' => $firstVaccination
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function showVaccination(string $id)
    {
        $firstVaccination = Vaccinations::with('society', 'spot', 'doctor', 'vaccine')->findOrFail($id);
        return response()->json([
            'first' => $firstVaccination
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateFirstVaccination(Request $request, string $id)
    {
        $firstVaccination = Vaccinations::with('society', 'spot', 'doctor', 'vaccine')->where('dose', 1)->whereNull('doctor_id')->findOrFail($id);
        $user = Auth::user();

        $validateData = Validator::make($request->all(), [
            'vaccine_id' => 'required',
            'officer_id' => 'required'
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid fields'
            ], 401);
        }

        $firstVaccination->update([
            'vaccine_id' => $request->vaccine_id,
            'officer_id' => $request->officer_id,
            'doctor_id' => $user->id
        ]);

        return response()->json([
            'message' => 'First vaccine user has been respond'
        ]);
    }

    public function updateSecondVaccination(Request $request, string $id)
    {
        $firstVaccination = Vaccinations::with('society', 'spot', 'doctor', 'vaccine')->where('dose', 2)->whereNull('doctor_id')->findOrFail($id);
        $user = Auth::user();

        $validateData = Validator::make($request->all(), [
            'vaccine_id' => 'required',
            'officer_id' => 'required'
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid fields'
            ], 401);
        }

        $firstVaccination->update([
            'vaccine_id' => $request->vaccine_id,
            'officer_id' => $request->officer_id,
            'doctor_id' => $user->id
        ]);

        return response()->json([
            'message' => 'First vaccine user has been respond'
        ]);
    }

    public function getOfficer(string $id)
    {
        $society = Vaccinations::findOrFail($id);
        $officer = Doctor::where('role', 'officer')->where('spot_id', $society->spot_id)->get();
        return response()->json([
            'officer' => $officer
        ]);
    }

    public function getVaccine(string $id)
    {
        $society = Vaccinations::findOrFail($id);
        $vaccine = Spot::with('vaccines')->where('id', $society->spot_id)->first();
        return response()->json([
            'vaccine' => $vaccine
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
