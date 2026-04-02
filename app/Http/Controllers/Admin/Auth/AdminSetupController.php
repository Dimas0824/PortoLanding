<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SetupAdminRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AdminSetupController extends Controller
{
    public function create(): Response|RedirectResponse
    {
        if (User::query()->exists()) {
            return redirect('/admin/login');
        }

        return Inertia::render('Admin/Setup');
    }

    public function store(SetupAdminRequest $request): RedirectResponse
    {
        if (User::query()->exists()) {
            return redirect('/admin/login');
        }

        $user = User::query()->create($request->validated());

        Auth::login($user);
        $request->session()->regenerate();

        return redirect('/admin')->with('success', 'Admin pertama berhasil dibuat.');
    }
}
