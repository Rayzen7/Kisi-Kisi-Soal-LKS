<?php

namespace App\Http\Controllers;

use App\Http\Resources\ScheduleResource;
use App\Models\Simrs_schedule;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $size = $request->input('size', 10);
        $schedule = Simrs_schedule::with('doctor', 'pol')->paginate($size);
        return response()->json([
            'page' => $schedule->currentPage(),
            'size' => $size,
            'schedule' => ScheduleResource::collection($schedule)
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
            'doctor_id' => 'required|string',
            'pol_id' => 'required|string',
            'schedule_date' => 'required|date|after:today',
            'schedule_start' => 'required',
            'schedule_end' => 'required',
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => "Invalid field",
                'errors' => $validateData->errors()
            ], 422);
        }

        Simrs_schedule::create([
            'doctor_id' => $request->doctor_id,
            'pol_id' => $request->pol_id,
            'schedule_date' => $request->schedule_date,
            'schedule_start' => $request->schedule_start,
            'schedule_end' => $request->schedule_end,
        ]);

        return response()->json([
            'message' => 'Schedule created'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $schedule = Simrs_schedule::with('doctor', 'pol')->find($id);
        if (!$schedule) {
            return response()->json([
                'message' => 'Schedule not found'
            ], 404);
        }

        return response()->json([
            'schedule' => $schedule
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
        $schedule = Simrs_schedule::with('doctor', 'pol')->find($id);
        $validateData = Validator::make($request->all(), [
            'doctor_id' => 'required|string',
            'pol_id' => 'required|string',
            'schedule_date' => 'required|date|after:today',
            'schedule_start' => 'required',
            'schedule_end' => 'required',
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => "Invalid field",
                'errors' => $validateData->errors()
            ], 422);
        }

        if (Carbon::parse($schedule->schedule_date)->toDateString() < Carbon::now()->toDateString()) {
            return response()->json([
                'message' => 'Schedule cannot modified'
            ], 422);
        }

        $schedule->update([
            'doctor_id' => $request->doctor_id,
            'pol_id' => $request->pol_id,
            'schedule_date' => $request->schedule_date,
            'schedule_start' => $request->schedule_start,
            'schedule_end' => $request->schedule_end,
        ]);

        return response()->json([
            'message' => 'Schedule modified'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $schedule = Simrs_schedule::with('doctor', 'pol')->find($id);
        if (Carbon::parse($schedule->schedule_date)->toDateString() < Carbon::now()->toDateString()) {
            return response()->json([
                'message' => 'Schedule cannot deleted'
            ], 422);
        }

        $schedule->delete();
        return response()->json([
            'message' => 'Schedule deleted'
        ]);
    }
}
