<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    require __DIR__.'/web/product.php';
    require __DIR__.'/web/settings.php';
});

require __DIR__.'/web/auth.php';
