<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\IndexProductRequest;
use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateOperatorProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;

class ProductController extends Controller
{
    public function index(IndexProductRequest $request)
    {
        $user = $request->user();
        $filters = $request->validated();
        $search = data_get($filters, 'search');

        return inertia('products/index', [
            'can' => [
                'create' => $user->can('create', Product::class),
                'update' => $user->can('update', Product::class),
                'delete' => $user->can('delete', Product::class),
                'update_operator' => $user->can('updateOperator', Product::class),
            ],
            'products' => Product::query()
                ->select(['id', 'category_id', 'name', 'price', 'sku', 'description', 'stock'])
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

    public function show(string $sku)
    {
        $product = Product::query()
            ->with('category:id,name')
            ->where('sku', $sku)
            ->select(['id', 'category_id', 'name', 'price', 'sku', 'stock', 'description', 'created_at', 'updated_at'])
            ->firstOrFail();

        return inertia('products/show', compact('product'));
    }

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

    public function update(UpdateProductRequest $request, string $id)
    {
        $product = Product::query()->select(['id', 'name', 'category_id'])->findOrFail($id);

        $data = $request->validated();

        if ($product->name !== data_get($data, 'name') || $product->category_id !== data_get($data, 'category_id')) {
            $category = Category::toBase()->select(['id', 'slug'])->find(data_get($data, 'category_id'));

            $slug = str(data_get($data, 'name'))->slug();

            $data['sku'] = "{$category->slug}-{$slug}";
        }

        $product->update($data);

        return to_route('products.index');
    }

    public function updateOperator(UpdateOperatorProductRequest $request, string $id)
    {
        Product::query()->where('id', $id)->update($request->validated());

        return to_route('products.index');
    }

    public function destroy(string $id)
    {
        Product::where('id', $id)->delete();

        return to_route('products.index');
    }
}
