<?php

namespace App\Services;

use App\Models\PortfolioProject;
use App\Models\SiteProfile;
use App\Models\SkillGroup;
use App\Support\PortfolioContentDefaults;
use Illuminate\Support\Facades\Schema;

class PortfolioContentService
{
    /**
     * @return array{profile: array<string, mixed>, skills: array<string, array<int, string>>, portfolios: array<int, array<string, mixed>>}
     */
    public function publicContent(): array
    {
        return [
            'profile' => $this->profile(),
            'skills' => $this->skills(),
            'portfolios' => $this->projects(),
        ];
    }

    public function ensureContentExists(): void
    {
        if ($this->hasTable('site_profiles') && ! SiteProfile::query()->exists()) {
            SiteProfile::query()->create(PortfolioContentDefaults::profile());
        }

        if ($this->hasTable('skill_groups') && ! SkillGroup::query()->exists()) {
            $skillGroups = PortfolioContentDefaults::skills();

            foreach (array_keys($skillGroups) as $index => $category) {
                SkillGroup::query()->create([
                    'category' => $category,
                    'items' => $skillGroups[$category],
                    'sort_order' => ($index + 1) * 10,
                ]);
            }
        }

        if ($this->hasTable('portfolio_projects') && ! PortfolioProject::query()->exists()) {
            foreach (PortfolioContentDefaults::projects() as $index => $project) {
                PortfolioProject::query()->create([
                    ...$project,
                    'sort_order' => ($index + 1) * 10,
                ]);
            }
        }
    }

    /**
     * @return array<string, mixed>
     */
    public function profile(): array
    {
        $profile = $this->hasTable('site_profiles')
            ? SiteProfile::query()->first()
            : null;

        $data = $profile instanceof SiteProfile
            ? $profile->toPublicArray()
            : PortfolioContentDefaults::profile();

        if (empty($data['images'])) {
            $data['images'] = $this->discoverProfileImages();
        }

        return $data;
    }

    /**
     * @return array<string, array<int, string>>
     */
    public function skills(): array
    {
        if (! $this->hasTable('skill_groups')) {
            return PortfolioContentDefaults::skills();
        }

        $groups = SkillGroup::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        if ($groups->isEmpty()) {
            return PortfolioContentDefaults::skills();
        }

        return $groups
            ->mapWithKeys(fn (SkillGroup $group): array => [$group->category => $group->items])
            ->all();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function projects(): array
    {
        if (! $this->hasTable('portfolio_projects')) {
            return PortfolioContentDefaults::projects();
        }

        $projects = PortfolioProject::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        if ($projects->isEmpty()) {
            return PortfolioContentDefaults::projects();
        }

        return $projects
            ->map(fn (PortfolioProject $project): array => $project->toPublicArray())
            ->all();
    }

    /**
     * @return array<int, string>
     */
    private function discoverProfileImages(): array
    {
        $images = [];
        $imgDir = storage_path('app/public/img');

        if (! is_dir($imgDir)) {
            return $images;
        }

        foreach (glob($imgDir.'/*.{jpg,jpeg,png,webp}', GLOB_BRACE) as $file) {
            $images[] = '/media/profile/'.rawurlencode(basename($file));
        }

        return $images;
    }

    private function hasTable(string $table): bool
    {
        return Schema::hasTable($table);
    }
}
