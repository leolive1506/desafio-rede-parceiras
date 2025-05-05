<?php

use App\Models\Product;
use App\Models\User;
use Inertia\Testing\AssertableInertia;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

beforeEach(function () {
  /** @var User $user */
  $this->user = User::factory()->create();

  actingAs($this->user);
});

it('should see product details', function () {
  $product = Product::factory()->create()->load('category');

  get(route('products.show', $product->sku))
    ->assertOk()
    ->assertInertia(function (AssertableInertia $page) use ($product) {
      return $page
        ->component('products/show')
        ->has('product', function ($page) use ($product) {
            $page
              ->where('id', $product->id)
              ->where('category_id', $product->category_id)
              ->where('name', $product->name)
              ->where('price', number_format($product->price, 2, '.', ''))
              ->where('sku', $product->sku)
              ->where('stock', $product->stock)
              ->where('description', $product->description)
              ->where('created_at', $product->created_at->toISOString())
              ->where('updated_at', $product->updated_at->toISOString())
              ->where('category.id', $product->category->id)
              ->where('category.name', $product->category->name);
        });
    });
});
