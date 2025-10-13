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
        <!-- Header Section with enhanced animation -->
        <div class="text-center mb-20">
            <div
                class="inline-flex items-center gap-2 px-5 py-2.5 mb-8 text-sm font-medium border border-[#e3e3e0] dark:border-[#3E3E3A] rounded-full bg-white/50 dark:bg-[#161615]/50 backdrop-blur-sm hover:scale-105 transition-transform">
                <span class="relative flex h-2 w-2">
                    <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f53003] opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-[#F8B803]"></span>
                </span>
                My Expertise
            </div>
            <h2 class="text-4xl lg:text-6xl font-bold mb-6">
                <span
                    class="bg-gradient-to-r from-[#f53003] via-[#ff6b3d] to-[#F8B803] bg-clip-text text-transparent animate-gradient bg-300%">
                    Skills &
                </span>
                <span class="text-[#1b1b18] dark:text-[#eeeeec]">
                    Technologies
                </span>
            </h2>
            <p class="text-lg text-[#706f6c] dark:text-[#A1A09A] max-w-2xl mx-auto leading-relaxed">
                Crafting digital experiences with cutting-edge technologies and tools
            </p>
        </div>

        <!-- Skills Grid with Staggered Animation -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            @foreach ($skills as $category => $skillList)
                @php
                    $categoryIcons = [
                        'Backend' => ['icon' => '⚡', 'gradient' => 'from-purple-500 to-indigo-500'],
                        'Frontend' => ['icon' => '✨', 'gradient' => 'from-pink-500 to-rose-500'],
                        'Database' => ['icon' => '💾', 'gradient' => 'from-blue-500 to-cyan-500'],
                        'Data Science & ML' => ['icon' => '🧠', 'gradient' => 'from-green-500 to-emerald-500'],
                    ];
                    $currentCategory = $categoryIcons[$category] ?? [
                        'icon' => '💻',
                        'gradient' => 'from-[#f53003] to-[#F8B803]',
                    ];
                @endphp

                <div class="group skill-category" style="animation-delay: {{ $loop->index * 0.1 }}s">
                    <!-- Enhanced Category Card -->
                    <div
                        class="relative p-6 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 dark:from-[#1a1a19]/80 dark:to-[#1a1a19]/40 backdrop-blur-xl border border-[#e3e3e0]/50 dark:border-[#3E3E3A]/50 hover:border-[#f53003]/50 dark:hover:border-[#f53003]/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl">

                        <!-- Gradient overlay on hover -->
                        <div
                            class="absolute inset-0 rounded-2xl bg-gradient-to-br {{ $currentCategory['gradient'] }} opacity-0 group-hover:opacity-5 transition-opacity duration-500">
                        </div>

                        <!-- Category Header with enhanced styling -->
                        <div class="relative flex items-center gap-3 mb-6">
                            <div class="relative">
                                <div
                                    class="absolute inset-0 bg-gradient-to-br {{ $currentCategory['gradient'] }} rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity">
                                </div>
                                <div
                                    class="relative w-12 h-12 rounded-xl bg-gradient-to-br {{ $currentCategory['gradient'] }} flex items-center justify-center text-white text-2xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                                    {{ $currentCategory['icon'] }}
                                </div>
                            </div>
                            <div>
                                <h3
                                    class="text-xl font-bold text-[#1b1b18] dark:text-[#eeeeec] group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#f53003] group-hover:to-[#F8B803] group-hover:bg-clip-text transition-all duration-300">
                                    {{ $category }}
                                </h3>
                                <p class="text-xs text-[#706f6c] dark:text-[#A1A09A] mt-0.5">
                                    {{ count($skillList) }} skills
                                </p>
                            </div>
                        </div>

                        <!-- Enhanced Skills List -->
                        <div class="space-y-2.5">
                            @foreach ($skillList as $skill)
                                @php
                                    $projectMap = [
                                        'Laravel' => ['MAGNET — Sistem Informasi Magang'],
                                        'Livewire' => ['MAGNET — Sistem Informasi Magang'],
                                        'PHP' => ['DiscipLink — Sistem Informasi Tata Tertib'],
                                        'Python' => [
                                            'IHSG LSTM Forecasting',
                                            'Streamlytics Netflix',
                                            'Simple TikTok Post Text Mining',
                                        ],
                                        'TensorFlow' => ['IHSG LSTM Forecasting'],
                                        'Keras' => ['IHSG LSTM Forecasting'],
                                        'Scikit-learn' => ['Streamlytics Netflix', 'Simple TikTok Post Text Mining'],
                                        'Java' => ['Sistem Kasir Cafe (CASS)'],
                                        'MySQL' => [
                                            'MAGNET — Sistem Informasi Magang',
                                            'DiscipLink — Sistem Informasi Tata Tertib',
                                        ],
                                        'Pandas' => ['Streamlytics Netflix'],
                                        'NumPy' => ['Streamlytics Netflix'],
                                        'NLTK' => ['Simple TikTok Post Text Mining'],
                                        'Git' => ['DiscipLink — Sistem Informasi Tata Tertib'],
                                    ];

                                    $relatedProjects = $projectMap[$skill] ?? [];
                                    $skillLevel = rand(70, 95); // Random skill level for demo
                                @endphp

                                <div class="skill-item group/item relative">
                                    <div
                                        class="relative bg-white/70 dark:bg-[#161615]/70 backdrop-blur-sm p-3 rounded-xl border border-[#e3e3e0]/30 dark:border-[#3E3E3A]/30 hover:border-[#f53003]/50 dark:hover:border-[#f53003]/50 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer overflow-hidden">

                                        <!-- Animated background gradient -->
                                        <div
                                            class="absolute inset-0 bg-gradient-to-r from-[#f53003]/0 via-[#f53003]/5 to-[#F8B803]/0 translate-x-[-100%] group-hover/item:translate-x-[100%] transition-transform duration-1000">
                                        </div>

                                        <div class="relative flex items-center justify-between">
                                            <div class="flex-1">
                                                <span
                                                    class="font-semibold text-sm text-[#1b1b18] dark:text-[#eeeeec] group-hover/item:text-[#f53003] dark:group-hover/item:text-[#F8B803] transition-colors">
                                                    {{ $skill }}
                                                </span>
                                                <!-- Skill level bar -->
                                                <div
                                                    class="mt-1.5 w-full bg-[#e3e3e0]/30 dark:bg-[#3E3E3A]/30 rounded-full h-1 overflow-hidden">
                                                    <div class="h-full bg-gradient-to-r from-[#f53003] to-[#F8B803] rounded-full skill-progress"
                                                        style="width: 0%; transition: width 1.5s ease-out; transition-delay: {{ $loop->parent->index * 0.1 + $loop->index * 0.05 }}s;"
                                                        data-width="{{ $skillLevel }}%">
                                                    </div>
                                                </div>
                                            </div>
                                            @if (count($relatedProjects) > 0)
                                                <div class="ml-3 flex items-center gap-1">
                                                    <span
                                                        class="text-xs px-2 py-1 rounded-lg bg-gradient-to-r from-[#f53003]/10 to-[#F8B803]/10 text-[#f53003] font-bold">
                                                        {{ count($relatedProjects) }}
                                                    </span>
                                                    <svg class="w-4 h-4 text-[#f53003] opacity-0 group-hover/item:opacity-100 transition-opacity"
                                                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                                    </svg>
                                                </div>
                                            @endif
                                        </div>

                                        <!-- Enhanced Hover Tooltip -->
                                        @if (count($relatedProjects) > 0)
                                            <div
                                                class="absolute left-0 right-0 top-full mt-3 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-300 z-20 transform group-hover/item:translate-y-0 translate-y-2">
                                                <div
                                                    class="bg-gradient-to-br from-[#1b1b18] to-[#2a2a27] dark:from-[#eeeeec] dark:to-[#d4d4d2] text-white dark:text-[#1b1b18] p-4 rounded-xl shadow-2xl border border-[#f53003]/20">
                                                    <div class="flex items-center gap-2 mb-3">
                                                        <span
                                                            class="text-xs font-bold text-[#F8B803] uppercase tracking-wider">
                                                            Projects
                                                        </span>
                                                        <span
                                                            class="flex-1 h-px bg-gradient-to-r from-[#F8B803]/50 to-transparent"></span>
                                                    </div>
                                                    <ul class="space-y-2">
                                                        @foreach ($relatedProjects as $project)
                                                            <li class="text-sm flex items-start gap-2 group/project">
                                                                <span
                                                                    class="text-[#F8B803] mt-0.5 group-hover/project:translate-x-1 transition-transform">→</span>
                                                                <span
                                                                    class="flex-1 group-hover/project:text-[#F8B803] transition-colors">{{ $project }}</span>
                                                            </li>
                                                        @endforeach
                                                    </ul>

                                                    <!-- Arrow pointer with gradient -->
                                                    <div
                                                        class="absolute -top-2 left-8 w-4 h-4 bg-gradient-to-br from-[#1b1b18] to-[#2a2a27] dark:from-[#eeeeec] dark:to-[#d4d4d2] transform rotate-45 border-l border-t border-[#f53003]/20">
                                                    </div>
                                                </div>
                                            </div>
                                        @endif
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        <!-- Enhanced Stats Summary -->
        <div class="relative">
            <!-- Connecting lines animation -->
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div class="w-full h-px bg-gradient-to-r from-transparent via-[#f53003]/20 to-transparent"></div>
            </div>

            <div class="relative grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                @php
                    $stats = [
                        [
                            'value' => array_sum(array_map('count', $skills)) . '+',
                            'label' => 'Technologies',
                            'icon' => '',
                        ],
                        ['value' => '7+', 'label' => 'Projects', 'icon' => ''],
                        ['value' => count($skills), 'label' => 'Categories', 'icon' => ''],
                        ['value' => '∞', 'label' => 'Passion', 'icon' => ''],
                    ];
                @endphp

                @foreach ($stats as $index => $stat)
                    <div class="group stat-card" style="animation-delay: {{ $index * 0.1 }}s">
                        <div
                            class="relative text-center p-8 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 dark:from-[#161615]/80 dark:to-[#161615]/40 backdrop-blur-xl border border-[#e3e3e0]/50 dark:border-[#3E3E3A]/50 hover:border-[#f53003]/50 dark:hover:border-[#f53003]/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl overflow-hidden">

                            <!-- Animated background pattern -->
                            <div class="absolute inset-0 opacity-5">
                                <div
                                    class="absolute inset-0 bg-gradient-to-br from-[#f53003] to-[#F8B803] transform rotate-45 scale-150">
                                </div>
                            </div>

                            <!-- Floating icon -->
                            <div
                                class="absolute top-3 right-3 text-2xl opacity-10 group-hover:opacity-30 transition-opacity duration-300 group-hover:scale-110 transform">
                                {{ $stat['icon'] }}
                            </div>

                            <div class="relative">
                                <div
                                    class="text-4xl font-bold bg-gradient-to-r from-[#f53003] via-[#ff6b3d] to-[#F8B803] bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                                    <span class="counter"
                                        data-target="{{ $stat['value'] }}">{{ $stat['value'] }}</span>
                                </div>
                                <div
                                    class="text-sm font-medium text-[#706f6c] dark:text-[#A1A09A] uppercase tracking-wider">
                                    {{ $stat['label'] }}
                                </div>
                            </div>

                            <!-- Pulse effect on hover -->
                            <div
                                class="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#f53003] to-[#F8B803] opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
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
