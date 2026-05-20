'use strict';

(function () {
    const navToggle = document.getElementById('navToggle');
    const siteNav = document.getElementById('siteNav');
    const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
    const revealItems = document.querySelectorAll('.reveal');
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if (!siteNav || !navLinks.length) return;

    function closeNav() {
        document.body.classList.remove('nav-open');
        siteNav.classList.remove('open');
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }

    function setActiveLink(sectionId) {
        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
    }

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const isOpen = siteNav.classList.toggle('open');
            document.body.classList.toggle('nav-open', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            closeNav();
            const targetId = link.getAttribute('href').slice(1);
            setActiveLink(targetId);
        });
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
})();
