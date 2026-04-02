<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PortfolioProject;
use App\Models\SiteProfile;
use App\Models\SkillGroup;
use App\Services\PortfolioContentService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContentDashboardController extends Controller
{
    public function index(Request $request, PortfolioContentService $portfolioContentService): Response
    {
        $portfolioContentService->ensureContentExists();

        $profile = SiteProfile::query()->first();

        return Inertia::render('Admin/Content', [
            'authUser' => [
                'name' => $request->user()?->name,
                'email' => $request->user()?->email,
            ],
            'profile' => [
                'name' => $profile?->name ?? '',
                'title' => $profile?->title ?? '',
                'bio' => $profile?->bio ?? '',
                'philosophy' => $profile?->philosophy ?? '',
                'contacts' => [
                    'email' => $profile?->contacts['email'] ?? '',
                    'instagram' => $profile?->contacts['instagram'] ?? '',
                    'linkedin' => $profile?->contacts['linkedin'] ?? '',
                    'github' => $profile?->contacts['github'] ?? '',
                ],
                'passion' => $profile?->passion ?? [],
                'images' => $profile?->images ?? [],
                'resolvedImages' => $portfolioContentService->profile()['images'] ?? [],
            ],
            'skillGroups' => SkillGroup::query()
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get()
                ->map(fn (SkillGroup $group): array => [
                    'id' => $group->id,
                    'category' => $group->category,
                    'items' => $group->items ?? [],
                    'sort_order' => $group->sort_order,
                ])
                ->all(),
            'projects' => PortfolioProject::query()
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get()
                ->map(fn (PortfolioProject $project): array => [
                    'id' => $project->id,
                    'title' => $project->title,
                    'description' => $project->description,
                    'tech' => $project->tech ?? [],
                    'link' => $project->link,
                    'category' => $project->category,
                    'image' => $project->image,
                    'sort_order' => $project->sort_order,
                ])
                ->all(),
        ]);
    }
}
