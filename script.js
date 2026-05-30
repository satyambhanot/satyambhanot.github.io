'use strict';

(function () {
    const navToggle = document.getElementById('navToggle');
    const siteNav = document.getElementById('siteNav');
    const themeToggle = document.getElementById('themeToggle');
    const contactForm = document.getElementById('contactForm');
    const backToTop = document.getElementById('backToTop');
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
        setActiveLink('about');
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
