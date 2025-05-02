<?php

use App\Http\Controllers\Api\V1\Product\ProductController;
use Illuminate\Support\Facades\Route;

Route::name('products.')->middleware('auth:sanctum')->group(function () {
    Route::get('{product}/stock', [ProductController::class, 'stock'])
        ->name('stock');
});
