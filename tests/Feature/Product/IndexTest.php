<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\Role;
use App\Models\User;
use Database\Seeders\CategorySeeder;
use Inertia\Testing\AssertableInertia;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\seed;

beforeEach(function () {
  /** @var User $user */
  $this->user = User::factory()->create();

  actingAs($this->user);
});

it('should list products paginated', function () {
  Product::factory()->count(30)->create();

  $products = Product::query()->orderByDesc('id')->get();

  $pages = $products->chunk(15)->values();

  foreach ($pages as $index => $pagination) {
    $pagination = $pagination->values();

    get(route('products.index', ['page' => $index + 1]))
      ->assertOk()
      ->assertInertia(function (AssertableInertia $page) use ($pagination) {
        return $page
          ->component('products/index')
          ->has('products.data', function ($page) use ($pagination) {
            foreach ($pagination as $index => $product) {
              $page->where($index . '.id', $product->id)
                ->where($index . '.name', $product->name)
                ->where($index . '.sku', $product->sku)
                ->where($index . '.price', number_format($product->price, 2, '.', ''))
                ->where($index . '.stock', $product->stock);
            }
          });
      });
  }
});

it('should list products by filter', function (string $filter, string $column) {
  $products = Product::factory()
    ->count(3)
    ->sequence(
      ['category_id' => Category::factory()->create(['name' => 'Category 1']), 'name' => 'Product 1'],
      ['category_id' => Category::factory()->create(['name' => 'Category 2']), 'name' => 'Product 2'],
      ['category_id' => Category::factory()->create(['name' => 'Category 3']), 'name' => 'Product 3'],
    )
    ->create();

  foreach ($products as $product) {
    get(route('products.index', [
      $filter => $product->{$column},
    ]))
      ->assertOk()
      ->assertInertia(function (AssertableInertia $page) use ($product) {
        return $page
          ->component('products/index')
          ->count('products.data', 1)
          ->has('products.data', function ($page) use ($product) {
              $page->where('0.id', $product->id)
                ->where('0.name', $product->name)
                ->where('0.sku', $product->sku)
                ->where('0.price', number_format($product->price, 2, '.', ''))
                ->where('0.stock', $product->stock);
          });
      });
  }
})->with([
  'filter::category' => [
    'category', 'category_id'
  ],
  'filter::search' => [
    'search', 'name'
  ],
]);

it('should list categories', function () {
  seed(CategorySeeder::class);

  $categories = Category::query()->toBase()->select('id', 'name')->orderBy('name')->pluck('name', 'id');

  get(route('products.index'))
    ->assertOk()
    ->assertInertia(function (AssertableInertia $page) use ($categories) {
      return $page
        ->component('products/index')
        ->has('categories', function ($page) use ($categories) {
          foreach ($categories as $id => $category) {
            $page->where($id, $category);
          }
        });
    });
});

it('should list user permissions', function (array $permission) {
  $this->user->giveManyRoles(...$permission['roles']);

  get(route('products.index'))
    ->assertOk()
    ->assertInertia(function (AssertableInertia $page) use ($permission) {
      return $page
        ->component('products/index')
        ->has('can', function ($page) use ($permission) {
          unset($permission['roles']);
          foreach ($permission as $can => $value) {
            $page->where($can, $value);
          }
        });
    });
})->with([
  Role::ADMIN => [[
    'roles' => [Role::ADMIN, Role::OPERATOR],
    'create' => true,
    'update' => true,
    'delete' => true,
    'update_operator' => true,
  ]],
  Role::OPERATOR => [[
    'roles' => [Role::OPERATOR],
    'create' => false,
    'update' => false,
    'delete' => false,
    'update_operator' => true,
  ]],
  Role::USER => [[
    'roles' => [Role::USER],
    'create' => false,
    'update' => false,
    'delete' => false,
    'update_operator' => false,
  ]],
]);
