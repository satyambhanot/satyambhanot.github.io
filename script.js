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
let typeSpeed = 80;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
    } else {
        typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end of phrase
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});

/* ===================================
   Scroll Animations (Intersection Observer)
   =================================== */
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Once animated, stop observing
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with the animation class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    scrollObserver.observe(el);
});

/* ===================================
   Navbar Scroll Effect
   =================================== */
const navbar = document.getElementById('navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
});

/* ===================================
   Mobile Navigation Toggle
   =================================== */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile nav when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

/* ===================================
   Smooth Scroll for Nav Links
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
   Contact Form Handler
   =================================== */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // For now, show a success message
    // Later you can integrate with Formspree, EmailJS, or a backend
    const btn = contactForm.querySelector('button');
    const originalText = btn.innerHTML;

    btn.innerHTML = '✓ Message Sent!';
    btn.style.background = '#10b981';
    btn.style.borderColor = '#10b981';
    btn.disabled = true;

    contactForm.reset();

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
    }, 3000);
});

/* ===================================
   Active Nav Link Highlighting
   =================================== */
const sections = document.querySelectorAll('.section, .hero');
const navLinkElements = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinkElements.forEach(link => {
                link.style.color = '';
                link.style.background = '';
                if (link.getAttribute('href') === `#${id}`) {
                    link.style.color = 'var(--blue-600)';
                    link.style.background = 'var(--blue-50)';
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
