<?php

use App\Http\Controllers\Admin\Auth\AdminSetupController;
use App\Http\Controllers\Admin\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\ContentDashboardController;
use App\Http\Controllers\Admin\PortfolioProjectController;
use App\Http\Controllers\Admin\SiteProfileController;
use App\Http\Controllers\Admin\SkillGroupController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PortfolioController::class, 'index'])->name('home');
Route::get('/media/profile/{filename}', [PortfolioController::class, 'profileImage'])
    ->where('filename', '.*')
    ->name('media.profile');

Route::get('/health', fn () => response()->json([
    'status' => 'ok',
    'app' => config('app.name'),
    'env' => config('app.env'),
    'version' => config('app.version', '1.0.0'),
    'time' => now()->toIso8601String(),
]));

// Contact form endpoint used by the React component
Route::post('/contact/send', [ContactController::class, 'send'])->name('contact.send');

Route::get('/admin/login', [AuthenticatedSessionController::class, 'create'])
    ->middleware('guest')
    ->name('login');

Route::post('/admin/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest');

Route::get('/admin/setup', [AdminSetupController::class, 'create'])
    ->middleware('guest')
    ->name('admin.setup');

Route::post('/admin/setup', [AdminSetupController::class, 'store'])
    ->middleware('guest');

Route::middleware('auth')->prefix('admin')->group(function (): void {
    Route::get('/', [ContentDashboardController::class, 'index'])->name('admin.dashboard');
    Route::put('/profile', [SiteProfileController::class, 'update'])->name('admin.profile.update');
    Route::post('/skills', [SkillGroupController::class, 'store'])->name('admin.skills.store');
    Route::put('/skills/{skillGroup}', [SkillGroupController::class, 'update'])->name('admin.skills.update');
    Route::delete('/skills/{skillGroup}', [SkillGroupController::class, 'destroy'])->name('admin.skills.destroy');
    Route::post('/projects', [PortfolioProjectController::class, 'store'])->name('admin.projects.store');
    Route::put('/projects/{portfolioProject}', [PortfolioProjectController::class, 'update'])->name('admin.projects.update');
    Route::delete('/projects/{portfolioProject}', [PortfolioProjectController::class, 'destroy'])->name('admin.projects.destroy');
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('admin.logout');
});

Route::fallback(function () {
    $response = Inertia::render('Errors/NotFound');

    return $response->toResponse(request())->setStatusCode(404);
});

// Sitemap
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');
