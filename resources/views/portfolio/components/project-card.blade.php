<div
    class="bg-white dark:bg-[#161615] rounded-lg overflow-hidden shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d] hover:shadow-lg transition-shadow group h-full flex flex-col">

    <!-- Image Container with responsive aspect ratio -->
    <div
        class="aspect-video sm:aspect-video bg-gradient-to-br from-[#F8B803] to-[#f53003] relative overflow-hidden flex-shrink-0">
        <div
            class="absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl md:text-6xl font-bold text-white/20">
            {{ substr($project['title'], 0, 1) }}
        </div>
    </div>

    <!-- Content Container -->
    <div class="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
        <!-- Title -->
        <h3
            class="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-[#f53003] dark:group-hover:text-[#FF4433] transition-colors line-clamp-2">
            {{ $project['title'] }}
        </h3>

        <!-- Description -->
        <p
            class="text-[#706f6c] dark:text-[#A1A09A] mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed line-clamp-3 flex-grow">
            {{ $project['description'] }}
        </p>

        <!-- Tech Stack Tags -->
        <div class="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            @foreach ($project['tech'] as $tech)
                <span
                    class="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs border border-[#e3e3e0] dark:border-[#3E3E3A] rounded-full whitespace-nowrap">
                    {{ $tech }}
                </span>
            @endforeach
        </div>

        <!-- View Project Link -->
        <a href="{{ $project['link'] }}"
            class="inline-flex items-center text-[#f53003] dark:text-[#FF4433] hover:underline text-sm sm:text-base mt-auto">
            <span>View Project</span>
            <svg width="14" height="14" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="ml-1.5 sm:ml-2 flex-shrink-0">
                <path d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001" stroke="currentColor"
                    stroke-linecap="square" />
            </svg>
        </a>
    </div>
</div>

<style>
    /* Line clamp utilities for text truncation */
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    /* Ensure consistent card height in carousel */
    @media (min-width: 769px) {
        .carousel-card>div {
            height: 100%;
        }
    }

    /* Mobile optimization */
    @media (max-width: 640px) {

        /* Reduce padding on very small screens */
        .group .p-4 {
            padding: 0.875rem;
        }

        /* Adjust tech tags for better wrapping */
        .flex-wrap span {
            font-size: 0.625rem;
            padding: 0.25rem 0.5rem;
        }
    }

    /* Smooth hover transitions */
    .group:hover {
        transform: translateY(-2px);
    }

    @media (max-width: 768px) {
        .group:hover {
            transform: none;
        }
    }
</style>
