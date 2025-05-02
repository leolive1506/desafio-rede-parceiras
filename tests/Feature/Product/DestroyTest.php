<?php

use App\Models\Product;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertSoftDeleted;
use function Pest\Laravel\delete;

beforeEach(function () {
  /** @var User $user */
  $this->user = User::factory()->asAdmin()->create();
  $this->product = Product::factory()->create();

  actingAs($this->user);
});

it('should only admin can create new product', function () {
  $this->user->roles()->detach();

  delete(route('products.destroy', $this->product->id))
    ->assertForbidden();
});

it('should delete product', function () {
  delete(route('products.destroy', [
    'product' => $this->product->id
  ]))
    ->assertRedirect(route('products.index'));

  assertSoftDeleted(Product::class, [
    'id' => $this->product->id
  ]);
});
