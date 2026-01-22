<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $base = config('app.url') ?: url('/');
        $now = now()->toAtomString();

        $urls = [
            [
                'loc' => rtrim($base, '/') . '/',
                'lastmod' => $now,
                'changefreq' => 'weekly',
                'priority' => '1.0',
            ],
        ];

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . PHP_EOL;

        foreach ($urls as $u) {
            $xml .= "  <url>" . PHP_EOL;
            $xml .= "    <loc>" . e($u['loc']) . "</loc>" . PHP_EOL;
            $xml .= "    <lastmod>" . $u['lastmod'] . "</lastmod>" . PHP_EOL;
            $xml .= "    <changefreq>" . $u['changefreq'] . "</changefreq>" . PHP_EOL;
            $xml .= "    <priority>" . $u['priority'] . "</priority>" . PHP_EOL;
            $xml .= "  </url>" . PHP_EOL;
        }

        $xml .= '</urlset>';

        return response($xml, 200)->header('Content-Type', 'application/xml');
    }
}
