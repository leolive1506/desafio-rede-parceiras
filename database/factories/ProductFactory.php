<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'description' => fake()->text(),
            'price' => fake()->numberBetween(100, 10000),
            'stock' => fake()->randomDigit(),
            'category_id' => Category::factory(),
            'sku' => function (array $attributes) {
                $category = Category::find($attributes['category_id']);

                $slug = str($attributes['name'])->slug();

                return "{$category->slug}-{$slug}";
            },
        ];
    }
}
