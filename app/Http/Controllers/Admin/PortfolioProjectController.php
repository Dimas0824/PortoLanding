<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePortfolioProjectRequest;
use App\Http\Requests\Admin\UpdatePortfolioProjectRequest;
use App\Models\PortfolioProject;
use App\Services\PortfolioContentService;
use Illuminate\Http\RedirectResponse;

class PortfolioProjectController extends Controller
{
    public function store(StorePortfolioProjectRequest $request, PortfolioContentService $portfolioContentService): RedirectResponse
    {
        $portfolioContentService->ensureContentExists();

        PortfolioProject::query()->create($request->projectData());

        return redirect('/admin')->with('success', 'Project berhasil ditambahkan.');
    }

    public function update(UpdatePortfolioProjectRequest $request, PortfolioProject $portfolioProject): RedirectResponse
    {
        $portfolioProject->update($request->projectData());

        return redirect('/admin')->with('success', 'Project berhasil diperbarui.');
    }

    public function destroy(PortfolioProject $portfolioProject): RedirectResponse
    {
        $portfolioProject->delete();

        return redirect('/admin')->with('success', 'Project berhasil dihapus.');
    }
}
