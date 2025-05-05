<?php

use App\Http\Controllers\ProductController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;

Route::resource('products', ProductController::class)->except('destroy');
Route::prefix('products')->name('products.')->group(function () {
  Route::delete('{product}', [ProductController::class, 'destroy'])->name('destroy')->can('delete', Product::class);
  Route::put('{product}/update-operator', [ProductController::class, 'updateOperator'])->name('update-operator');
});
