<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\IndexProductRequest;
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
                ->paginate(),
            'categories' => Category::query()->toBase()->select('id', 'name')->orderBy('name')->pluck('name', 'id'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
