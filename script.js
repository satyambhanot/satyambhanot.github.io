'use strict';

/* ===================================
   Portfolio Main Script (IIFE)
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
    const PARTICLE_DEFAULT_COLOR = '233, 116, 81'; // Terracotta

    const NAVBAR_SCROLL_THRESHOLD = 50;
    const BACK_TO_TOP_THRESHOLD = 600;

    const PARALLAX_HERO_SPEED = 0.35;
    const PARALLAX_PARTICLE_SPEED = 0.15;
    const PARALLAX_FADE_FACTOR = 0.8;

    const CONTACT_EMAIL = 'satyambhanot@gmail.com';
    const FORM_SUCCESS_DISPLAY_MS = 3000;

    /* --- Computed helpers --- */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth <= 1024);

    /* ===================================
       Interactive & 3D Hover Effects Implementation
       =================================== */
    (function initInteractiveEffects() {
        if (prefersReducedMotion || isMobile) return;

        // 1. Initialize VanillaTilt on cards
        const tiltCards = document.querySelectorAll('.education-card, .project-card, .skill-card, .timeline-content');
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(tiltCards, {
                max: 12,
                speed: 400,
                glare: true,
                "max-glare": 0.2,
                scale: 1.02,
                perspective: 1000
            });
        }

        // 2. Custom Cursor Logic
        const cursor = document.getElementById('customCursor');
        const dot = document.getElementById('cursorDot');
        let cursorX = 0, cursorY = 0;
        let dotX = 0, dotY = 0;

        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
        });

        function animateCursor() {
            // Smoothly move the outer circle
            dotX += (cursorX - dotX) * 0.15;
            dotY += (cursorY - dotY) * 0.15;
            
            cursor.style.transform = `translate3d(${cursorX - 6}px, ${cursorY - 6}px, 0)`;
            dot.style.transform = `translate3d(${dotX - 2}px, ${dotY - 2}px, 0)`;
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Cursor expansion on hover
        const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card, .tab-btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-expanded'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-expanded'));
        });

        // 3. Magnetic Buttons Logic
        const magneticElements = document.querySelectorAll('.btn, .nav-links a, .theme-toggle, .nav-logo');
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
            });
        });
    })();

    /* ===================================
       Scroll & Page Dynamics Implementation
       =================================== */
    (function initScrollDynamics() {
        if (prefersReducedMotion) return;

        // 1. Scroll Progress Bar logic
        const progressBar = document.getElementById('scrollProgress');
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    })();

    /* ===================================
       Hero Section Enhancements
       =================================== */
    (function initHeroEnhancements() {
        if (prefersReducedMotion) return;

        // 1. Interactive Name Highlight (Mouse Tracking)
        const highlight = document.querySelector('.hero-name-highlight');
        if (highlight && !isMobile) {
            window.addEventListener('mousemove', (e) => {
                const rect = highlight.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                highlight.style.setProperty('--mouse-x', `${x}%`);
                highlight.style.setProperty('--mouse-y', `${y}%`);
            });
        }

        // 2. Text Scramble Effect
        class TextScramble {
            constructor(el) {
                this.el = el;
                this.chars = '!<>-_\\/[]{}—=+*^?#________';
                this.update = this.update.bind(this);
            }
            setText(newText) {
                const oldText = this.el.innerText;
                const length = Math.max(oldText.length, newText.length);
                const promise = new Promise((resolve) => this.resolve = resolve);
                this.queue = [];
                for (let i = 0; i < length; i++) {
                    const from = oldText[i] || '';
                    const to = newText[i] || '';
                    const start = Math.floor(Math.random() * 40);
                    const end = start + Math.floor(Math.random() * 40);
                    this.queue.push({ from, to, start, end });
                }
                cancelAnimationFrame(this.frameRequest);
                this.frame = 0;
                this.update();
                return promise;
            }
            update() {
                let output = '';
                let complete = 0;
                for (let i = 0, n = this.queue.length; i < n; i++) {
                    let { from, to, start, end, char } = this.queue[i];
                    if (this.frame >= end) {
                        complete++;
                        output += to;
                    } else if (this.frame >= start) {
                        if (!char || Math.random() < 0.28) {
                            char = this.randomChar();
                            this.queue[i].char = char;
                        }
                        output += `<span class="hero-cursor">${char}</span>`;
                    } else {
                        output += from;
                    }
                }
                this.el.innerHTML = output;
                if (complete === this.queue.length) {
                    this.resolve();
                } else {
                    this.frameRequest = requestAnimationFrame(this.update);
                    this.frame++;
                }
            }
            randomChar() {
                return this.chars[Math.floor(Math.random() * this.chars.length)];
            }
        }

        const phrases = [
            'building clean and performant systems.',
            'solving complex CS problems.',
            'mentoring the next generation of devs.',
            'analyzing data with precision.',
            'exploring the future of AI.',
            'passionate about efficient software.'
        ];

        const el = document.getElementById('scrambleText');
        if (el) {
            const fx = new TextScramble(el);
            let counter = 0;
            const next = () => {
                fx.setText(phrases[counter]).then(() => {
                    setTimeout(next, 2500);
                });
                counter = (counter + 1) % phrases.length;
            };
            setTimeout(next, 1500);
        }
    })();

    /* ===================================
       Background & Background Interaction Implementation
       =================================== */
    (function initBackgroundInteraction() {
        if (prefersReducedMotion || isMobile) return;

        const spotlight = document.getElementById('spotlight');
        if (spotlight) {
            window.addEventListener('mousemove', (e) => {
                spotlight.style.setProperty('--cursor-x', `${e.clientX}px`);
                spotlight.style.setProperty('--cursor-y', `${e.clientY}px`);
                
                // Set initial opacity once the mouse is moved
                spotlight.style.opacity = root.getAttribute('data-theme') === 'dark' ? '0.6' : '0.2';
            });
        }
    })();

    /* ===================================
       Micro-Interactions Implementation
       =================================== */
    (function initMicroInteractions() {
        // 1. Copy to Clipboard Email
        const copyEmail = document.getElementById('copyEmail');
        const emailText = document.getElementById('emailText');

        if (copyEmail && emailText) {
            copyEmail.addEventListener('click', (e) => {
                e.preventDefault();
                const email = emailText.innerText;
                
                navigator.clipboard.writeText(email).then(() => {
                    const originalText = emailText.innerText;
                    emailText.innerText = '✓ Copied to Clipboard!';
                    copyEmail.style.color = 'var(--accent)';
                    
                    setTimeout(() => {
                        emailText.innerText = originalText;
                        copyEmail.style.color = '';
                    }, 2000);
                });
            });
        }
    })();

    /* ===================================
       Active Nav Highlighting
       =================================== */
    const sections = document.querySelectorAll('.section, .hero');
    const navLinkElements = document.querySelectorAll('.nav-links a:not(.nav-resume-btn)');

    function highlightNav(id) {
        navLinkElements.forEach(link => {
            link.style.color = '';
            link.style.background = '';
            if (link.getAttribute('href') === `#${id}`) {
                link.style.color = 'var(--accent)';
                link.style.background = 'var(--accent-subtle)';
            }
        });
    }

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                highlightNav(entry.target.getAttribute('id'));
            }
        });
    }, {
        threshold: [0.1, 0.5],
        rootMargin: '-72px 0px -20% 0px'
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Special check for bottom of page (Contact section)
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 80) {
            highlightNav('contact');
        }
    }, { passive: true });

    /* ===================================
       Terminal Easter Egg Implementation
       =================================== */
    (function initTerminalEasterEgg() {
        const terminal = document.getElementById('terminalModal');
        const input = document.getElementById('terminalInput');
        const body = document.getElementById('terminalBody');
        const closeBtn = document.getElementById('closeTerminal');

        if (!terminal || !input) return;

        const commands = {
            help: 'Available commands: [ls, cd, cat, clear, contact, resume, theme]',
            ls: 'about/  education/  experience/  projects/  skills/  contact/',
            'cd about': () => scrollToSection('about'),
            'cd education': () => scrollToSection('education'),
            'cd experience': () => scrollToSection('experience'),
            'cd projects': () => scrollToSection('projects'),
            'cd skills': () => scrollToSection('skills'),
            'cd contact': () => scrollToSection('contact'),
            cat: 'Usage: cat [file_name]. Example: cat about',
            'cat about': 'Satyam Bhanot: CS Honours student at UofM. Problem solver. Mentor.',
            'cat skills': 'Java, Python, C/C++, JS, SQL, R, ML, Data Mining, NLP.',
            clear: () => { body.innerHTML = ''; return ''; },
            contact: () => { scrollToSection('contact'); return 'Navigating to contact...'; },
            resume: () => { window.open('resume.pdf', '_blank'); return 'Opening resume...'; },
            theme: () => { document.getElementById('themeToggle').click(); return 'Toggling theme...'; }
        };

        function scrollToSection(id) {
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                toggleTerminal();
                return `Navigating to ${id}...`;
            }
            return `Section ${id} not found.`;
        }

        function toggleTerminal() {
            const isVisible = terminal.classList.contains('visible');
            if (isVisible) {
                terminal.classList.remove('visible');
                setTimeout(() => terminal.style.display = 'none', 300);
            } else {
                terminal.style.display = 'flex';
                setTimeout(() => {
                    terminal.classList.add('visible');
                    input.focus();
                }, 10);
            }
        }

        // Shortcut: Cmd+K or Ctrl+K
        window.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                toggleTerminal();
            }
            if (e.key === 'Escape' && terminal.classList.contains('visible')) {
                toggleTerminal();
            }
        });

        // Mobile Secret: Triple-tap on footer
        let tapCount = 0;
        let lastTapTime = 0;
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.addEventListener('touchstart', (e) => {
                const now = Date.now();
                if (now - lastTapTime < 400) {
                    tapCount++;
                } else {
                    tapCount = 1;
                }
                lastTapTime = now;
                if (tapCount === 3) {
                    toggleTerminal();
                    tapCount = 0;
                }
            }, { passive: true });
        }

        closeBtn.addEventListener('click', toggleTerminal);

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = input.value.trim().toLowerCase();
                input.value = '';
                
                const line = document.createElement('div');
                line.className = 'terminal-line';
                line.innerHTML = `<span class="terminal-prompt">satyam@portfolio:~$</span> ${cmd}`;
                body.appendChild(line);

                let response = commands[cmd];
                if (typeof response === 'function') {
                    response = response();
                } else if (!response) {
                    // Try partial match for cd/cat
                    if (cmd.startsWith('cd ') || cmd.startsWith('cat ')) {
                        response = `Command error or path not found. Try 'help'.`;
                    } else {
                        response = `Command not found: ${cmd}. Type 'help' for assistance.`;
                    }
                }

                if (response) {
                    const respLine = document.createElement('div');
                    respLine.className = 'terminal-line accent-text';
                    respLine.innerText = response;
                    body.appendChild(respLine);
                }

                body.scrollTop = body.scrollHeight;
            }
        });
    })();

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

    /**
     * Represents a single particle in the background particle system.
     * Each particle has position, size, speed, and opacity properties.
     */
    class Particle {
        constructor() {
            this.reset();
        }

        /** Randomise every property to initial values. */
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        /** Move the particle and apply mouse-repulsion interaction. */
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Mouse interaction: particles gently drift away
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

        /** Render the particle as a filled circle on the canvas. */
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

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    /* ===================================
       Dark / Light Theme Toggle
       =================================== */
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;

    // Check for saved preference. Default is dark.
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
       Smooth Scroll Implementation
       =================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return; // Do nothing for empty links

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 72;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ===================================
       Active Nav Highlighting
       =================================== */
    // Logic integrated above with special bottom-of-page handling

})();
