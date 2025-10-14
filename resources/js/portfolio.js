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

    // Check if mobile or tablet
    function isMobile() {
        return window.innerWidth < 1024; // Changed from 768 to 1024 for tablet support
    }

    function updateCarousel() {
        if (isAnimating) return;
        isAnimating = true;

        if (isMobile()) {
            // Mobile/Tablet: Horizontal scroll approach
            cards.forEach((card, index) => {
                card.classList.remove('active', 'prev', 'next', 'hidden');
                // Reset styles for mobile
                card.style.display = 'block';
                card.style.position = 'absolute';
                card.style.width = '100%';
                card.style.left = `${index * 100}%`;
                card.style.transform = `translateX(${-currentIndex * 100}%)`;
                card.style.opacity = '1';
                card.style.zIndex = '20';

                // Add active class to current card for styling purposes
                if (index === currentIndex) {
                    card.classList.add('active');
                }
            });

            // Ensure track is properly sized
            if (carouselTrack) {
                carouselTrack.style.position = 'relative';
                carouselTrack.style.width = '100%';
                carouselTrack.style.height = '100%';
            }
        } else {
            // Desktop: Show prev, active, and next with stacked effect
            cards.forEach(card => {
                card.classList.remove('active', 'prev', 'next', 'hidden');
                card.style.display = '';
                card.style.position = '';
                card.style.left = '';
                card.style.right = '';
                card.style.width = '';
                card.style.opacity = '';
                card.style.zIndex = '';
            });

            const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
            const nextIndex = (currentIndex + 1) % totalCards;

            // Apply desktop transformations
            cards[prevIndex].classList.add('prev');
            cards[prevIndex].style.display = 'block';
            cards[prevIndex].style.position = 'absolute';
            cards[prevIndex].style.transform = 'translateX(-40%) scale(0.75)';
            cards[prevIndex].style.opacity = '0.8';
            cards[prevIndex].style.zIndex = '20';

            cards[currentIndex].classList.add('active');
            cards[currentIndex].style.display = 'block';
            cards[currentIndex].style.position = 'absolute';
            cards[currentIndex].style.transform = 'translateX(0) scale(1)';
            cards[currentIndex].style.opacity = '1';
            cards[currentIndex].style.zIndex = '30';

            cards[nextIndex].classList.add('next');
            cards[nextIndex].style.display = 'block';
            cards[nextIndex].style.position = 'absolute';
            cards[nextIndex].style.transform = 'translateX(40%) scale(0.75)';
            cards[nextIndex].style.opacity = '0.8';
            cards[nextIndex].style.zIndex = '20';

            // Hide other cards on desktop
            cards.forEach((card, index) => {
                if (index !== prevIndex && index !== currentIndex && index !== nextIndex) {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                    card.style.transform = 'translateX(0) scale(0)';
                    card.style.opacity = '0';
                    card.style.zIndex = '10';
                }
            });
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
                dot.classList.remove('w-2', 'bg-[#e3e3e0]', 'dark:bg-[#3E3E3A]');
            } else {
                dot.classList.remove('w-8', 'bg-[#f53003]');
                dot.classList.add('w-2', 'bg-[#e3e3e0]');
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

    // Expose navigation functions globally for mobile buttons
    window.carouselPrev = prevSlide;
    window.carouselNext = nextSlide;

    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.index));
        });
    });

    // Keyboard navigation (desktop only)
    if (!isMobile()) {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
    }

    // Touch/Swipe support for mobile
    if (carouselTrack) {
        let isScrolling = false;

        carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            isScrolling = false;
        }, { passive: true });

        carouselTrack.addEventListener('touchmove', (e) => {
            isScrolling = true;
        }, { passive: true });

        carouselTrack.addEventListener('touchend', (e) => {
            if (!isScrolling) return;
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
                e.preventDefault();
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
        // Only autoplay on desktop
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
    if (carouselContainer && !isMobile()) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }

    // Responsive handling
    function handleResponsive() {
        // Clear any lingering styles before update
        cards.forEach(card => {
            card.style.transition = 'none'; // Temporarily disable transition
        });

        updateCarousel();

        // Re-enable transitions after a brief delay
        setTimeout(() => {
            cards.forEach(card => {
                card.style.transition = ''; // Re-enable transition
            });
        }, 50);

        // Restart autoplay based on screen size
        stopAutoPlay();
        startAutoPlay();

        // Update cursor for desktop
        if (carouselTrack && !isMobile()) {
            carouselTrack.style.cursor = 'grab';
        } else if (carouselTrack) {
            carouselTrack.style.cursor = 'default';
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
        } else if (!isMobile()) {
            resetAutoPlay();
        }
    });

    // Initialize carousel
    updateCarousel();

    // Start autoplay after a short delay (desktop only)
    if (!isMobile()) {
        setTimeout(startAutoPlay, 1000);
    }

    // Set initial cursor for desktop
    if (carouselTrack && !isMobile()) {
        carouselTrack.style.cursor = 'grab';
    }
});
