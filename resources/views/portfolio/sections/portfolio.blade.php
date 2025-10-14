<section id="portfolio" class="py-20 relative overflow-hidden">
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

    <div class="max-w-6xl mx-auto px-4 relative">
        <!-- Header Section -->
        <div class="text-center mb-16">
            <div
                class="inline-flex items-center gap-2 px-5 py-2.5 mb-6 text-sm font-medium border border-[#e3e3e0] dark:border-[#3E3E3A] rounded-full bg-white/50 dark:bg-[#161615]/50 backdrop-blur-sm hover:scale-105 transition-transform">
                <span class="relative flex h-2 w-2">
                    <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f53003] opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-[#F8B803]"></span>
                </span>
                Featured and Solo
            </div>
            <h2 class="text-4xl lg:text-6xl font-bold mb-6">
                <span
                    class="bg-gradient-to-r from-[#f53003] via-[#ff6b3d] to-[#F8B803] bg-clip-text text-transparent animate-gradient bg-300%">
                    Featured
                </span>
                <span class="text-[#1b1b18] dark:text-[#eeeeec]">
                    Projects
                </span>
            </h2>
            <p class="text-lg text-[#706f6c] dark:text-[#A1A09A] max-w-2xl mx-auto leading-relaxed">
                Here are some of my recent projects that showcase my skills and expertise
            </p>
            <!-- Mobile swipe hint -->
            <p class="text-sm text-[#706f6c] dark:text-[#A1A09A] mt-4 lg:hidden">
                <svg class="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 10l5 5 5-5"></path>
                </svg>
                Swipe or tap dots to navigate
            </p>
        </div>

        <!-- Stacked Carousel -->
        <div class="relative group">
            <!-- Navigation Buttons (Desktop Only) -->
            <button
                class="carousel-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-30 p-3 rounded-full bg-white/70 dark:bg-[#161615]/70 border border-[#e3e3e0] dark:border-[#3E3E3A] backdrop-blur-sm hover:bg-[#f53003] hover:border-[#f53003] hover:text-white transition-all duration-300 shadow-lg opacity-0 group-hover:opacity-100 hidden lg:block"
                aria-label="Previous project">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>

            <button
                class="carousel-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-30 p-3 rounded-full bg-white/70 dark:bg-[#161615]/70 border border-[#e3e3e0] dark:border-[#3E3E3A] backdrop-blur-sm hover:bg-[#f53003] hover:border-[#f53003] hover:text-white transition-all duration-300 shadow-lg opacity-0 group-hover:opacity-100 hidden lg:block"
                aria-label="Next project">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>

            <!-- Carousel Container -->
            <div class="carousel-container relative h-[28rem] md:h-[32rem] lg:h-[36rem] overflow-hidden">
                <div class="carousel-track flex items-center justify-center h-full">
                    @foreach ($portfolios as $index => $portfolio)
                        <div class="carousel-card absolute w-full lg:w-[32rem] h-[36rem] transition-all duration-500 ease-in-out transform rounded-2xl shadow-lg overflow-hidden"
                            data-index="{{ $loop->index }}">
                            <div class="h-full min-h-full flex flex-col justify-stretch items-stretch w-full">
                                @include('portfolio.components.project-card', ['project' => $portfolio])
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>

            <!-- Dots Indicator -->
            <div class="flex justify-center gap-2 mt-8" id="carouselDots">
                @foreach ($portfolios as $portfolio)
                    <button
                        class="carousel-dot h-2 rounded-full dark:bg-[#3E3E3A] transition-all duration-500 hover:bg-[#f53003]/50 {{ $loop->first ? 'w-8 bg-[#f53003]' : 'w-2 bg-[#e3e3e0]' }}"
                        data-index="{{ $loop->index }}"
                        aria-label="Go to project {{ $loop->index + 1 }}: {{ $portfolio->title ?? 'Project ' . ($loop->index + 1) }}">
                    </button>
                @endforeach
            </div>
        </div>

        <!-- Mobile Navigation Hints (only visible on mobile) -->
        <div class="mt-6 flex justify-center items-center gap-4 lg:hidden">
            <button onclick="window.carouselPrev && window.carouselPrev()"
                class="p-2 rounded-lg bg-white/70 dark:bg-[#161615]/70 border border-[#e3e3e0] dark:border-[#3E3E3A] backdrop-blur-sm">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>
            <span class="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                {{ count($portfolios) }} Projects
            </span>
            <button onclick="window.carouselNext && window.carouselNext()"
                class="p-2 rounded-lg bg-white/70 dark:bg-[#161615]/70 border border-[#e3e3e0] dark:border-[#3E3E3A] backdrop-blur-sm">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>
    </div>

    {{-- Include CSS and JS --}}
    @push('styles')
        <link rel="stylesheet" href="{{ asset('css/portfolio.css') }}">
    @endpush
    @push('scripts')
        <script src="{{ asset('js/portfolio.js') }}" defer></script>
        <script>
            // Expose navigation functions for mobile buttons
            window.addEventListener('DOMContentLoaded', function() {
                const prevBtn = document.querySelector('.carousel-prev');
                const nextBtn = document.querySelector('.carousel-next');

                window.carouselPrev = function() {
                    if (prevBtn) prevBtn.click();
                    else {
                        // Fallback for mobile
                        const event = new Event('click');
                        document.querySelector('.carousel-prev')?.dispatchEvent(event);
                    }
                };

                window.carouselNext = function() {
                    if (nextBtn) nextBtn.click();
                    else {
                        // Fallback for mobile
                        const event = new Event('click');
                        document.querySelector('.carousel-next')?.dispatchEvent(event);
                    }
                };
            });
        </script>
    @endpush
</section>
