<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\InstallmentController;
use App\Http\Controllers\ValidationController;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix("/v1")->group(function () {
    Route::prefix("/auth")->group(function () {
        Route::post("/login", [AuthController::class, "login"]);
        Route::post("/logout", [AuthController::class, "logout"]);
    });

    Route::middleware('auth')->group(function () {
        Route::get('/validation', [ValidationController::class, 'index']);
        Route::post('/validation', [ValidationController::class, 'store']);

        Route::resource('/instalment_cars', InstallmentController::class);
        Route::resource('/applications', ApplicationController::class);
    });
});
