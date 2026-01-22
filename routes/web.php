<?php

use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PortfolioController::class, 'index'])->name('home');

Route::get('/health', fn() => response()->json([
    'status' => 'ok',
    'app' => config('app.name'),
    'env' => config('app.env'),
    'version' => config('app.version', '1.0.0'),
    'time' => now()->toIso8601String(),
]));

// Contact form endpoint used by the React component
Route::post('/contact/send', [ContactController::class, 'send'])->name('contact.send');

Route::fallback(function () {
    $response = Inertia::render('Errors/NotFound');
    return $response->toResponse(request())->setStatusCode(404);
});

// Sitemap
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');
