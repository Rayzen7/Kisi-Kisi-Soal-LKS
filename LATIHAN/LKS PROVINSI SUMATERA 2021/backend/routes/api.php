<?php

use App\Http\Controllers\ConsultationsController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\DoctorUserController;
use App\Http\Controllers\UserSocietyController;
use App\Http\Controllers\VaccinationsController;
use App\Http\Controllers\VaccinationSpotController;
use App\Models\Vaccinations;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('/v1')->group(function() {
    Route::post('/auth/login', [UserSocietyController::class, 'login']);
    Route::post('/auth/doctor/login', [DoctorUserController::class, 'login']);

    Route::middleware('logout')->group(function() {
        Route::post('/auth/logout', [UserSocietyController::class, 'logout']);
    });

    Route::middleware('authorization')->group(function() {
        Route::get('/auth/user', [UserSocietyController::class, 'index']);

        // User Society
        Route::post('/consultations', [ConsultationsController::class, 'store']);
        Route::get('/consultations', [ConsultationsController::class, 'index']);

        Route::get('/spots', [VaccinationSpotController::class, 'index']);
        Route::get('/spots/{id}', [VaccinationSpotController::class, 'show']);

        Route::post('/vaccinations', [VaccinationsController::class, 'store']);
        Route::get('/vaccinations', [VaccinationsController::class, 'index']);

        // User Doctor
        Route::get('/doctor/consultations', [DoctorController::class, 'getConsultation']);
        Route::get('/doctor/consultations/{id}', [DoctorController::class, 'showConsultation']);
        Route::put('/doctor/consultations/{id}', [DoctorController::class, 'updateConsultation']);

        Route::get('/doctor/first', [DoctorController::class, 'getFirstVaccination']);
        Route::get('/doctor/second', [DoctorController::class, 'getSecondVaccination']);

        Route::put('/doctor/first/{id}', [DoctorController::class, 'updateFirstVaccination']);
        Route::put('/doctor/second/{id}', [DoctorController::class, 'updateSecondVaccination']);
        
        Route::get('/doctor/first/{id}', [DoctorController::class, 'showVaccination']);
        Route::get('/doctor/officer/{id}', [DoctorController::class, 'getOfficer']);
        Route::get('/doctor/vaccine/{id}', [DoctorController::class, 'getVaccine']);
    });
});