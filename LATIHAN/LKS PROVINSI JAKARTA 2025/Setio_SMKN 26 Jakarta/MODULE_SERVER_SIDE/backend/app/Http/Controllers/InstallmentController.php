<?php

namespace App\Http\Controllers;

use App\Models\InstallmentCars;
use Illuminate\Http\Request;

class InstallmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $installment = InstallmentCars::with("month", 'brand')->get();
        return response()->json([
            'cars' => $installment->map(function ($item) {
                return [
                    'id' => $item->id,
                    'cars' => $item->cars,
                    'brand' => $item->brand->brand,
                    "price" => $item->price,
                    'description' => $item->description,
                    'available_month' => $item->month->map(function ($item) {
                        return [
                            'month' => $item->month,
                            'description' => $item->description,
                        ];
                    }),
                ];
            })->toArray()
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       $installment = InstallmentCars::with("month", 'brand')->where('id', $id)->get();
        return response()->json([
            'cars' => $installment->flatMap(function ($item) {
                return [
                    'id' => $item->id,
                    'cars' => $item->cars,
                    'brand' => $item->brand->brand,
                    "price" => $item->price,
                    'description' => $item->description,
                    'available_month' => $item->month->map(function ($item) {
                        return [
                            'month' => $item->month,
                            'description' => $item->description,
                        ];
                    }),
                ];
            })->toArray()
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
