<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreSkillGroupRequest;
use App\Http\Requests\Admin\UpdateSkillGroupRequest;
use App\Models\SkillGroup;
use App\Services\PortfolioContentService;
use Illuminate\Http\RedirectResponse;

class SkillGroupController extends Controller
{
    public function store(StoreSkillGroupRequest $request, PortfolioContentService $portfolioContentService): RedirectResponse
    {
        $portfolioContentService->ensureContentExists();

        SkillGroup::query()->create($request->skillGroupData());

        return redirect('/admin')->with('success', 'Skill group berhasil ditambahkan.');
    }

    public function update(UpdateSkillGroupRequest $request, SkillGroup $skillGroup): RedirectResponse
    {
        $skillGroup->update($request->skillGroupData());

        return redirect('/admin')->with('success', 'Skill group berhasil diperbarui.');
    }

    public function destroy(SkillGroup $skillGroup): RedirectResponse
    {
        $skillGroup->delete();

        return redirect('/admin')->with('success', 'Skill group berhasil dihapus.');
    }
}
