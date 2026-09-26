/**
 * Khant Phyo Wai - Portfolio Scripts
 * Consolidated and Optimized
 */

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    initNavigation();
    initParticles();
    initTypewriter();
    initScrollAnimations();
    initStatsCounter();
    initFilter();
    initContactForm();
    initTheme();
    initLanguage();
}

// 1. Navigation & Mobile Menu
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    const links = document.querySelectorAll('.nav-menu a');

    // Toggle Mobile Menu
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 2. Particle System (Optimized)
function initParticles() {
    const container = document.getElementById('particles-js');
    if (!container) return;

    const particleCount = window.innerWidth < 768 ? 30 : 60;
    const colors = ['rgba(15, 118, 110, 0.5)', 'rgba(245, 158, 11, 0.3)']; // Teal and Gold

    for (let i = 0; i < particleCount; i++) {
        createParticle(container, colors);
    }
}

function createParticle(container, colors) {
    const p = document.createElement('div');
    const size = Math.random() * 5 + 2;
    
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.position = 'absolute';
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    p.style.borderRadius = '50%';
    p.style.opacity = Math.random() * 0.5 + 0.1;
    p.style.pointerEvents = 'none';
    
    // Simple animation using Web Animations API
    const duration = Math.random() * 20000 + 10000;
    const xMove = (Math.random() - 0.5) * 100;
    const yMove = (Math.random() - 0.5) * 100;

    p.animate([
        { transform: 'translate(0, 0)' },
        { transform: `translate(${xMove}px, ${yMove}px)` }
    ], {
        duration: duration,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out'
    });

    container.appendChild(p);
}

// 3. Typewriter Effect
function initTypewriter() {
    const el = document.getElementById('typed-text');
    if (!el) return;

    const roles = [
        "CFO & Co-Founder",
        "AI Engineer", 
        "Business Strategist",
        "Financial Modeler"
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const current = roles[roleIndex];
        
        if (isDeleting) {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === current.length) {
            speed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }
    
    type();
}

// 4. Scroll Animations (Intersection Observer)
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate').forEach(el => observer.observe(el));
}

// 5. Stats Counter
function initStatsCounter() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(el => observer.observe(el));
}

function animateNumber(el) {
    const target = parseFloat(el.getAttribute('data-count'));
    const isFloat = target % 1 !== 0;
    const duration = 2000;
    const start = performance.now();

    function update(time) {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // Cubic ease out
        
        const current = target * ease;
        el.textContent = isFloat ? current.toFixed(1) : Math.floor(current);

        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

// 6. Project Filtering
function initFilter() {
    const btns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active state
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            cards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = filter === 'all' && card.classList.contains('flagship') ? 'grid' : 'block';
                    // Slight timeout for transition
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });
}

// 7. Contact Form (EmailJS)
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Initialize EmailJS (replace with your PUBLIC KEY)
    emailjs.init("QNyoNjMgEzvt60yOZ"); 

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const status = document.getElementById('form-status');
        
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        emailjs.sendForm('service_id', 'template_id', form) // Replace IDs
            .then(() => {
                status.innerHTML = '<p style="color: green; margin-top: 10px;">Message sent successfully!</p>';
                form.reset();
            })
            .catch((err) => {
                console.error(err);
                status.innerHTML = '<p style="color: red; margin-top: 10px;">Failed to send. Please try again.</p>';
            })
            .finally(() => {
                btn.disabled = false;
                btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
            });
    });
}

// 8. Theme & Language (Basic Implementation)
function initTheme() {
    const toggle = document.querySelector('.theme-switch');
    const saved = localStorage.getItem('theme');

    if (saved === 'dark') document.body.classList.add('dark-mode');

    if (toggle) {
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            toggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
    }
}

function initLanguage() {
    // Basic placeholder for language switching logic
    const langOptions = document.querySelectorAll('.dropdown-content a');
    langOptions.forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = opt.getAttribute('data-lang');
            document.querySelector('.current-lang').textContent = lang.toUpperCase();
            // Implementation for text replacement goes here based on your original object
        });
    });
}