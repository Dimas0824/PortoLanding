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
        <div class="flex-1 flex items-center justify-center w-full max-w-lg relative">
            {{-- Theme Toggle Button - Positioned outside planetary container --}}
            <button id="theme-toggle"
                class="absolute top-0 right-0 md:top-4 md:right-4 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border border-[#e3e3e0] dark:border-[#3E3E3A] bg-white dark:bg-[#1b1b18] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                aria-label="Toggle theme">
                <svg class="w-5 h-5 md:w-6 md:h-6 text-[#F8B803] dark:hidden" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
                <svg class="w-5 h-5 md:w-6 md:h-6 text-[#f53003] hidden dark:block" fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
            </button>
            @include('portfolio.components.hero-graphic')
        </div>
    </div>
</section>
