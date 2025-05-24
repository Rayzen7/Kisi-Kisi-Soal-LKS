<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\PoliklinikController;
use App\Http\Controllers\ScheduleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('/v3')->group(function() {
    Route::prefix('/auth')->group(function() {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');
    }); 

    Route::middleware('auth')->group(function() {
        Route::resource('/poliklinik', PoliklinikController::class);
        Route::resource('/doctor', DoctorController::class);
        Route::resource('/schedule', ScheduleController::class);
    });
});
