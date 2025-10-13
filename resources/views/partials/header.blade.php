{{-- Header Component dengan Sticky, Responsive, dan Dark Mode Support --}}
<header class="sticky top-0 w-full bg-white dark:bg-[#161615] z-50 shadow-md transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="relative flex items-center justify-between h-16">
            {{-- Logo --}}
            <a href="{{ route('home') }}" class="relative z-10 text-xl font-bold text-gray-900 dark:text-white">
                Portfolio
            </a>

            {{-- Desktop Navigation --}}
            <div class="hidden md:flex items-center space-x-8">
                <a href="#about"
                    class="text-gray-700 dark:text-gray-300 hover:text-[#f53003] dark:hover:text-[#FF4433] transition-colors duration-200">
                    About
                </a>
                <a href="#portfolio"
                    class="text-gray-700 dark:text-gray-300 hover:text-[#f53003] dark:hover:text-[#FF4433] transition-colors duration-200">
                    Projects
                </a>
                <a href="#skills"
                    class="text-gray-700 dark:text-gray-300 hover:text-[#f53003] dark:hover:text-[#FF4433] transition-colors duration-200">
                    Skills
                </a>
                <a href="#contact"
                    class="px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200">
                    Contact
                </a>
            </div>

            {{-- Mobile Menu Button --}}
            <button id="mobileMenuBtn" type="button"
                class="md:hidden relative inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#f53003]"
                aria-controls="mobileMenu" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                {{-- Hamburger Icon --}}
                <svg class="hamburger-icon w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path class="hamburger-open" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16" />
                    <path class="hamburger-close hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </nav>
    </div>

    {{-- Mobile Navigation Menu --}}
    <div id="mobileMenu" class="md:hidden hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-[#161615] shadow-lg">
            <a href="#about"
                class="mobile-menu-link block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#f53003] dark:hover:text-[#FF4433] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                About
            </a>
            <a href="#portfolio"
                class="mobile-menu-link block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#f53003] dark:hover:text-[#FF4433] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                Projects
            </a>
            <a href="#skills"
                class="mobile-menu-link block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#f53003] dark:hover:text-[#FF4433] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                Skills
            </a>
            <a href="#contact"
                class="mobile-menu-link block mx-3 my-2 px-4 py-2 text-center font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200">
                Contact
            </a>
        </div>
    </div>
</header>

{{-- Mobile Menu Overlay (untuk menutup menu ketika klik di luar) --}}
<div id="mobileMenuOverlay" class="fixed inset-0 bg-black bg-opacity-25 z-40 hidden md:hidden"></div>

<style>
    /* Smooth scroll behavior untuk anchor links */
    html {
        scroll-behavior: smooth;
        scroll-padding-top: 64px;
        /* Kompensasi untuk sticky header */
    }

    /* Prevent horizontal scroll */
    body {
        overflow-x: hidden;
        position: relative;
    }

    /* Lock body scroll ketika mobile menu terbuka */
    body.menu-open {
        overflow: hidden;
        position: fixed;
        width: 100%;
    }

    /* Animasi smooth untuk mobile menu */
    #mobileMenu {
        transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
        max-height: 0;
        opacity: 0;
        overflow: hidden;
    }

    #mobileMenu.show {
        max-height: 400px;
        opacity: 1;
    }

    /* Animasi untuk mobile menu links */
    .mobile-menu-link {
        opacity: 0;
        transform: translateX(-10px);
        animation: slideIn 0.3s ease forwards;
    }

    #mobileMenu.show .mobile-menu-link:nth-child(1) {
        animation-delay: 0.05s;
    }

    #mobileMenu.show .mobile-menu-link:nth-child(2) {
        animation-delay: 0.1s;
    }

    #mobileMenu.show .mobile-menu-link:nth-child(3) {
        animation-delay: 0.15s;
    }

    #mobileMenu.show .mobile-menu-link:nth-child(4) {
        animation-delay: 0.2s;
    }

    @keyframes slideIn {
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    /* Dark mode transition untuk semua elemen */
    * {
        transition-property: background-color, border-color;
        transition-duration: 200ms;
    }

    /* Hapus transisi untuk text color agar tidak flicker */
    a,
    button,
    span,
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        transition-property: color, background-color, border-color;
        transition-duration: 200ms;
    }
</style>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
        const hamburgerOpen = mobileMenuBtn.querySelector('.hamburger-open');
        const hamburgerClose = mobileMenuBtn.querySelector('.hamburger-close');
        const body = document.body;

        // Variabel untuk menyimpan posisi scroll
        let scrollPosition = 0;

        function openMenu() {
            // Simpan posisi scroll saat ini
            scrollPosition = window.pageYOffset;

            // Lock body scroll
            body.style.top = `-${scrollPosition}px`;
            body.classList.add('menu-open');

            // Tampilkan menu dan overlay
            mobileMenu.classList.remove('hidden');
            mobileMenuOverlay.classList.remove('hidden');

            // Trigger animasi dengan delay kecil untuk smooth transition
            setTimeout(() => {
                mobileMenu.classList.add('show');
                mobileMenuOverlay.classList.add('opacity-100');
            }, 10);

            // Toggle icon
            hamburgerOpen.classList.add('hidden');
            hamburgerClose.classList.remove('hidden');

            // Update aria
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
        }

        function closeMenu() {
            // Hapus animasi
            mobileMenu.classList.remove('show');
            mobileMenuOverlay.classList.remove('opacity-100');

            // Tunggu animasi selesai baru sembunyikan
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenuOverlay.classList.add('hidden');

                // Unlock body scroll
                body.classList.remove('menu-open');
                body.style.top = '';

                // Kembalikan ke posisi scroll semula
                window.scrollTo(0, scrollPosition);
            }, 300);

            // Toggle icon
            hamburgerOpen.classList.remove('hidden');
            hamburgerClose.classList.add('hidden');

            // Update aria
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }

        // Toggle menu
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = mobileMenu.classList.contains('show');
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu ketika klik overlay
        mobileMenuOverlay.addEventListener('click', closeMenu);

        // Close menu ketika klik link
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        // Close menu dengan ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('show')) {
                closeMenu();
            }
        });

        // Prevent menu dari tertutup ketika klik di dalam menu
        mobileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Handle resize event - tutup menu mobile saat resize ke desktop
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth >= 768 && mobileMenu.classList.contains('show')) {
                    closeMenu();
                }
            }, 250);
        });

        // Smooth scroll untuk anchor links dengan offset untuk sticky header
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId !== '#') {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerOffset = 64; // Tinggi header
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset -
                            headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    });
</script>
