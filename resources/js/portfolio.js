document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.carousel-card');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    let currentIndex = 0;
    const totalCards = cards.length;
    let autoPlayInterval;

    function updateCarousel() {
        // Remove all classes first
        cards.forEach(card => {
            card.classList.remove('active', 'prev', 'next', 'hidden');
        });

        // Calculate indices for infinite loop
        const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
        const nextIndex = (currentIndex + 1) % totalCards;

        // Apply classes
        cards[prevIndex].classList.add('prev');
        cards[currentIndex].classList.add('active');
        cards[nextIndex].classList.add('next');

        // Hide other cards
        cards.forEach((card, index) => {
            if (index !== prevIndex && index !== currentIndex && index !== nextIndex) {
                card.classList.add('hidden');
            }
        });

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('w-8', index === currentIndex);
            dot.classList.toggle('bg-[#f53003]', index === currentIndex);
            dot.classList.toggle('bg-[#e3e3e0]', index !== currentIndex);
            dot.classList.toggle('dark:bg-[#3E3E3A]', index !== currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = (index + totalCards) % totalCards;
        updateCarousel();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    }

    // Event Listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.index));
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Auto-play with pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);

    // Initialize
    updateCarousel();
    startAutoPlay();

    // Responsive handling
    function handleResponsive() {
        // Mobile: show only active card
        if (window.innerWidth < 768) {
            cards.forEach((card, index) => {
                if (index !== currentIndex) {
                    card.style.opacity = '0';
                }
            });
        } else {
            cards.forEach(card => {
                card.style.opacity = '';
            });
        }
    }

    window.addEventListener('resize', handleResponsive);
    handleResponsive();
});
