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

it('should only admin can update new product', function (string $role) {
  $this->user->roles()->detach();
  $this->user->giveRole($role);

  put(route('products.update', $this->product->id))
    ->assertForbidden();
})->with([
  Role::OPERATOR => [Role::OPERATOR],
  Role::USER => [Role::USER],
]);

it('should update product', function () {
  $category = Category::factory()->create();

  $data = [
      'name' => 'Dell Inspiron 15 Laptop',
      'description' => 'Laptop with Intel Core i5 processor, 8GB RAM, and 256GB SSD.',
      'category_id' => $category->id,
      'price' => 3499.90,
      'stock' => 25,
  ];

  put(route('products.update', [
    'product' => $this->product->id,
    ...$data
  ]))
    ->assertRedirect(route('products.index'));

  assertDatabaseHas(Product::class, [
    'id' => $this->product->id,
    ...$data,
    'sku' => "{$category->slug}-" . str($data['name'])->slug(),
  ]);
});

it('should validate the request', function (string $property, mixed $value, string $rule, array $attributes = []) {
  put(route('products.update', [
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
  'name:required' => ['name', '', 'required'],
  'name:max'      => ['name', str('a')->repeat(101)->toString(), 'max.string', [
    'max' => 100
  ]],

  'category_id:required' => ['category_id', '', 'required', [
    'attribute' => 'category id'
  ]],
  'category_id:exists'   => ['category_id', 9999, 'exists', [
    'attribute' => 'category id'
  ]],

  'price:required' => ['price', '', 'required'],
  'price:numeric'  => ['price', 'not-a-number', 'numeric'],
  'price:min'      => ['price', 0.5, 'min.numeric', [
    'min' => 1
  ]],

  'stock:required' => ['stock', '', 'required'],
  'stock:integer'  => ['stock', 3.5, 'integer'],
  'stock:min'      => ['stock', -1, 'min.numeric', [
    'min' => 0
  ]],
  'stock:max'      => ['stock', 99999999, 'max.numeric', [
    'max' => 9999999
  ]],
]);
