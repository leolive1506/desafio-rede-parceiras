<?php

namespace App\Http\Requests\Product;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', Rule::unique(Product::class)],
            'description' => ['nullable', 'string'],
            'category_id' => ['required', Rule::exists(Category::class, 'id')],
            'price' => ['required', 'numeric', 'min:1'],
            'stock' => ['required', 'integer', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.unique' => __('validation.unique', [
                'attribute' => 'product',
            ]),
        ];
    }
}
