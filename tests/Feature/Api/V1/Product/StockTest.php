<?php

use App\Models\Product;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\getJson;

beforeEach(function () {
  /** @var User $user */
  $this->user = User::factory()->create();

  actingAs($this->user);
});

it('should be able to get product stock', function () {
  $product = Product::factory()->create();

  getJson(route('v1.products.stock', ['product' => $product]))
    ->assertOk()
    ->assertJsonStructure([
      'message',
      'status',
      'content' => [
        'id',
        'stock',
      ],
    ])
    ->assertJson([
      'content' => [
        'id'    => $product->id,
        'stock' => $product->stock,
      ],
    ]);
});
