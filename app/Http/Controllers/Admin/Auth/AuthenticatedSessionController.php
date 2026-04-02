<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LoginRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    public function create(Request $request): Response|RedirectResponse
    {
        if (! User::query()->exists()) {
            return redirect('/admin/setup');
        }

        if ($request->user()) {
            return redirect('/admin');
        }

        return Inertia::render('Admin/Login');
    }

    public function store(LoginRequest $request): RedirectResponse
    {
        $credentials = $request->credentials();

        if (! Auth::attempt([
            'email' => $credentials['email'],
            'password' => $credentials['password'],
        ], $credentials['remember'])) {
            return back()->withErrors([
                'email' => 'Kombinasi email dan password tidak cocok.',
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended('/admin');
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/admin/login');
    }
}
