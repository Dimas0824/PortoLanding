<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'title',
        'bio',
        'philosophy',
        'contacts',
        'passion',
        'images',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'contacts' => 'array',
            'passion' => 'array',
            'images' => 'array',
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function toPublicArray(): array
    {
        return [
            'name' => $this->name,
            'title' => $this->title,
            'bio' => $this->bio,
            'philosophy' => $this->philosophy,
            'contacts' => $this->contacts ?? [],
            'passion' => $this->passion ?? [],
            'images' => $this->images ?? [],
        ];
    }
}
