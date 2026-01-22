<?php

namespace App\Services;

use Illuminate\Support\Arr;

class SeoService
{
    /**
     * Build meta data array for a page.
     *
     * @param  array  $overrides
     * @return array
     */
    public function meta(array $overrides = []): array
    {
        $defaults = [
            'title' => config('app.name', 'Portfolio'),
            'description' => config('app.description', ''),
            'canonical' => rtrim(config('app.url', url('/')), '/') . '/',
            'og' => [
                'type' => 'website',
                'image' => null,
            ],
            'twitter' => [
                'card' => 'summary_large_image',
            ],
        ];

        return array_replace_recursive($defaults, $overrides);
    }

    /**
     * Build basic JSON-LD structured data for a person and their webpage.
     *
     * @param  array  $opts
     * @return array
     */
    public function jsonLd(array $opts = []): array
    {
        $name = Arr::get($opts, 'name', config('app.name'));
        $description = Arr::get($opts, 'description', config('app.description'));
        $url = Arr::get($opts, 'url', rtrim(config('app.url', url('/')), '/') . '/');
        $image = Arr::get($opts, 'image');
        $sameAs = Arr::get($opts, 'sameAs', []);

        $person = array_filter([
            '@type' => 'Person',
            'name' => $name,
            'description' => $description,
            'url' => $url,
            'image' => $image,
            'sameAs' => $sameAs,
        ]);

        $webpage = [
            '@type' => 'WebPage',
            'name' => $name,
            'description' => $description,
            'url' => $url,
        ];

        return [
            '@context' => 'https://schema.org',
            '@graph' => [$person, $webpage],
        ];
    }
}
