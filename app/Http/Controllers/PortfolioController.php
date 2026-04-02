<?php

namespace App\Http\Controllers;

use App\Services\PortfolioContentService;
use App\Services\SeoService;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function index(PortfolioContentService $portfolioContentService): Response
    {
        ['profile' => $profile, 'skills' => $skills, 'portfolios' => $portfolios] = $portfolioContentService->publicContent();

        $seo = new SeoService;
        $meta = $seo->meta([
            'title' => 'Irsyad Dimas'.' · '.($profile['title'] ?? 'Portfolio'),
            'description' => $profile['bio'] ?? null,
            'og' => [
                'image' => $profile['images'][0] ?? null,
            ],
            'canonical' => rtrim(config('app.url', url('/')), '/').'/',
        ]);

        $jsonLd = $seo->jsonLd([
            'name' => 'Irsyad Dimas',
            'description' => $profile['bio'] ?? null,
            'url' => rtrim(config('app.url', url('/')), '/').'/',
            'image' => $profile['images'][0] ?? null,
            'sameAs' => array_values($profile['contacts'] ?? []),
        ]);

        return Inertia::render('Portfolio', array_merge(compact('profile', 'skills', 'portfolios'), [
            'seo' => [
                'meta' => $meta,
                'jsonLd' => $jsonLd,
            ],
        ]));
    }

    public function profileImage(string $filename)
    {
        $filename = basename(rawurldecode($filename));
        $path = storage_path('app/public/img/'.$filename);

        if (! is_file($path)) {
            abort(404);
        }

        return response()->file($path, [
            'Cache-Control' => 'public, max-age=604800',
        ]);
    }
}
