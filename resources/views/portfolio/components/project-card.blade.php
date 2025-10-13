<div
    class="bg-white dark:bg-[#161615] rounded-lg overflow-hidden shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d] hover:shadow-lg transition-shadow group">
    <div class="aspect-video bg-gradient-to-br from-[#F8B803] to-[#f53003] relative overflow-hidden">
        <div class="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white/20">
            {{ substr($project['title'], 0, 1) }}
        </div>
    </div>

    <div class="p-6">
        <h3
            class="text-xl font-semibold mb-3 group-hover:text-[#f53003] dark:group-hover:text-[#FF4433] transition-colors">
            {{ $project['title'] }}
        </h3>

        <p class="text-[#706f6c] dark:text-[#A1A09A] mb-4 text-sm leading-relaxed">
            {{ $project['description'] }}
        </p>

        <div class="flex flex-wrap gap-2 mb-4">
            @foreach ($project['tech'] as $tech)
                <span class="px-3 py-1 text-xs border border-[#e3e3e0] dark:border-[#3E3E3A] rounded-full">
                    {{ $tech }}
                </span>
            @endforeach
        </div>

        <a href="{{ $project['link'] }}"
            class="inline-flex items-center text-[#f53003] dark:text-[#FF4433] hover:underline">
            <span>View Project</span>
            <svg width="16" height="16" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="ml-2">
                <path d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001" stroke="currentColor"
                    stroke-linecap="square" />
            </svg>
        </a>
    </div>
</div>
