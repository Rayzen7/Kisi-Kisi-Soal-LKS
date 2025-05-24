<?php

use App\Http\Controllers\PenaltiesController;
use App\Http\Controllers\RentsController;
use App\Http\Controllers\ReturnsController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('/a1')->group(function() {
    Route::post('/register', [UsersController::class, 'register']);
    Route::post('/login', [UsersController::class, 'login']);

    Route::middleware('login')->group(function() {
        Route::get('/logout', [UsersController::class, 'logout']);
    });

    Route::middleware('auth')->group(function() {
        Route::get('/me', [UsersController::class, 'me']);
        Route::middleware('role:1')->group(function() {
            Route::get('/register', [UsersController::class, 'index']);
            Route::get('/register/{id}', [UsersController::class, 'show']);
            Route::put('/register/{id}', [UsersController::class, 'update']);
            Route::delete('/register/{id}', [UsersController::class, 'destroy']);

            Route::resource('/rent', RentsController::class);
            Route::resource('/penalties', PenaltiesController::class);
            Route::resource('/return', ReturnsController::class);
        });
    });
});
