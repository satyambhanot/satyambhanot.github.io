'use strict';

(function () {
    const navToggle = document.getElementById('navToggle');
    const siteNav = document.getElementById('siteNav');
    const themeToggle = document.getElementById('themeToggle');
    const contactForm = document.getElementById('contactForm');
    const backToTop = document.getElementById('backToTop');
    const hero = document.getElementById('hero');
    const projectToggles = Array.from(document.querySelectorAll('.project-toggle'));
    const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
    const sectionLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
    const revealItems = document.querySelectorAll('.reveal');
    const sections = sectionLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    let storedTheme = null;
    let prefersDark = false;

    try {
        storedTheme = localStorage.getItem('theme');
        prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (error) {
        storedTheme = null;
        prefersDark = false;
    }

    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

    function applyTheme(theme) {
        document.documentElement.dataset.theme = theme;
        if (themeToggle) {
            const nextTheme = theme === 'dark' ? 'light' : 'dark';
            themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
        }
    }

    applyTheme(initialTheme);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hero && !prefersReducedMotion) {
        let animationFrame = null;

        function resetHeroMotion() {
            hero.style.setProperty('--tilt-x', '0deg');
            hero.style.setProperty('--tilt-y', '0deg');
        }

        hero.addEventListener('pointermove', (event) => {
            if (window.innerWidth <= 920) return;
            const rect = hero.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            if (animationFrame) {
                window.cancelAnimationFrame(animationFrame);
            }

            animationFrame = window.requestAnimationFrame(() => {
                hero.style.setProperty('--tilt-x', `${(-y * 4).toFixed(2)}deg`);
                hero.style.setProperty('--tilt-y', `${(x * 5).toFixed(2)}deg`);
            });
        });

        hero.addEventListener('pointerleave', resetHeroMotion);
        window.addEventListener('blur', resetHeroMotion);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            try {
                localStorage.setItem('theme', nextTheme);
            } catch (error) {
                // Theme still changes for the current page even if persistence is unavailable.
            }
            applyTheme(nextTheme);
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(contactForm);
            const name = String(formData.get('name') || '').trim();
            const email = String(formData.get('email') || '').trim();
            const message = String(formData.get('message') || '').trim();
            const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'website visitor'}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
            window.location.href = `mailto:satyambhanot@gmail.com?subject=${subject}&body=${body}`;
        });
    }

    if (backToTop) {
        backToTop.addEventListener('click', (event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            history.replaceState(null, '', window.location.pathname + window.location.search);
        });
    }

    function setProjectDetails(toggle, isOpen) {
        const card = toggle.closest('[data-project-card]');
        if (!card) return;

        const front = card.querySelector('.project-front');
        const back = card.querySelector('.project-back');
        card.classList.toggle('is-flipped', isOpen);
        front?.setAttribute('aria-hidden', String(isOpen));
        back?.setAttribute('aria-hidden', String(!isOpen));

        card.querySelectorAll('.project-toggle').forEach((button) => {
            button.setAttribute('aria-expanded', String(isOpen));
            if (!button.classList.contains('project-toggle-back')) {
                button.textContent = isOpen ? 'Showing details' : 'View details';
            }
        });
    }

    projectToggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
            const card = toggle.closest('[data-project-card]');
            const isOpen = card?.classList.contains('is-flipped');
            setProjectDetails(toggle, !isOpen);
        });
    });

    if (!siteNav || !navLinks.length) return;

    function closeNav() {
        document.body.classList.remove('nav-open');
        siteNav.classList.remove('open');
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }

    const navCursor = document.createElement('span');
    navCursor.className = 'nav-cursor';
    navCursor.setAttribute('aria-hidden', 'true');
    siteNav.appendChild(navCursor);

    function moveNavCursor() {
        const active = siteNav.querySelector('a.active');
        if (window.innerWidth <= 920 || !active) {
            navCursor.style.opacity = '0';
            return;
        }
        navCursor.style.opacity = '1';
        navCursor.style.width = `${active.offsetWidth}px`;
        navCursor.style.transform = `translateX(${active.offsetLeft}px)`;
    }

    function setActiveLink(sectionId) {
        sectionLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
        moveNavCursor();
    }

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const isOpen = siteNav.classList.toggle('open');
            document.body.classList.toggle('nav-open', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    sectionLinks.forEach((link) => {
        link.addEventListener('click', () => {
            closeNav();
            const targetId = link.getAttribute('href').slice(1);
            setActiveLink(targetId);
        });
    });

    navLinks
        .filter((link) => !link.getAttribute('href').startsWith('#'))
        .forEach((link) => {
            link.addEventListener('click', closeNav);
        });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeNav();
            projectToggles.forEach((toggle) => setProjectDetails(toggle, false));
        }
    });

    document.addEventListener('click', (event) => {
        if (!siteNav.classList.contains('open')) return;
        if (siteNav.contains(event.target) || navToggle?.contains(event.target)) return;
        closeNav();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 920) {
            closeNav();
        }
        moveNavCursor();
    });

    if (window.location.hash) {
        setActiveLink(window.location.hash.slice(1));
    } else {
        setActiveLink('build');
    }

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealItems.forEach((item) => revealObserver.observe(item));

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                setActiveLink(entry.target.id);
            });
        }, {
            threshold: 0.18,
            rootMargin: '-92px 0px -45% 0px'
        });

        sections.forEach((section) => sectionObserver.observe(section));
    } else {
        revealItems.forEach((item) => item.classList.add('is-visible'));
    }
    window.addEventListener('load', moveNavCursor);
})();
