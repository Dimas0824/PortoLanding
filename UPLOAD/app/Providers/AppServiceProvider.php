<?php

namespace App\Providers;
use Illuminate\Support\Facades\URL;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        if (config('app.env') !== 'local') {
            URL::forceScheme('https');
        }

        // Share SEO defaults globally via Inertia (if Inertia is present)
        if (class_exists(\Inertia\Inertia::class)) {
            \Inertia\Inertia::share('seo.defaults', (new \App\Services\SeoService())->meta());
        }
    }
}
