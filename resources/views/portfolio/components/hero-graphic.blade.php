<div class="hero-graphic-container relative w-full max-w-md aspect-square" id="hero-graphic">
    {{-- Canvas for animated stars background --}}
    <canvas id="stars-canvas" class="absolute inset-0 w-full h-full"></canvas>

    {{-- Planetary System Container --}}
    <div class="planetary-system absolute inset-0">
        {{-- Orbits --}}
        <div class="orbit-container absolute inset-0 flex items-center justify-center">
            {{-- Outer Orbit --}}
            <div class="orbit orbit-outer absolute w-[90%] h-[90%] rounded-full"></div>

            {{-- Inner Orbit --}}
            <div class="orbit orbit-inner absolute w-[65%] h-[65%] rounded-full"></div>
        </div>

        {{-- Planets Container --}}
        <div class="planets-container absolute inset-0">
            {{-- Small Planet 1 (Outer Orbit) --}}
            <div class="planet-wrapper planet-outer-wrapper absolute inset-0">
                <div class="planet planet-small planet-1 absolute">
                    <div class="planet-glow"></div>
                    <div class="planet-surface"></div>
                </div>
            </div>

            {{-- Small Planet 2 (Inner Orbit) --}}
            <div class="planet-wrapper planet-inner-wrapper absolute inset-0">
                <div class="planet planet-small planet-2 absolute">
                    <div class="planet-glow"></div>
                    <div class="planet-surface"></div>
                </div>
            </div>
        </div>

        {{-- Main Planet (Center) --}}
        <div class="absolute inset-0 flex items-center justify-center">
            <div class="planet planet-main relative">
                <div class="planet-glow-main"></div>
                <div class="planet-surface-main relative overflow-hidden">
                    {{-- Planet texture/pattern --}}
                    <div class="planet-texture absolute inset-0"></div>
                    {{-- Tech circuits pattern --}}
                    <div class="planet-circuits absolute inset-0"></div>
                </div>
                {{-- Floating tech elements around main planet --}}
                <div class="tech-elements absolute inset-0">
                    <div class="tech-dot tech-dot-1"></div>
                    <div class="tech-dot tech-dot-2"></div>
                    <div class="tech-dot tech-dot-3"></div>
                </div>
            </div>
        </div>

        {{-- Particle Effects --}}
        <div class="particles absolute inset-0 pointer-events-none overflow-hidden">
            @for ($i = 0; $i < 8; $i++)
                <div class="particle particle-{{ $i }}" style="animation-delay: {{ $i * 0.3 }}s"></div>
            @endfor
        </div>
    </div>
</div>

{{-- Include CSS and JS --}}
@push('styles')
    <link rel="stylesheet" href="{{ asset('css/hero-graphic.css') }}">
@endpush

@push('scripts')
    <script src="{{ asset('js/hero-graphic.js') }}"></script>
@endpush
