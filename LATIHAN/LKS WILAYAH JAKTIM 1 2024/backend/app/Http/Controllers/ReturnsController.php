<?php

namespace App\Http\Controllers;

use App\Models\Returns;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReturnsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $return = Returns::with('penalties', 'user')->get();
        return response()->json([
            'return' => $return,
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
            'id_penalties' => 'required|exists:penalties,id',
            'date_borrow' => 'required',
            'date_return' => 'required',
            'discount' => 'required',
            'total' => 'required',
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid Field'
            ], 422);
        }

        Returns::create([
            'tenant' => $request->tenant,
            'no_car' => $request->no_car,
            'id_penalties' => $request->id_penalties,
            'date_borrow' => $request->date_borrow,
            'date_return' => $request->date_return,
            'discount' => $request->discount,
            'total' => $request->total,
        ]);

        return response()->json([
            'message' => 'Create Return Success',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $return = Returns::with('penalties', 'user')->find($id);
        return response()->json([
            'return' => $return,
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
        $return = Returns::with('penalties', 'user')->find($id);
        $validateData = Validator::make($request->all(), [
            'tenant' => 'required|exists:users,id',
            'no_car' => 'required',
            'id_penalties' => 'required|exists:penalties,id',
            'date_borrow' => 'required',
            'date_return' => 'required',
            'discount' => 'required',
            'total' => 'required',
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid Field'
            ], 422);
        }

        $return->update([
            'tenant' => $request->tenant,
            'no_car' => $request->no_car,
            'id_penalties' => $request->id_penalties,
            'date_borrow' => $request->date_borrow,
            'date_return' => $request->date_return,
            'discount' => $request->discount,
            'total' => $request->total,
        ]);

        return response()->json([
            'message' => 'Update Return Success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $return = Returns::with('penalties', 'user')->find($id);
        $return->delete();
        return response()->json([
            'message' => 'Delete Return Success',
        ]);
    }
}
