<?php

namespace App\Http\Controllers;

use App\Models\Rent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rent = Rent::with('user')->get();
        return response()->json([
            'rent' => $rent
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
            'tenant' => 'required|exists:users,id',
            'no_car' => 'required',
            'date_borrow' => 'required',
            'date_return' => 'required',
            'down_payment' => 'required',
            'discount' => 'required',
            'total' => 'required',
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid Field',
            ], 422);
        }

        Rent::create([
            'tenant' => $request->tenant,
            'no_car' => $request->no_car,
            'date_borrow' => $request->date_borrow,
            'date_return' => $request->date_return,
            'down_payment' => $request->down_payment,
            'discount' => $request->discount,
            'total' => $request->total
        ]);

        return response()->json([
            'message' => 'Create Rent Success'
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $rent = Rent::with('user')->find($id);
        return response()->json([
            'rent' => $rent
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
        $rent = Rent::with('user')->find($id);
        $validateData = Validator::make($request->all(), [
            'tenant' => 'required|exists:users,id',
            'no_car' => 'required',
            'date_borrow' => 'required',
            'date_return' => 'required',
            'down_payment' => 'required',
            'discount' => 'required',
            'total' => 'required',
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid Field',
            ], 422);
        }

        $rent->update([
            'tenant' => $request->tenant,
            'no_car' => $request->no_car,
            'date_borrow' => $request->date_borrow,
            'date_return' => $request->date_return,
            'down_payment' => $request->down_payment,
            'discount' => $request->discount,
            'total' => $request->total
        ]);

        return response()->json([
            'message' => 'Update Rent Success'
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $rent = Rent::with('user')->find($id);
        $rent->delete();
        return response()->json([
            'message' => 'Delete Rent Success'
        ],200);
    }
}
