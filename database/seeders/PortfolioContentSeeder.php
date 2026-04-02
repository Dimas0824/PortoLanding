<?php

namespace Database\Seeders;

use App\Services\PortfolioContentService;
use Illuminate\Database\Seeder;

class PortfolioContentSeeder extends Seeder
{
    public function run(): void
    {
        app(PortfolioContentService::class)->ensureContentExists();
    }
}
