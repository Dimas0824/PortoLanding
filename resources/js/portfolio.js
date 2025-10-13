document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.carousel-card');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselTrack = document.querySelector('.carousel-track');

    let currentIndex = 0;
    const totalCards = cards.length;
    let autoPlayInterval;
    let isAnimating = false;

    // Touch/Swipe handling variables
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    // Check if mobile
    function isMobile() {
        return window.innerWidth < 768;
    }

    function updateCarousel() {
        if (isAnimating) return;
        isAnimating = true;

        // Remove all classes first
        cards.forEach(card => {
            card.classList.remove('active', 'prev', 'next', 'hidden');
            // Reset inline styles
            card.style.display = '';
            card.style.position = '';
            card.style.left = '';
            card.style.right = '';
            card.style.marginLeft = '';
            card.style.marginRight = '';
        });

        if (isMobile()) {
            // Mobile: only show active card, completely hide others
            cards.forEach((card, index) => {
                if (index === currentIndex) {
                    card.classList.add('active');
                    card.style.display = 'block';
                    card.style.position = 'relative';
                    card.style.left = 'auto';
                    card.style.right = 'auto';
                    card.style.marginLeft = 'auto';
                    card.style.marginRight = 'auto';
                    card.style.transform = 'translateX(0) scale(1)';

                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                    card.style.transform = 'translateX(0) scale(0)';

                }
            });
        } else {
            // Desktop: show prev, active, and next
            const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
            const nextIndex = (currentIndex + 1) % totalCards;

            // Apply transformations
            cards[prevIndex].classList.add('prev');
            cards[prevIndex].style.display = 'block';
            cards[prevIndex].style.position = 'absolute';
            cards[prevIndex].style.transform = 'translateX(-40%) scale(0.75)';

            cards[currentIndex].classList.add('active');
            cards[currentIndex].style.display = 'block';
            cards[currentIndex].style.position = 'absolute';
            cards[currentIndex].style.transform = 'translateX(0) scale(1)';

            cards[nextIndex].classList.add('next');
            cards[nextIndex].style.display = 'block';
            cards[nextIndex].style.position = 'absolute';
            cards[nextIndex].style.transform = 'translateX(40%) scale(0.75)';

            // Hide other cards
            cards.forEach((card, index) => {
                if (index !== prevIndex && index !== currentIndex && index !== nextIndex) {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                    card.style.transform = 'translateX(0) scale(0)';
                }
            });

            // Center the track
            if (carouselTrack) {
                carouselTrack.style.width = '100%';
                carouselTrack.style.justifyContent = 'center';
            }
        }

        // Update dots
        updateDots();

        // Reset animation lock after transition
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('w-8', 'bg-[#f53003]');
                dot.classList.remove('w-2', 'bg-[#e3e3e0]');
                dot.classList.remove('dark:bg-[#3E3E3A]');
            } else {
                dot.classList.remove('w-8', 'bg-[#f53003]');
                dot.classList.add('w-2', 'bg-[#e3e3e0]');
                // Ensure dark mode styles are applied
                if (document.documentElement.classList.contains('dark')) {
                    dot.classList.add('dark:bg-[#3E3E3A]');
                }
            }
        });
    }

    function goToSlide(index) {
        if (isAnimating) return;
        currentIndex = (index + totalCards) % totalCards;
        updateCarousel();
        resetAutoPlay();
    }

    function nextSlide() {
        if (isAnimating) return;
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
        resetAutoPlay();
    }

    function prevSlide() {
        if (isAnimating) return;
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
        resetAutoPlay();
    }

    // Event Listeners for buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

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

    // Touch/Swipe support for mobile
    if (carouselTrack) {
        carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carouselTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        // Mouse drag support (desktop only)
        if (!isMobile()) {
            let isDragging = false;
            let dragStartX = 0;

            carouselTrack.addEventListener('mousedown', (e) => {
                isDragging = true;
                dragStartX = e.clientX;
                carouselTrack.style.cursor = 'grabbing';
            });

            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
            });

            document.addEventListener('mouseup', (e) => {
                if (!isDragging) return;
                isDragging = false;
                carouselTrack.style.cursor = 'grab';

                const dragEndX = e.clientX;
                const dragDistance = dragStartX - dragEndX;

                if (Math.abs(dragDistance) > minSwipeDistance) {
                    if (dragDistance > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                }
            });
        }
    }

    function handleSwipe() {
        const swipeDistance = touchStartX - touchEndX;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                // Swipe left - next
                nextSlide();
            } else {
                // Swipe right - prev
                prevSlide();
            }
        }
    }

    // Auto-play functions
    function startAutoPlay() {
        // Disable autoplay on mobile for better UX
        if (!isMobile()) {
            autoPlayInterval = setInterval(nextSlide, 5000);
        }
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Auto-play with pause on hover (desktop only)
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            if (!isMobile()) {
                stopAutoPlay();
            }
        });

        carouselContainer.addEventListener('mouseleave', () => {
            if (!isMobile()) {
                startAutoPlay();
            }
        });
    }

    // Responsive handling
    function handleResponsive() {
        updateCarousel();

        // Restart autoplay based on screen size
        stopAutoPlay();
        startAutoPlay();

        // Update cursor for desktop
        if (carouselTrack) {
            if (!isMobile()) {
                carouselTrack.style.cursor = 'grab';
            } else {
                carouselTrack.style.cursor = 'default';
            }
        }
    }

    // Debounced resize handler
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResponsive, 250);
    });

    // Pause autoplay when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            resetAutoPlay();
        }
    });

    // Initialize carousel
    updateCarousel();

    // Start autoplay after a short delay
    setTimeout(() => {
        startAutoPlay();
    }, 1000);

    // Set initial cursor for desktop
    if (carouselTrack && !isMobile()) {
        carouselTrack.style.cursor = 'grab';
    }
});
