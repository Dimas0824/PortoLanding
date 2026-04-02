<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PortfolioProject extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'tech',
        'link',
        'category',
        'image',
        'sort_order',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tech' => 'array',
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function toPublicArray(): array
    {
        return [
            'title' => $this->title,
            'description' => $this->description,
            'tech' => $this->tech ?? [],
            'link' => $this->link,
            'category' => $this->category,
            'image' => $this->image,
        ];
    }
}
