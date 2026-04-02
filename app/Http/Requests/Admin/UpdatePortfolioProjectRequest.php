<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePortfolioProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'tech' => ['required', 'array', 'min:1'],
            'tech.*' => ['string', 'max:255'],
            'link' => ['nullable', 'url', 'max:2048'],
            'category' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'string', 'max:2048'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function projectData(): array
    {
        return [
            'title' => (string) $this->string('title'),
            'description' => (string) $this->string('description'),
            'tech' => array_values(array_filter(array_map(
                fn (mixed $item): string => trim((string) $item),
                $this->input('tech', [])
            ))),
            'link' => $this->filled('link') ? (string) $this->string('link') : null,
            'category' => $this->filled('category') ? (string) $this->string('category') : null,
            'image' => $this->filled('image') ? (string) $this->string('image') : null,
            'sort_order' => (int) $this->integer('sort_order', 0),
        ];
    }
}
