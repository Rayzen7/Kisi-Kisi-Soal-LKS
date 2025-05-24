<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\InstallmentApplyStatus;
use App\Models\Validation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $application = InstallmentApplyStatus::with('month', 'society', 'installment', 'application')->get();
        return response()->json([
            'instalments' => $application->map(function ($item) {
                return [
                    'id' => $item->id,
                    'car' => $item->installment->cars,
                    'brand' => $item->installment->brand->brand,
                    'price' => $item->installment->price,
                    'description' => $item->installment->description,
                    'application' => [
                        'month' => $item->month->month,
                        'nominal' => $item->month->nominal,
                        'apply_status' => $item->status,
                        'notes' => $item->application->notes
                    ]
                ];
            })->toArray(),
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

        $validation = Validation::where('society_id', $user->id)->first();
        if (!$validation || $validation->status == 'pending' || $validation->status == 'declined') {
            return response()->json([
                'message' => "Your data validator must be accepted by validator before"
            ], 401);
        }
        $validateData = Validator::make($request->all(), [
            'installment_id' => 'required',
            'date' => 'required',
            'notes' => 'required',
        ]);

        $application = Application::where('society_id', $user->id)->first();
        if ($application) {
            return response()->json([
                "message" => "Application for a instalment can only be once"
            ], 401);
        }

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid Field',
                'errors' => $validateData->errors()
            ], 401);
        }

        $societyInstalment = Application::create([
            'installment_id' => $request->installment_id,
            'notes' => $request->notes,
            'society_id' => $user->id,
            'date' => $request->date,
            'available_month_id' => $request->available_month_id,
        ]);

        InstallmentApplyStatus::create([
            'date' => $request->date,
            'society_id' => $user->id,
            'installment_id' => $request->installment_id,
            'available_month_id' => $request->available_month_id,
            "installment_apply_societies_id" => $societyInstalment->id,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => "Applying for Instalment successful"
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
