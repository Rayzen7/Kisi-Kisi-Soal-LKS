<?php

namespace App\Http\Controllers;

use App\Http\Resources\DoctorResource;
use App\Models\Simrs_doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $size = (int)$request->input('size', 10);
        $doctor = Simrs_doctor::with('schedule')->paginate($size);
        return response()->json([
            'page' => $doctor->currentPage(),
            'size' => $size,
            'doctor' => DoctorResource::collection($doctor)
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
            'doctor_name' => 'required|string',
            'doctor_gender' => 'required|string',
            'doctor_phone_number' => 'required|string',
            'doctor_address' => 'required|string',
            'doctor_email' => 'required|string',
            'doctor_bio' => '',
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $validateData->errors()
            ], 422);
        }

        Simrs_doctor::create([
            'doctor_name' => $request->doctor_name,
            'doctor_gender' => $request->doctor_gender,
            'doctor_phone_number' => $request->doctor_phone_number,
            'doctor_address' => $request->doctor_address,
            'doctor_email' => $request->doctor_email,
            'doctor_bio' => $request->doctor_bio,
        ]);

        return response()->json([
            'message' => 'Doctor created'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $doctor = Simrs_doctor::with('schedule')->find($id);
        if (!$doctor) {
            return response()->json([
                'message' => 'Doctor not found'
            ], 404);
        }
        
        return response()->json([
            'doctor' => $doctor
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
        $doctor = Simrs_doctor::find($id);
        $validateData = Validator::make($request->all(), [
            'doctor_name' => 'required|string',
            'doctor_gender' => 'required|string',
            'doctor_phone_number' => 'required|string',
            'doctor_address' => 'required|string',
            'doctor_email' => 'required|string',
            'doctor_bio' => '',
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $validateData->errors()
            ], 422);
        }

        $doctor->update([
            'doctor_name' => $request->doctor_name,
            'doctor_gender' => $request->doctor_gender,
            'doctor_phone_number' => $request->doctor_phone_number,
            'doctor_address' => $request->doctor_address,
            'doctor_email' => $request->doctor_email,
            'doctor_bio' => $request->doctor_bio,
        ]);

        return response()->json([
            'message' => 'Doctor modified'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $doctor = Simrs_doctor::find($id);
            $doctor->delete();
            return response()->json([
                'message' => 'Doctor deleted'
            ]);
        } catch (\Throwable $th) {
            if ($th) {
                return response()->json([
                    'message' => 'Doctor cannot deleted'
                ], 422);
            }
        }
    }
}
