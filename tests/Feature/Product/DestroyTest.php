<?php

use App\Models\Product;
use App\Models\Role;
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

it('should only admin can delete product', function (string $role) {
  $this->user->roles()->detach();
  $this->user->giveRole($role);

  delete(route('products.destroy', $this->product->id))
    ->assertForbidden();
})->with([
  Role::OPERATOR => [Role::OPERATOR],
  Role::USER => [Role::USER],
]);

it('should delete product', function () {
  delete(route('products.destroy', [
    'product' => $this->product->id
  ]))
    ->assertRedirect(route('products.index'));

  assertSoftDeleted(Product::class, [
    'id' => $this->product->id
  ]);
});
