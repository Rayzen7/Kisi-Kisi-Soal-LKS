<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GamesController;
use App\Http\Controllers\ScoreController;
use App\Http\Controllers\SlugController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('/v1')->group(function() {
    Route::prefix('/auth')->group(function() {
        Route::post('/signup', [AuthController::class, 'signup']);
        Route::post('/signin', [AuthController::class, 'signin']);
        Route::post('/signout', [AuthController::class, 'signout'])->middleware('auth');
    });   
    
    Route::middleware('auth')->group(function() {
        Route::middleware('admin')->group(function() {
            Route::prefix('/admin')->group(function() {
                Route::resource('/admins', AdminController::class);
                Route::resource('/users', UserController::class);
            });
        });
    
        Route::middleware('author')->group(function() {
            Route::resource('/games', GamesController::class);

            Route::post('/games/{slug}/upload', [SlugController::class, 'store']);

            Route::get('/games/{slug}/scores', [ScoreController::class, 'index']);
            Route::post('/games/{slug}/scores', [ScoreController::class, 'store']);
        });

        Route::middleware('player')->group(function() {
            Route::prefix('/users')->group(function() {
                Route::get('/{username}', [UserController::class, 'showUser']);
            });
        });
    });
});