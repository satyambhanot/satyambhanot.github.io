'use strict';

/* ===================================
   Portfolio — Main Script (IIFE)
   =================================== */
(function () {

    /* --- Configuration Constants --- */
    const LOADER_DURATION_MS = 1800;
    const LOADER_REVEAL_DELAY_MS = 300;

    const PARTICLE_MAX_COUNT = 120;
    const PARTICLE_DENSITY = 12000; // lower = more particles
    const PARTICLE_MOUSE_RADIUS = 120;
    const PARTICLE_MOUSE_DRIFT = 0.008;
    const PARTICLE_LINE_DISTANCE = 130;
    const PARTICLE_LINE_ALPHA = 0.15;
    const PARTICLE_DEFAULT_COLOR = '59, 130, 246';

    const CURSOR_SMOOTH_FACTOR = 0.12;
    const MAGNETIC_PULL = 0.3;

    const NAVBAR_SCROLL_THRESHOLD = 50;
    const BACK_TO_TOP_THRESHOLD = 600;

    const TYPING_SPEED = 80;
    const TYPING_DELETE_SPEED = 35;
    const TYPING_PAUSE_MS = 2200;
    const TYPING_NEXT_PHRASE_DELAY = 400;
    const TYPING_INITIAL_DELAY_MS = 2000;

    const PARALLAX_HERO_SPEED = 0.35;
    const PARALLAX_PARTICLE_SPEED = 0.15;
    const PARALLAX_FADE_FACTOR = 0.8;

    const EASTER_EGG_HUE_STEP = 3;
    const EASTER_EGG_INTERVAL_MS = 50;
    const EASTER_EGG_TOAST_MS = 4000;
    const EASTER_EGG_DURATION_MS = 10000;

    const CONTACT_EMAIL = 'satyambhanot@gmail.com';
    const FORM_SUCCESS_DISPLAY_MS = 3000;

    /* --- Computed helpers --- */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ===================================
       Page Loader with Percentage Counter
       =================================== */
    (function () {
        const loaderPercent = document.getElementById('loaderPercent');
        const loaderBarFill = document.getElementById('loaderBarFill');
        const pageLoader = document.getElementById('pageLoader');
        let progress = 0;
        const startTime = performance.now();

        function updateLoader(currentTime) {
            const elapsed = currentTime - startTime;
            const rawProgress = Math.min(elapsed / LOADER_DURATION_MS, 1);
            // Ease out cubic for natural feel
            progress = Math.floor((1 - Math.pow(1 - rawProgress, 3)) * 100);
            loaderPercent.textContent = progress + '%';
            loaderBarFill.style.width = progress + '%';

            if (rawProgress < 1) {
                requestAnimationFrame(updateLoader);
            } else {
                loaderPercent.textContent = '100%';
                loaderBarFill.style.width = '100%';
                setTimeout(() => {
                    pageLoader.classList.add('hidden');
                    document.body.classList.add('loaded');
                }, LOADER_REVEAL_DELAY_MS);
            }
        }

        requestAnimationFrame(updateLoader);
    })();

    /* ===================================
       Particle System
       =================================== */
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;

    // Cache particle color to avoid getComputedStyle() on every frame
    let cachedParticleColor = PARTICLE_DEFAULT_COLOR;
    function updateParticleColor() {
        const style = getComputedStyle(document.documentElement);
        cachedParticleColor = style.getPropertyValue('--particle-color').trim();
    }
    updateParticleColor();

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Mouse interaction — particles gently drift away
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < PARTICLE_MOUSE_RADIUS) {
                this.x -= dx * PARTICLE_MOUSE_DRIFT;
                this.y -= dy * PARTICLE_MOUSE_DRIFT;
            }

            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${cachedParticleColor}, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const count = Math.min(Math.floor((canvas.width * canvas.height) / PARTICLE_DENSITY), PARTICLE_MAX_COUNT);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < PARTICLE_LINE_DISTANCE) {
                    const alpha = (1 - dist / PARTICLE_LINE_DISTANCE) * PARTICLE_LINE_ALPHA;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${cachedParticleColor}, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        drawLines();
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    if (!prefersReducedMotion) {
        animateParticles();
    }

    /* ===================================
       Custom Cursor (Glowing Dot)
       =================================== */
    const cursorGlow = document.getElementById('cursorGlow');
    const cursorDot = document.getElementById('cursorDot');

    let cursorX = 0, cursorY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorX = e.clientX;
        cursorY = e.clientY;
        cursorDot.style.left = cursorX + 'px';
        cursorDot.style.top = cursorY + 'px';
    });

    // Smooth glow follow
    function animateCursor() {
        glowX += (cursorX - glowX) * CURSOR_SMOOTH_FACTOR;
        glowY += (cursorY - glowY) * CURSOR_SMOOTH_FACTOR;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateCursor);
    }
    if (!prefersReducedMotion) {
        animateCursor();
    }

    // Hover effect on interactive elements
    document.addEventListener('DOMContentLoaded', () => {
        const hoverTargets = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-tag, .detail-chip');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => cursorDot.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursorDot.classList.remove('hovering'));
        });
    });

    /* ===================================
       Dark / Light Theme Toggle
       =================================== */
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;

    // Check for saved preference — default is dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    root.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateParticleColor();
    });

    /* ===================================
       Typing Animation
       =================================== */
    const typedElement = document.getElementById('typedText');
    const phrases = [
        'build Android apps.',
        'analyze data with Python.',
        'solve real-world problems.',
        'write clean, maintainable code.',
        'love mentoring students.',
        'explore AI & data science.'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = TYPING_SPEED;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = TYPING_DELETE_SPEED;
        } else {
            typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = TYPING_SPEED;
        }
        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = TYPING_PAUSE_MS;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = TYPING_NEXT_PHRASE_DELAY;
        }
        setTimeout(typeEffect, typeSpeed);
    }

    document.addEventListener('DOMContentLoaded', () => {
        if (!prefersReducedMotion) {
            setTimeout(typeEffect, TYPING_INITIAL_DELAY_MS);
        } else {
            // Show first phrase immediately without animation
            typedElement.textContent = phrases[0];
        }
    });

    /* ===================================
       Scroll Animations
       =================================== */
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    /* ===================================
       Tab Switching System
       =================================== */
    document.querySelectorAll('.tab-buttons').forEach(tabGroup => {
        const buttons = tabGroup.querySelectorAll('.tab-btn');
        const section = tabGroup.closest('.section');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Deactivate all tabs in this group
                buttons.forEach(b => b.classList.remove('active'));
                section.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

                // Activate clicked tab
                btn.classList.add('active');
                const tabId = 'tab-' + btn.getAttribute('data-tab');
                const targetContent = document.getElementById(tabId);
                if (targetContent) {
                    targetContent.classList.add('active');
                    // Re-trigger scroll animations for newly visible content
                    targetContent.querySelectorAll('.animate-on-scroll:not(.visible)').forEach(el => {
                        scrollObserver.observe(el);
                    });
                }
            });
        });
    });

    /* ===================================
       Navbar Scroll Effect & Back to Top
       =================================== */
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > NAVBAR_SCROLL_THRESHOLD) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        if (scrollY > BACK_TO_TOP_THRESHOLD) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, { passive: true });

    /* ===================================
       Mobile Navigation
       =================================== */
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    /* ===================================
       Smooth Scroll
       =================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ===================================
       Active Nav Highlighting
       =================================== */
    const sections = document.querySelectorAll('.section, .hero');
    const navLinkElements = document.querySelectorAll('.nav-links a:not(.nav-resume-btn)');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinkElements.forEach(link => {
                    link.style.color = '';
                    link.style.background = '';
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.color = 'var(--accent)';
                        link.style.background = 'var(--accent-subtle)';
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-72px 0px -50% 0px'
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    /* ===================================
       Contact Form Handler
       =================================== */
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) return;

        // Build mailto link with form data
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

        const btn = contactForm.querySelector('button');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<span>✓ Opening Email Client...</span>';
        btn.style.background = '#22c55e';
        btn.style.borderColor = '#22c55e';
        btn.disabled = true;
        contactForm.reset();

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.disabled = false;
        }, FORM_SUCCESS_DISPLAY_MS);
    });

    /* ===================================
       Konami Code Easter Egg
       ↑ ↑ ↓ ↓ ← → ← → B A
       =================================== */
    const konamiCode = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        const toast = document.getElementById('easterEggToast');
        toast.classList.add('show');

        // Rainbow mode — cycle accent colors
        document.body.style.transition = 'none';
        let hue = 0;
        const rainbow = setInterval(() => {
            hue = (hue + EASTER_EGG_HUE_STEP) % 360;
            document.documentElement.style.setProperty('--accent', `hsl(${hue}, 80%, 60%)`);
            document.documentElement.style.setProperty('--accent-hover', `hsl(${hue}, 80%, 70%)`);
            document.documentElement.style.setProperty('--accent-subtle', `hsla(${hue}, 80%, 60%, 0.1)`);
            document.documentElement.style.setProperty('--accent-border', `hsla(${hue}, 80%, 60%, 0.2)`);
            document.documentElement.style.setProperty('--accent-glow', `hsla(${hue}, 80%, 60%, 0.3)`);
            document.documentElement.style.setProperty('--shadow-accent', `0 4px 25px hsla(${hue}, 80%, 60%, 0.25)`);
            document.documentElement.style.setProperty('--gradient-accent', `linear-gradient(135deg, hsl(${hue}, 80%, 85%), hsl(${(hue + 60) % 360}, 80%, 60%))`);
            document.documentElement.style.setProperty('--gradient-text', `linear-gradient(135deg, #ffffff, hsl(${hue}, 80%, 65%))`);
            document.documentElement.style.setProperty('--gradient-btn', `linear-gradient(135deg, hsl(${hue}, 80%, 80%), hsl(${(hue + 60) % 360}, 80%, 60%))`);
            document.documentElement.style.setProperty('--particle-color',
                `${Math.round(128 + 127 * Math.cos(hue * Math.PI / 180))}, ${Math.round(128 + 127 * Math.cos((hue - 120) * Math.PI / 180))}, ${Math.round(128 + 127 * Math.cos((hue - 240) * Math.PI / 180))}`
            );
        }, EASTER_EGG_INTERVAL_MS);

        setTimeout(() => {
            toast.classList.remove('show');
        }, EASTER_EGG_TOAST_MS);

        setTimeout(() => {
            clearInterval(rainbow);
            // Reset to theme defaults
            const props = ['--accent', '--accent-hover', '--accent-subtle', '--accent-border', '--accent-glow', '--shadow-accent', '--particle-color', '--gradient-accent', '--gradient-text', '--gradient-btn'];
            props.forEach(p => document.documentElement.style.removeProperty(p));
        }, EASTER_EGG_DURATION_MS);
    }

    /* ===================================
       Back to Top Button
       =================================== */
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ===================================
       Magnetic Buttons
       =================================== */
    if (!prefersReducedMotion) {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * MAGNETIC_PULL}px, ${y * MAGNETIC_PULL}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
                btn.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease';
            });

            btn.addEventListener('mouseenter', () => {
                btn.style.transition = 'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease';
            });
        });
    }

    /* ===================================
       Parallax Scrolling
       =================================== */
    if (!prefersReducedMotion) {
        const heroContent = document.querySelector('.hero-content');
        const particleCanvas = document.getElementById('particleCanvas');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            if (scrollY < windowHeight * 1.5) {
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrollY * PARALLAX_HERO_SPEED}px)`;
                    heroContent.style.opacity = 1 - (scrollY / windowHeight) * PARALLAX_FADE_FACTOR;
                }
                if (particleCanvas) {
                    particleCanvas.style.transform = `translateY(${scrollY * PARALLAX_PARTICLE_SPEED}px)`;
                }
            }
        }, { passive: true });
    }

})();
