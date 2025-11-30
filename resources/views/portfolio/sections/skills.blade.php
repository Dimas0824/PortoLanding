<section id="skills" class="py-20 relative overflow-hidden">
    <!-- Animated Background decoration -->
    <div class="absolute inset-0 -z-10 pointer-events-none">
        <div
            class="absolute top-1/4 -left-48 w-96 h-96 bg-[#f53003]/5 dark:bg-[#f53003]/10 rounded-full blur-3xl animate-pulse">
        </div>
        <div class="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#F8B803]/5 dark:bg-[#F8B803]/10 rounded-full blur-3xl animate-pulse"
            style="animation-delay: 1s;"></div>
        <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#f53003]/5 to-[#F8B803]/5 rounded-full blur-3xl animate-spin-slow opacity-30">
        </div>
    </div>

    <!-- Floating particles effect -->
    <div class="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        @for ($i = 0; $i < 20; $i++)
            <div class="floating-particle absolute w-2 h-2 bg-gradient-to-r from-[#f53003] to-[#F8B803] rounded-full opacity-20"
                style="left: {{ rand(0, 100) }}%; top: {{ rand(0, 100) }}%; animation-delay: {{ $i * 0.5 }}s; animation-duration: {{ rand(15, 30) }}s;">
            </div>
        @endfor
    </div>

    <div class="max-w-7xl mx-auto px-4">
        <!-- Header Section: clean and formal -->
        <div class="text-center mb-16">
            <h2 class="text-3xl lg:text-5xl font-bold mb-4 text-[#1b1b18] dark:text-[#eeeeec]">Skills & Technologies
            </h2>
            <p class="text-base text-[#706f6c] dark:text-[#A1A09A] max-w-2xl mx-auto leading-relaxed">
                Overview of my technical expertise and tools I use professionally
            </p>
        </div>

        <!-- Skills Grid: clean cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            @php
                $skillGroups = [
                    'Backend' => ['Laravel', 'Livewire', 'PHP', 'Java'],
                    'Frontend' => ['HTML', 'CSS', 'JavaScript', 'Tailwind', 'Bootstrap', 'React'],
                    'Database' => ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'],
                    'Data Science & ML' => [
                        'Python',
                        'TensorFlow',
                        'Keras',
                        'Scikit-learn',
                        'PyTorch',
                        'NumPy',
                        'Pandas',
                        'Matplotlib',
                        'Seaborn',
                        'Plotly',
                        'Optuna',
                        'SciPy',
                        'Statsmodels',
                    ],
                ];
                $categoryIcons = [
                    'Backend' => '⚡',
                    'Frontend' => '✨',
                    'Database' => '💾',
                    'Data Science & ML' => '🧠',
                ];
            @endphp
            @foreach ($skillGroups as $category => $skillList)
                <div class="skill-category">
                    <div
                        class="p-6 rounded-xl bg-white dark:bg-[#161615] border border-[#e3e3e0] dark:border-[#3E3E3A]">
                        <div class="flex items-center gap-3 mb-4">
                            <div
                                class="w-10 h-10 rounded-lg bg-[#f5f5f4] dark:bg-[#232321] flex items-center justify-center text-xl">
                                {{ $categoryIcons[$category] ?? '💻' }}
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-[#1b1b18] dark:text-[#eeeeec]">{{ $category }}
                                </h3>
                                <p class="text-xs text-[#706f6c] dark:text-[#A1A09A] mt-0.5">{{ count($skillList) }}
                                    skills</p>
                            </div>
                        </div>
                        <ul class="space-y-2 list-disc list-inside">
                            @foreach ($skillList as $skill)
                                <li class="text-sm text-[#232321] dark:text-[#eeeeec]">{{ $skill }}</li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            @endforeach
        </div>

        <!-- Stats Summary: clean -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-10">
            @php
                $stats = [
                    [
                        'value' => array_sum(array_map('count', $skills)) . '+',
                        'label' => 'Technologies',
                    ],
                    ['value' => '7+', 'label' => 'Projects'],
                    ['value' => count($skills), 'label' => 'Categories'],
                    ['value' => '∞', 'label' => 'Passion'],
                ];
            @endphp
            @foreach ($stats as $stat)
                <div
                    class="text-center p-6 rounded-xl bg-white dark:bg-[#161615] border border-[#e3e3e0] dark:border-[#3E3E3A]">
                    <div class="text-3xl font-bold text-[#f53003] mb-2">{{ $stat['value'] }}</div>
                    <div class="text-sm font-medium text-[#706f6c] dark:text-[#A1A09A] uppercase tracking-wider">
                        {{ $stat['label'] }}</div>
                </div>
            @endforeach
        </div>
    </div>

    <!-- Import custom CSS for skills section -->


    <script>
        // Initialize skill progress bars on page load
        document.addEventListener('DOMContentLoaded', function() {
            // Animate progress bars when in viewport
            const observerOptions = {
                threshold: 0.3,
                rootMargin: '0px 0px -100px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progressBars = entry.target.querySelectorAll('.skill-progress');
                        progressBars.forEach(bar => {
                            const width = bar.getAttribute('data-width');
                            setTimeout(() => {
                                bar.style.width = width;
                            }, 100);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            const skillsSection = document.querySelector('#skills');
            if (skillsSection) {
                observer.observe(skillsSection);
            }
        });
    </script>
</section>
