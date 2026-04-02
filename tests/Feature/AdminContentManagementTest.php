<?php

namespace Tests\Feature;

use App\Models\PortfolioProject;
use App\Models\SiteProfile;
use App\Models\SkillGroup;
use App\Models\User;
use Illuminate\Foundation\Http\Middleware\ValidateCsrfToken;
use Tests\TestCase;

class AdminContentManagementTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        config()->set('database.default', 'sqlite');
        config()->set('database.connections.sqlite.database', ':memory:');
        config()->set('database.connections.sqlite.url', null);
        $this->app['db']->purge();

        $this->artisan('migrate:fresh', ['--force' => true]);
        $this->withoutMiddleware(ValidateCsrfToken::class);
    }

    public function test_guest_is_redirected_to_admin_login(): void
    {
        $response = $this->get('/admin');

        $response->assertRedirect('/admin/login');
    }

    public function test_first_admin_can_be_created_from_setup_page(): void
    {
        $response = $this->post('/admin/setup', [
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => 'secret123',
            'password_confirmation' => 'secret123',
        ]);

        $response->assertRedirect('/admin');
        $this->assertAuthenticated();
        $this->assertDatabaseHas('users', [
            'email' => 'admin@example.com',
        ]);
    }

    public function test_authenticated_admin_can_update_profile_and_create_content(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->put('/admin/profile', [
            'name' => 'Updated Name',
            'title' => 'Updated Title',
            'bio' => 'Updated biography',
            'philosophy' => 'Updated philosophy',
            'contacts' => [
                'email' => 'hello@example.com',
                'instagram' => 'https://instagram.com/example',
                'linkedin' => 'https://linkedin.com/in/example',
                'github' => 'https://github.com/example',
            ],
            'passion' => ['Backend', 'Automation'],
            'images' => ['https://example.com/profile.jpg'],
        ])->assertRedirect('/admin');

        $profile = SiteProfile::query()->firstOrFail();
        $this->assertSame('Updated Name', $profile->name);
        $this->assertSame(['Backend', 'Automation'], $profile->passion);

        $this->post('/admin/skills', [
            'category' => 'Infrastructure',
            'items' => ['Docker', 'Nginx'],
            'sort_order' => 99,
        ])->assertRedirect('/admin');

        $this->post('/admin/projects', [
            'title' => 'Admin Added Project',
            'description' => 'A new project managed from admin panel.',
            'tech' => ['Laravel', 'Inertia'],
            'link' => 'https://github.com/example/project',
            'category' => 'Laravel',
            'image' => 'https://example.com/project.jpg',
            'sort_order' => 77,
        ])->assertRedirect('/admin');

        $this->assertDatabaseHas('skill_groups', [
            'category' => 'Infrastructure',
        ]);
        $this->assertDatabaseHas('portfolio_projects', [
            'title' => 'Admin Added Project',
        ]);

        $this->assertNotNull(SkillGroup::query()->where('category', 'Infrastructure')->first());
        $this->assertNotNull(PortfolioProject::query()->where('title', 'Admin Added Project')->first());
    }
}
