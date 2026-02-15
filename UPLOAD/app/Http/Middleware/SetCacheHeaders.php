<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SetCacheHeaders
{
    /**
     * Handle an incoming request and set cache headers for static assets.
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Only set for successful responses and GET requests
        if ($request->isMethod('get') && $response->isSuccessful()) {
            // Short TTL for HTML pages, long TTL for assets
            $path = $request->path();
            if (preg_match('/\.(css|js|png|jpg|jpeg|webp|svg|woff2?)$/i', $path)) {
                $response->headers->set('Cache-Control', 'public, max-age=' . (60 * 60 * 24 * 30)); // 30 days
            } else {
                $response->headers->set('Cache-Control', 'public, max-age=' . (60 * 5)); // 5 minutes
            }
        }

        return $response;
    }
}
