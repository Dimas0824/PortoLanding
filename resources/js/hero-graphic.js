// resources/js/hero-graphic.js

(function () {
    'use strict';

    // Configuration
    const config = {
        stars: {
            count: 100,
            maxSize: 2,
            minSize: 0.5,
            speed: 0.3,
            colors: ['#ffffff', '#ffeb3b', '#ff9800', '#ff5722']
        },
        parallax: {
            enabled: true,
            intensity: 20,
            smoothing: 0.1
        },
        animations: {
            starsEnabled: true,
            interactionEnabled: true
        }
    };

    // Star class for animated background
    class Star {
        constructor(canvas) {
            this.canvas = canvas;
            this.reset();
            this.y = Math.random() * this.canvas.height;
        }

        reset() {
            this.x = Math.random() * this.canvas.width;
            this.y = -10;
            this.size = Math.random() * (config.stars.maxSize - config.stars.minSize) + config.stars.minSize;
            this.speed = Math.random() * config.stars.speed + 0.1;
            this.opacity = Math.random() * 0.8 + 0.2;
            this.color = config.stars.colors[Math.floor(Math.random() * config.stars.colors.length)];
            this.twinkle = Math.random() * Math.PI;
        }

        update(deltaTime) {
            this.y += this.speed * deltaTime / 16;
            this.twinkle += 0.02;

            // Diagonal movement for depth effect
            this.x += Math.sin(this.twinkle) * 0.1;

            // Reset star when it goes off screen
            if (this.y > this.canvas.height + 10) {
                this.reset();
            }
        }

        draw(ctx) {
            const twinkleOpacity = this.opacity * (0.5 + Math.sin(this.twinkle) * 0.5);

            ctx.save();
            ctx.globalAlpha = twinkleOpacity;

            // Draw star with glow effect
            ctx.fillStyle = this.color;
            ctx.shadowBlur = this.size * 2;
            ctx.shadowColor = this.color;

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
    }

    // Shooting star class
    class ShootingStar {
        constructor(canvas) {
            this.canvas = canvas;
            this.reset();
        }

        reset() {
            this.x = Math.random() * this.canvas.width;
            this.y = 0;
            this.length = Math.random() * 80 + 20;
            this.speed = Math.random() * 10 + 5;
            this.opacity = 0;
            this.fadeIn = true;
            this.angle = Math.random() * 60 + 30; // Angle in degrees
            this.life = 0;
            this.maxLife = Math.random() * 100 + 100;
        }

        update(deltaTime) {
            this.life++;

            if (this.fadeIn) {
                this.opacity = Math.min(this.opacity + 0.02, 0.8);
                if (this.opacity >= 0.8) this.fadeIn = false;
            } else {
                this.opacity = Math.max(this.opacity - 0.01, 0);
            }

            const angleRad = this.angle * Math.PI / 180;
            this.x += Math.cos(angleRad) * this.speed;
            this.y += Math.sin(angleRad) * this.speed;

            if (this.life > this.maxLife || this.x > this.canvas.width || this.y > this.canvas.height) {
                this.reset();
            }
        }

        draw(ctx) {
            if (this.opacity <= 0) return;

            ctx.save();
            ctx.globalAlpha = this.opacity;

            const angleRad = this.angle * Math.PI / 180;
            const endX = this.x - Math.cos(angleRad) * this.length;
            const endY = this.y - Math.sin(angleRad) * this.length;

            // Create gradient for shooting star trail
            const gradient = ctx.createLinearGradient(this.x, this.y, endX, endY);
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(0.4, '#ffeb3b');
            gradient.addColorStop(1, 'transparent');

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(endX, endY);
            ctx.stroke();

            ctx.restore();
        }
    }

    // Main Hero Graphic Controller
    class HeroGraphic {
        constructor() {
            this.container = document.getElementById('hero-graphic');
            this.canvas = document.getElementById('stars-canvas');

            if (!this.container || !this.canvas) return;

            this.ctx = this.canvas.getContext('2d');
            this.stars = [];
            this.shootingStars = [];
            this.mouseX = 0;
            this.mouseY = 0;
            this.targetMouseX = 0;
            this.targetMouseY = 0;
            this.lastTime = 0;

            this.init();
        }

        init() {
            this.setupCanvas();
            this.createStars();
            this.bindEvents();
            this.animate();

            // Enable parallax
            if (config.parallax.enabled) {
                this.container.setAttribute('data-parallax', 'true');
            }

            // Occasional shooting star
            setInterval(() => {
                if (this.shootingStars.length < 2 && Math.random() > 0.7) {
                    this.shootingStars.push(new ShootingStar(this.canvas));
                }
            }, 3000);
        }

        setupCanvas() {
            const rect = this.container.getBoundingClientRect();
            this.canvas.width = rect.width;
            this.canvas.height = rect.height;

            // Handle resize
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    const rect = this.container.getBoundingClientRect();
                    this.canvas.width = rect.width;
                    this.canvas.height = rect.height;
                    this.createStars();
                }, 250);
            });
        }

        createStars() {
            this.stars = [];
            const starCount = Math.min(config.stars.count, Math.floor(this.canvas.width * this.canvas.height / 5000));

            for (let i = 0; i < starCount; i++) {
                this.stars.push(new Star(this.canvas));
            }
        }

        bindEvents() {
            // Mouse movement for parallax effect
            document.addEventListener('mousemove', (e) => {
                if (!config.parallax.enabled) return;

                const rect = this.container.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                this.targetMouseX = (e.clientX - centerX) / rect.width;
                this.targetMouseY = (e.clientY - centerY) / rect.height;
            });

            // Touch support for mobile
            document.addEventListener('touchmove', (e) => {
                if (!config.parallax.enabled || !e.touches[0]) return;

                const rect = this.container.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                this.targetMouseX = (e.touches[0].clientX - centerX) / rect.width;
                this.targetMouseY = (e.touches[0].clientY - centerY) / rect.height;
            });

            // Scroll parallax
            window.addEventListener('scroll', () => {
                if (!config.parallax.enabled) return;

                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.2;

                const mainPlanet = this.container.querySelector('.planet-main');
                if (mainPlanet) {
                    mainPlanet.style.transform = `translateY(${rate * 0.3}px) scale(${1 + Math.abs(rate) * 0.0001})`;
                }
            });
        }

        applyParallax() {
            // Smooth mouse following
            this.mouseX += (this.targetMouseX - this.mouseX) * config.parallax.smoothing;
            this.mouseY += (this.targetMouseY - this.mouseY) * config.parallax.smoothing;

            const intensity = config.parallax.intensity;

            // Apply to main planet
            const mainPlanet = this.container.querySelector('.planet-main');
            if (mainPlanet) {
                const x = this.mouseX * intensity;
                const y = this.mouseY * intensity;
                mainPlanet.style.transform = `translate(${x}px, ${y}px) translateY(0) scale(1)`;
            }

            // Apply to orbiting planets (less intensity)
            const planetWrappers = this.container.querySelectorAll('.planet-wrapper');
            planetWrappers.forEach((wrapper, index) => {
                const x = this.mouseX * intensity * (0.6 - index * 0.1);
                const y = this.mouseY * intensity * (0.6 - index * 0.1);
                wrapper.style.transform = `translate(${x}px, ${y}px) rotate(${wrapper.style.transform?.match(/rotate\((.*?)deg\)/)?.[1] || 0}deg)`;
            });

            // Apply to orbits (even less intensity)
            const orbits = this.container.querySelectorAll('.orbit');
            orbits.forEach((orbit, index) => {
                const x = this.mouseX * intensity * 0.3;
                const y = this.mouseY * intensity * 0.3;
                orbit.style.transform = `translate(${x}px, ${y}px) scale(1)`;
            });
        }

        animate(currentTime = 0) {
            const deltaTime = currentTime - this.lastTime;
            this.lastTime = currentTime;

            // Clear canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Update and draw stars
            if (config.animations.starsEnabled) {
                this.stars.forEach(star => {
                    star.update(deltaTime);
                    star.draw(this.ctx);
                });

                // Update and draw shooting stars
                this.shootingStars = this.shootingStars.filter(star => {
                    star.update(deltaTime);
                    star.draw(this.ctx);
                    return star.life < star.maxLife;
                });
            }

            // Apply parallax effect
            if (config.parallax.enabled && config.animations.interactionEnabled) {
                this.applyParallax();
            }

            requestAnimationFrame(this.animate.bind(this));
        }
    }

    // Performance optimization for mobile
    function isMobile() {
        return window.innerWidth <= 768 ||
            ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0);
    }

    // Adjust configuration for mobile devices
    if (isMobile()) {
        config.stars.count = 50;
        config.parallax.intensity = 10;
        config.animations.starsEnabled = true; // Can be set to false for better performance
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new HeroGraphic();
        });
    } else {
        new HeroGraphic();
    }

})();
