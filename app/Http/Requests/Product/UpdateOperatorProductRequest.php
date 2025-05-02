<?php

namespace App\Http\Requests\Product;

use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;

class UpdateOperatorProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('updateOperator', Product::class);
    }

    public function rules(): array
    {
        return [
            'stock' => ['required', 'integer', 'min:0', 'max:9999999'],
        ];
    }
}
