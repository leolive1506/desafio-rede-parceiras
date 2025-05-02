<?php

namespace App\Http\Controllers\Api\V1\Product;

use App\Http\Controllers\Api\ApiController;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends ApiController
{
    public function stock(Request $request, string $id)
    {
        $product = Product::query()->select(['id', 'stock'])->findOrFail($id);

        return $this->success($product);
    }
}
