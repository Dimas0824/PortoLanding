<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSkillGroupRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category' => ['required', 'string', 'max:255'],
            'items' => ['required', 'array', 'min:1'],
            'items.*' => ['string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function skillGroupData(): array
    {
        return [
            'category' => (string) $this->string('category'),
            'items' => array_values(array_filter(array_map(
                fn (mixed $item): string => trim((string) $item),
                $this->input('items', [])
            ))),
            'sort_order' => (int) $this->integer('sort_order', 0),
        ];
    }
}
