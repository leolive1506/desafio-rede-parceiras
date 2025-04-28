<?php

use App\Http\Controllers\Api\V1\Auth\AuthController;
use Illuminate\Support\Facades\Route;

Route::name('auth.')->group(function () {
    Route::post('/register', [AuthController::class, 'register'])
    ->middleware('guest')
    ->name('register');

    Route::post('/login', [AuthController::class, 'login'])
        ->middleware('guest')
        ->name('login');

    Route::post('/logout', [AuthController::class, 'destroy'])
        ->middleware('auth:sanctum')
        ->name('logout');

    Route::get('/me', [AuthController::class, 'me'])
        ->middleware('auth:sanctum')
        ->name('me');
});
