<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateSiteProfileRequest;
use App\Models\SiteProfile;
use App\Services\PortfolioContentService;
use Illuminate\Http\RedirectResponse;

class SiteProfileController extends Controller
{
    public function update(UpdateSiteProfileRequest $request, PortfolioContentService $portfolioContentService): RedirectResponse
    {
        $portfolioContentService->ensureContentExists();

        SiteProfile::query()->firstOrFail()->update($request->profileData());

        return redirect('/admin')->with('success', 'Profile berhasil diperbarui.');
    }
}
