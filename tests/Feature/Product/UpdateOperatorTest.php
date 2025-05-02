<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\Role;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\put;

beforeEach(function () {
  /** @var User $user */
  $this->user = User::factory()->asAdmin()->create();
  $this->product = Product::factory()->create();

  actingAs($this->user);
});

it('should only user with operator role can update product', function () {
  $this->user->roles()->detach();

  put(route('products.update-operator', $this->product->id))
    ->assertForbidden();
})->with([
  Role::USER => [Role::USER],
]);

it('should update product', function () {
  $data = [
      'stock' => 25,
  ];

  put(route('products.update-operator', [
    'product' => $this->product->id,
    ...$data
  ]))
    ->assertRedirect(route('products.index'));

  assertDatabaseHas(Product::class, [
    'id' => $this->product->id,
    ...$data,
  ]);
});

it('should validate the request', function (string $property, mixed $value, string $rule, array $attributes = []) {
  put(route('products.update-operator', [
    'product' => $this->product->id,
    $property => $value,
  ]))
    ->assertSessionHasErrors([
        $property => __("validation.{$rule}", [
          'attribute' => $property,
          ...$attributes
        ]),
    ]);
})->with([
  'stock:required' => ['stock', '', 'required'],
  'stock:integer'  => ['stock', 3.5, 'integer'],
  'stock:min'      => ['stock', -1, 'min.numeric', [
    'min' => 0
  ]],
  'stock:max'      => ['stock', 99999999, 'max.numeric', [
    'max' => 9999999
  ]],
]);
