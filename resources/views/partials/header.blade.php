<header class="w-full bg-white dark:bg-[#161615] z-50 shadow mb-8 sm:mb-10 lg:mb-12 sticky top-0">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex items-center justify-between py-4 sm:py-5 lg:py-6">
            <!-- Logo -->
            <a href="{{ route('home') }}" class="text-lg sm:text-xl lg:text-2xl font-bold z-50 relative">
                Portofolio
            </a>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex items-center gap-4 lg:gap-6">
                <a href="#about"
                    class="text-sm lg:text-base hover:text-[#f53003] dark:hover:text-[#FF4433] transition-colors">
                    About
                </a>
                <a href="#portfolio"
                    class="text-sm lg:text-base hover:text-[#f53003] dark:hover:text-[#FF4433] transition-colors">
                    Projects
                </a>
                <a href="#skills"
                    class="text-sm lg:text-base hover:text-[#f53003] dark:hover:text-[#FF4433] transition-colors">
                    Skills
                </a>
                <a href="#contact"
                    class="inline-block px-5 py-1.5 dark:text-[#EDEDEC] border-[#19140035] hover:border-[#1915014a] border text-[#1b1b18] dark:border-[#3E3E3A] dark:hover:border-[#62605b] rounded-sm text-sm leading-normal transition-colors">
                    Contact
                </a>
            </div>

            <!-- Mobile Menu Button -->
            <button id="mobileMenuBtn" class="md:hidden z-50 relative p-2 -mr-2 focus:outline-none"
                aria-label="Toggle menu">
                <div class="w-6 h-5 flex flex-col justify-between">
                    <span
                        class="hamburger-line block h-0.5 w-full bg-[#1b1b18] dark:bg-[#eeeeec] transition-all duration-300 origin-left"></span>
                    <span
                        class="hamburger-line block h-0.5 w-full bg-[#1b1b18] dark:bg-[#eeeeec] transition-all duration-300"></span>
                    <span
                        class="hamburger-line block h-0.5 w-full bg-[#1b1b18] dark:bg-[#eeeeec] transition-all duration-300 origin-left"></span>
                </div>
            </button>

            <!-- Mobile Navigation Menu -->
            <div id="mobileMenu"
                class="fixed inset-0 bg-white/95 dark:bg-[#161615]/95 backdrop-blur-lg z-40 opacity-0 invisible transition-all duration-300 md:hidden">
                <div class="flex flex-col items-center justify-center h-full gap-8 px-6">
                    <a href="#about"
                        class="mobile-menu-link text-2xl font-medium hover:text-[#f53003] dark:hover:text-[#FF4433] transition-colors">
                        About
                    </a>
                    <a href="#portfolio"
                        class="mobile-menu-link text-2xl font-medium hover:text-[#f53003] dark:hover:text-[#FF4433] transition-colors">
                        Projects
                    </a>
                    <a href="#skills"
                        class="mobile-menu-link text-2xl font-medium hover:text-[#f53003] dark:hover:text-[#FF4433] transition-colors">
                        Skills
                    </a>
                    <a href="#contact"
                        class="mobile-menu-link inline-block px-8 py-3 dark:text-[#EDEDEC] border-[#19140035] hover:border-[#1915014a] border text-[#1b1b18] dark:border-[#3E3E3A] dark:hover:border-[#62605b] rounded-sm text-lg leading-normal transition-colors">
                        Contact
                    </a>
                </div>
            </div>
        </nav>
</header>

<style>
    /* Hamburger animation */
    #mobileMenuBtn.active .hamburger-line:nth-child(1) {
        transform: rotate(45deg) translateY(-1px);
    }

    #mobileMenuBtn.active .hamburger-line:nth-child(2) {
        opacity: 0;
        transform: translateX(-10px);
    }

    #mobileMenuBtn.active .hamburger-line:nth-child(3) {
        transform: rotate(-45deg) translateY(1px);
    }

    /* Mobile menu animation */
    #mobileMenu.active {
        opacity: 1;
        visibility: visible;
    }

    /* Prevent scroll when menu is open */
    body.menu-open {
        overflow: hidden;
    }

    /* Smooth link animation */
    .mobile-menu-link {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.5s ease forwards;
    }

    #mobileMenu.active .mobile-menu-link:nth-child(1) {
        animation-delay: 0.1s;
    }

    #mobileMenu.active .mobile-menu-link:nth-child(2) {
        animation-delay: 0.2s;
    }

    #mobileMenu.active .mobile-menu-link:nth-child(3) {
        animation-delay: 0.3s;
    }

    #mobileMenu.active .mobile-menu-link:nth-child(4) {
        animation-delay: 0.4s;
    }

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Reset animation when menu closes */
    #mobileMenu:not(.active) .mobile-menu-link {
        animation: none;
        opacity: 0;
    }
</style>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

        // Toggle menu
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking a link
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Close menu when clicking outside (on overlay)
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });

        // Close menu on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
</script>
