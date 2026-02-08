/* ===================================
   Page Loader with Percentage Counter
   =================================== */
(function() {
    const loaderPercent = document.getElementById('loaderPercent');
    const loaderBarFill = document.getElementById('loaderBarFill');
    const pageLoader = document.getElementById('pageLoader');
    let progress = 0;
    const duration = 1800;
    const startTime = performance.now();

    function updateLoader(currentTime) {
        const elapsed = currentTime - startTime;
        const rawProgress = Math.min(elapsed / duration, 1);
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
            }, 300);
        }
    }

    requestAnimationFrame(updateLoader);
})();

/* ===================================
   Particle System (Blue/Cyan on Dark)
   =================================== */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouseX = 0;
let mouseY = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

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
        if (dist < 120) {
            this.x -= dx * 0.008;
            this.y -= dy * 0.008;
        }

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        const style = getComputedStyle(document.documentElement);
        const rgb = style.getPropertyValue('--particle-color').trim();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${this.opacity})`;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function drawLines() {
    const style = getComputedStyle(document.documentElement);
    const rgb = style.getPropertyValue('--particle-color').trim();
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 130) {
                const alpha = (1 - dist / 130) * 0.15;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
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
animateParticles();

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

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
    glowX += (cursorX - glowX) * 0.12;
    glowY += (cursorY - glowY) * 0.12;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

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

// Check for saved preference
const savedTheme = localStorage.getItem('theme') || 'dark';
root.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
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
let typeSpeed = 80;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 35;
    } else {
        typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
    }
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2200;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400;
    }
    setTimeout(typeEffect, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 2000);
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
   Animated Skill Bars
   =================================== */
const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.skill-bar-fill');
            fills.forEach((fill, i) => {
                setTimeout(() => {
                    const targetWidth = fill.getAttribute('data-width');
                    fill.style.width = targetWidth + '%';
                    fill.classList.add('animated');
                }, i * 150);
            });
            skillBarObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-bars').forEach(el => {
    skillBarObserver.observe(el);
});

/* ===================================
   Stats Counter — Smooth Odometer Ticker
   =================================== */
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach((counter, idx) => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2200 + idx * 200; // Stagger each counter
                const startTime = performance.now();
                let lastValue = -1;

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out expo for odometer feel — fast start, smooth stop
                    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                    const current = Math.floor(eased * target);

                    if (current !== lastValue) {
                        counter.textContent = current.toLocaleString();
                        // Subtle scale bump on digit change
                        counter.style.transform = 'scale(1.02)';
                        setTimeout(() => { counter.style.transform = 'scale(1)'; }, 60);
                        lastValue = current;
                    }

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                        counter.style.transform = 'scale(1)';
                    }
                }

                // Stagger start of each counter
                setTimeout(() => requestAnimationFrame(updateCounter), idx * 100);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

document.querySelectorAll('.stats-grid').forEach(el => {
    statsObserver.observe(el);
});

/* ===================================
   Navbar Scroll Effect
   =================================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

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

    const btn = contactForm.querySelector('button');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span>✓ Message Sent!</span>';
    btn.style.background = '#22c55e';
    btn.style.borderColor = '#22c55e';
    btn.disabled = true;
    contactForm.reset();

    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
    }, 3000);
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
        hue = (hue + 3) % 360;
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
    }, 50);

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);

    setTimeout(() => {
        clearInterval(rainbow);
        // Reset to theme defaults
        const props = ['--accent', '--accent-hover', '--accent-subtle', '--accent-border', '--accent-glow', '--shadow-accent', '--particle-color', '--gradient-accent', '--gradient-text', '--gradient-btn'];
        props.forEach(p => document.documentElement.style.removeProperty(p));
    }, 10000);
}

/* ===================================
   Back to Top Button
   =================================== */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===================================
   Magnetic Buttons
   =================================== */
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        // Pull button toward cursor by 30% of distance
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
        btn.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease';
    });

    btn.addEventListener('mouseenter', () => {
        btn.style.transition = 'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease';
    });
});

/* ===================================
   Parallax Scrolling
   =================================== */
const heroContent = document.querySelector('.hero-content');
const particleCanvas = document.getElementById('particleCanvas');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Only apply parallax in hero area for performance
    if (scrollY < windowHeight * 1.5) {
        // Hero content moves up faster than scroll
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollY * 0.35}px)`;
            heroContent.style.opacity = 1 - (scrollY / windowHeight) * 0.8;
        }
        // Particles move slower — creates depth
        if (particleCanvas) {
            particleCanvas.style.transform = `translateY(${scrollY * 0.15}px)`;
        }
    }
}, { passive: true });
