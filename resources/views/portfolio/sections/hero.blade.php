<section class="flex items-center justify-center min-h-[80vh] py-20">
    <div class="flex max-w-full w-full flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
        <!-- Text Content -->
        <div class="flex-1 text-center lg:text-left space-y-6">
            <div class="inline-block px-4 py-2 text-sm border border-[#e3e3e0] dark:border-[#3E3E3A] rounded-full">
                Welcome to my Personal page
            </div>

            <h1
                class="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-[#f53003] to-[#F8B803] bg-clip-text text-transparent leading-tight">
                {{ $profile['name'] }}
            </h1>

            <p class="text-2xl lg:text-3xl text-[#706f6c] dark:text-[#A1A09A]">
                {{ $profile['title'] }}
            </p>

            <p class="text-lg text-[#706f6c] dark:text-[#A1A09A] max-w-2xl mx-auto lg:mx-0">
                {{ $profile['bio'] }}
            </p>

            <div class="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                <a href="#portfolio"
                    class="inline-flex items-center gap-2 px-8 py-3 bg-[#1b1b18] dark:bg-[#eeeeec] text-white dark:text-[#1C1C1A] rounded-sm hover:bg-black dark:hover:bg-white transition-all hover:scale-105">
                    <span>View Projects</span>
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </a>
                <a href="#contact"
                    class="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#1b1b18] dark:border-[#eeeeec] rounded-sm hover:bg-[#1b1b18] hover:text-white dark:hover:bg-[#eeeeec] dark:hover:text-[#1C1C1A] transition-all hover:scale-105">
                    <span>Get in Touch</span>
                </a>
            </div>
        </div>

        <!-- Hero Graphic -->
        <div class="flex-1 flex items-center justify-center w-full max-w-lg">
            @include('portfolio.components.hero-graphic')
        </div>
    </div>
</section>
