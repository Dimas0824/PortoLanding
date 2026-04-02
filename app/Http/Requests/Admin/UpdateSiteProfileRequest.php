<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSiteProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'bio' => ['required', 'string'],
            'philosophy' => ['nullable', 'string', 'max:255'],
            'contacts' => ['required', 'array'],
            'contacts.email' => ['nullable', 'email', 'max:255'],
            'contacts.instagram' => ['nullable', 'string', 'max:2048'],
            'contacts.linkedin' => ['nullable', 'string', 'max:2048'],
            'contacts.github' => ['nullable', 'string', 'max:2048'],
            'passion' => ['nullable', 'array'],
            'passion.*' => ['string', 'max:255'],
            'images' => ['nullable', 'array'],
            'images.*' => ['string', 'max:2048'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama profile wajib diisi.',
            'title.required' => 'Headline wajib diisi.',
            'bio.required' => 'Bio wajib diisi.',
            'contacts.email.email' => 'Email kontak tidak valid.',
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function profileData(): array
    {
        return [
            'name' => (string) $this->string('name'),
            'title' => (string) $this->string('title'),
            'bio' => (string) $this->string('bio'),
            'philosophy' => $this->filled('philosophy') ? (string) $this->string('philosophy') : null,
            'contacts' => array_filter($this->input('contacts', []), fn (mixed $value): bool => filled($value)),
            'passion' => $this->cleanList($this->input('passion', [])),
            'images' => $this->cleanList($this->input('images', [])),
        ];
    }

    /**
     * @param  array<int, mixed>  $items
     * @return array<int, string>
     */
    private function cleanList(array $items): array
    {
        return array_values(array_filter(array_map(
            fn (mixed $item): string => trim((string) $item),
            $items
        )));
    }
}
