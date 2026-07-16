/**
 * Main interactions: theme, language, nav, filters, project details,
 * reveal-on-scroll animations, stats counter, scroll-to-top.
 */
(function () {
    'use strict';

    const root = document.documentElement;

    /* ===== Theme toggle ===== */
    const themeSwitch = document.querySelector('.theme-switch');

    function syncThemeIcon() {
        if (!themeSwitch) return;
        const dark = root.classList.contains('dark-mode');
        themeSwitch.innerHTML = dark
            ? '<i class="fas fa-sun" aria-hidden="true"></i>'
            : '<i class="fas fa-moon" aria-hidden="true"></i>';
    }

    if (themeSwitch) {
        syncThemeIcon();
        themeSwitch.addEventListener('click', function () {
            root.classList.toggle('dark-mode');
            localStorage.setItem('theme', root.classList.contains('dark-mode') ? 'dark' : 'light');
            syncThemeIcon();
        });
    }

    /* ===== Language toggle ===== */
    const languageToggle = document.querySelector('.language-toggle');
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';

    function markSelectedLang(lang) {
        if (!languageToggle) return;
        const label = languageToggle.querySelector('.current-lang');
        if (label) label.textContent = lang.toUpperCase();
        languageToggle.querySelectorAll('[data-lang]').forEach(function (a) {
            a.classList.toggle('selected', a.getAttribute('data-lang') === lang);
        });
    }

    function showLanguageNotification() {
        document.querySelectorAll('.language-notification').forEach(function (n) { n.remove(); });
        const notification = document.createElement('div');
        notification.className = 'language-notification';
        notification.textContent = window.I18N ? window.I18N.t('msg.langchanged') : 'Language changed';
        document.body.appendChild(notification);
        setTimeout(function () {
            notification.classList.add('fade-out');
            setTimeout(function () { notification.remove(); }, 500);
        }, 2200);
    }

    if (languageToggle) {
        const trigger = languageToggle.querySelector('.lang-btn');

        trigger.addEventListener('click', function (e) {
            e.stopPropagation();
            languageToggle.classList.toggle('active');
        });

        document.addEventListener('click', function (e) {
            if (!languageToggle.contains(e.target)) languageToggle.classList.remove('active');
        });

        languageToggle.querySelectorAll('[data-lang]').forEach(function (option) {
            option.addEventListener('click', function (e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                localStorage.setItem('preferredLanguage', lang);
                if (window.I18N) window.I18N.apply(lang);
                markSelectedLang(lang);
                showLanguageNotification();
                languageToggle.classList.remove('active');
            });
        });

        markSelectedLang(savedLang);
    }

    // Apply saved language on load
    if (window.I18N && savedLang !== 'en') window.I18N.apply(savedLang);

    /* ===== Mobile menu ===== */
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            const open = navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active', open);
            menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        document.addEventListener('click', function (e) {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        navMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ===== Active nav link on scroll ===== */
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            navLinks.forEach(function (link) {
                link.classList.toggle('active', link.getAttribute('href') === '#' + id && !link.classList.contains('nav-cta'));
            });
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (s) { sectionObserver.observe(s); });

    /* ===== Reveal on scroll ===== */
    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });

    /* ===== Stats counter ===== */
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateStat(stat) {
        const target = parseFloat(stat.getAttribute('data-count'));
        const decimals = String(target).includes('.') ? 1 : 0;
        const duration = 1800;
        const start = performance.now();

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            stat.textContent = (target * eased).toFixed(decimals);
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    const statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateStat(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(function (s) { statsObserver.observe(s); });

    /* ===== Project filtering ===== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterButtons.forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');

            projectCards.forEach(function (card) {
                const categories = (card.getAttribute('data-category') || '').split(' ');
                const show = filter === 'all' || categories.indexOf(filter) !== -1;
                card.classList.toggle('filtered-out', !show);
            });
        });
    });

    /* ===== Project details panel ===== */
    document.querySelectorAll('.project-card').forEach(function (card) {
        const openBtn = card.querySelector('.project-more');
        const closeBtn = card.querySelector('.details-close');

        if (openBtn) {
            openBtn.addEventListener('click', function () {
                // Close any other open card first
                document.querySelectorAll('.project-card.details-open').forEach(function (c) {
                    if (c !== card) c.classList.remove('details-open');
                });
                card.classList.add('details-open');
            });
        }
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                card.classList.remove('details-open');
            });
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.project-card.details-open').forEach(function (c) {
                c.classList.remove('details-open');
            });
        }
    });

    /* ===== Smooth scrolling for in-page anchors ===== */
    const smoothOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: smoothOK ? 'smooth' : 'auto' });
            history.replaceState(null, '', id);
        });
    });

    /* ===== Scroll to top ===== */
    const scrollTopBtn = document.querySelector('.scroll-top-btn');

    if (scrollTopBtn) {
        let ticking = false;
        window.addEventListener('scroll', function () {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(function () {
                scrollTopBtn.classList.toggle('visible', window.scrollY > 600);
                ticking = false;
            });
        }, { passive: true });

        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}());
