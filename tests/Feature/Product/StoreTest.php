<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\Role;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertDatabaseMissing;
use function Pest\Laravel\post;

beforeEach(function () {
  /** @var User $user */
  $this->user = User::factory()->asAdmin()->create();

  actingAs($this->user);
});

it('should only admin can create new product', function (string $role) {
  $this->user->roles()->detach();
  $this->user->giveRole($role);

  post(route('products.store'))
    ->assertForbidden();
})->with([
  Role::OPERATOR => [Role::OPERATOR],
  Role::USER => [Role::USER],
]);

it('should create new product', function () {
  $category = Category::factory()->create();

  $data = [
      'name' => 'Dell Inspiron 15 Laptop',
      'description' => 'Laptop with Intel Core i5 processor, 8GB RAM, and 256GB SSD.',
      'category_id' => $category->id,
      'price' => 3499.90,
      'stock' => 25,
  ];

  post(route('products.store', $data))
    ->assertRedirect(route('products.index'));

  assertDatabaseHas(Product::class, [
    'id' => 1,
    ...$data,
    'sku' => "{$category->slug}-" . str($data['name'])->slug(),
  ]);
});

it('should validate the request', function (string $property, mixed $value, string $rule, array $attributes = []) {
  post(route('products.store', [
    $property => $value,
  ]))
    ->assertSessionHasErrors([
        $property => __("validation.{$rule}", [
          'attribute' => $property,
          ...$attributes
        ]),
    ]);

  assertDatabaseMissing(Product::class);
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
  'price:max'      => ['price', 999999999.99, 'max.numeric', [
    'max' => 99999999.99
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
