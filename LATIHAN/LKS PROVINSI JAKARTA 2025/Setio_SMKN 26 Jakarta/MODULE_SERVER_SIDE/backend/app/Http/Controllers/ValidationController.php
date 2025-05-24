<?php

namespace App\Http\Controllers;

use App\Models\Validation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ValidationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $validation = Validation::with('validator')->where("society_id", $user->id)->get()->last();
        return response()->json([
            "validation" => [
                'id' => $validation->id,
                'status' => $validation->status,
                'job' => $validation->job,
                'job_description' => $validation->job_description,
                'income' => $validation->income,
                'reason_accepted' => $validation->reason_accepted,
                'validator_notes' => $validation->validator_notes,
                'validator' => $validation->validator,
            ],
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
        $validation = Validation::where("society_id", $user->id)->first();

        if (!$validation) {
            Validation::create([
                "society_id"=> $user->id,
                "status" => 'pending',
                "job" => $request->job,
                "job_description" => $request->job_description,
                "income" => $request->income,
                "reason_accepted" => $request->reason_accepted,
            ]);

            return response()->json([
                'message' =>  "Request data validation sent successful"
            ], 200);
        }

        return response()->json([
            'message' =>  "Cant sent validation. Validation have send!"
        ], 401);
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
