<?php

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->name('v1.')->group(function () {
    require __DIR__.'/auth.php';
    require __DIR__.'/product.php';
});

