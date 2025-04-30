<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\IndexProductRequest;
use App\Http\Requests\Product\StoreProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(IndexProductRequest $request)
    {
        $filters = $request->validated();

        $search = data_get($filters, 'search');

        return inertia('products/index', [
            'products' => Product::query()
                ->select(['id', 'category_id', 'name', 'price', 'sku', 'description'])
                ->when(filled($search), function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                })
                ->when(filled(data_get($filters, 'category')), function ($query) use ($filters) {
                    $query->where('category_id', data_get($filters, 'category'));
                })
                ->orderByDesc('id')
                ->paginate(),
            'categories' => Category::query()->toBase()->select('id', 'name')->orderBy('name')->pluck('name', 'id'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();

        $category = Category::toBase()->select(['id', 'slug'])->find(data_get($data, 'category_id'));

        $slug = str(data_get($data, 'name'))->slug();

        $sku = "{$category->slug}-{$slug}";

        Product::query()->create([
            ...$data,
            'sku' => $sku,
        ]);

        return to_route('products.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
