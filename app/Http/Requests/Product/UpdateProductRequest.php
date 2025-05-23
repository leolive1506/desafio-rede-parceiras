<?php

namespace App\Http\Requests\Product;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', Product::class);
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100', Rule::unique(Product::class)->ignore($this->product)],
            'description' => ['nullable', 'string'],
            'category_id' => ['required', Rule::exists(Category::class, 'id')],
            'price' => ['required', 'numeric', 'min:1', 'max:99999999.99'],
            'stock' => ['required', 'integer', 'min:0', 'max:9999999'],
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
