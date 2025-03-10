/**
 * Khant Phyo Wai Portfolio - Enhanced JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===== DOM Elements =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    const themeSwitch = document.querySelector('.theme-switch');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section');
    const animatedElements = document.querySelectorAll('.animate');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const contactForm = document.querySelector('.contact-form');
    const typedTextElement = document.getElementById('typed-text');
    const skillBars = document.querySelectorAll('.skill-progress');
    const statNumbers = document.querySelectorAll('.stat-number');
    const languageToggle = document.querySelector('.language-toggle');
    
    // ===== Mobile Menu =====
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking elsewhere or on menu items
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && 
                !navMenu.contains(e.target) && 
                navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // ===== Language Toggle =====
    if (languageToggle) {
        const dropdownTrigger = languageToggle.querySelector('.dropdown');
        const langOptions = languageToggle.querySelectorAll('.dropdown-content a');
        
        // Click handler to toggle dropdown
        dropdownTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            languageToggle.classList.toggle('active');
        });
        
        // Close dropdown when clicking elsewhere
        document.addEventListener('click', function(e) {
            if (!languageToggle.contains(e.target)) {
                languageToggle.classList.remove('active');
            }
        });
        
        // Handle language selection
        langOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const lang = this.getAttribute('data-lang');
                
                // Update display
                const currentLangEl = languageToggle.querySelector('.current-lang');
                if (currentLangEl) {
                    currentLangEl.textContent = lang.toUpperCase();
                }
                
                // Save preference
                localStorage.setItem('preferredLanguage', lang);
                
                // Apply translations
                applyTranslations(lang);
                
                // Show notification
                showLanguageNotification(lang);
                
                // Close dropdown
                languageToggle.classList.remove('active');
            });
        });
        
        // Initialize with saved preference
        const savedLang = localStorage.getItem('preferredLanguage') || 'en';
        const currentLangEl = languageToggle.querySelector('.current-lang');
        if (currentLangEl) {
            currentLangEl.textContent = savedLang.toUpperCase();
        }
        
        // Apply saved language on page load
        if (savedLang !== 'en') {
            applyTranslations(savedLang);
        }
    }
    
    // ===== Project Hover Details =====
    const isTouchDevice = 'ontouchstart' in window || 
                         navigator.maxTouchPoints > 0 || 
                         navigator.msMaxTouchPoints > 0;
    
    projectCards.forEach(card => {
        // Enable hover effects after a short delay
        setTimeout(() => {
            card.classList.add('hover-enabled');
        }, 300);
        
        // For touch devices, use click instead of hover
        if (isTouchDevice) {
            card.addEventListener('click', function(e) {
                // Don't trigger if clicking on a link
                if (e.target.closest('a')) return;
                
                // Toggle details visibility
                this.classList.toggle('details-visible');
            });
            
            // Add back button functionality
            const backButton = card.querySelector('.back-to-project');
            if (backButton) {
                backButton.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent card click event
                    card.classList.remove('details-visible');
                });
            }
        }
    });
    
    // ===== Create Background Particles =====
    function createParticles() {
        const particlesContainer = document.getElementById('particles-js');
        if (!particlesContainer) return;
        
        // Clear any existing particles
        particlesContainer.innerHTML = '';
        
        // Colors for particles
        const colors = [
            'rgba(44, 122, 123, 0.4)',  // primary
            'rgba(64, 145, 108, 0.4)',  // secondary
            'rgba(245, 158, 11, 0.3)'   // accent
        ];
        
        // Create particles (fewer for mobile)
        const particleCount = window.innerWidth < 768 ? 15 : 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size between 5px and 20px
            const size = 5 + Math.random() * 15;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            
            // Random color
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Add to container
            particlesContainer.appendChild(particle);
            
            // Animate the particle
            animateParticle(particle);
        }
    }
    
    function animateParticle(particle) {
        const duration = 15 + Math.random() * 30; // between 15 and 45 seconds
        const xMove = -20 + Math.random() * 40; // between -20px and 20px
        const yMove = -20 + Math.random() * 40; // between -20px and 20px
        
        // Initial position
        const startTop = parseFloat(particle.style.top);
        const startLeft = parseFloat(particle.style.left);
        
        // Start time
        const startTime = Date.now();
        
        function updatePosition() {
            const elapsedTime = (Date.now() - startTime) / 1000; // seconds
            const progress = (elapsedTime % duration) / duration;
            
            // Use sine functions for smooth movement
            const xOffset = Math.sin(progress * Math.PI * 2) * xMove;
            const yOffset = Math.sin(progress * Math.PI * 2 + Math.PI/2) * yMove;
            
            // Apply new position
            particle.style.top = `${startTop + yOffset}%`;
            particle.style.left = `${startLeft + xOffset}%`;
            
            // Subtle size pulsing
            const sizeChange = Math.sin(progress * Math.PI * 4) * 0.1 + 1; // between 0.9 and 1.1
            particle.style.transform = `scale(${sizeChange})`;
            
            // Continue animation
            requestAnimationFrame(updatePosition);
        }
        
        // Start the animation
        updatePosition();
    }
    
    // Initialize particles
    createParticles();
    
    // Recreate particles on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(createParticles, 300);
    });
    
    // ===== Parallax Background Elements =====
    function addParallaxEffect() {
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const circles = document.querySelectorAll('.bg-circle');
            const shapes = document.querySelectorAll('.bg-shape');
            
            circles.forEach((circle, index) => {
                const depth = 0.05 + (index * 0.02);
                const translateX = (mouseX - 0.5) * depth * 100;
                const translateY = (mouseY - 0.5) * depth * 100;
                
                circle.style.transform = `translate(${translateX}px, ${translateY}px)`;
            });
            
            shapes.forEach((shape, index) => {
                const depth = 0.03 + (index * 0.01);
                const translateX = (mouseX - 0.5) * depth * 100;
                const translateY = (mouseY - 0.5) * depth * 100;
                const rotation = index === 0 ? 45 : 0;
                
                shape.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotation}deg)`;
            });
        });
    }
    
    // Add parallax effect to background elements
    addParallaxEffect();
    
    // ===== Navbar Scroll Effect =====
    window.addEventListener('scroll', function() {
        // Update navbar style
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            // Handle both same-page and cross-page links
            if (href === `#${current}` || href.endsWith(`#${current}`)) {
                link.classList.add('active');
            }
        });
        
        // Animate elements in viewport
        animateOnScroll();
        
        // Animate stats counters
        animateStats();
        
        // Animate skill bars
        animateSkillBars();
    });
    
    // ===== Dark Mode Toggle =====
    if (themeSwitch) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeSwitch.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Toggle icon between moon and sun
            if (document.body.classList.contains('dark-mode')) {
                this.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                this.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // ===== Typewriter Effect =====
    function typeWriter() {
        const roles = [
            "Business Strategist",
            "AI Engineer", 
            "Certified Jack of All Trades",
            "Educator"
        ];
        
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100; // Base type speed
        
        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                // Deleting text
                typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; // Faster when deleting
            } else {
                // Typing text
                typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100; // Normal speed when typing
            }
            
            // Handle deleting and switching to next role
            if (!isDeleting && charIndex === currentRole.length) {
                // Pause at end of typing
                typeSpeed = 1500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next role when deleted
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before typing new role
            }
            
            setTimeout(type, typeSpeed);
        }
        
        // Start typing if element exists
        if (typedTextElement) {
            setTimeout(type, 1000);
        }
    }
    
    // Start typewriter effect
    typeWriter();
    
    // ===== Animate on Scroll =====
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    function animateOnScroll() {
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check for elements in viewport
    animateOnScroll();
    
    // ===== Animate Stats Counter =====
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        const statsSection = document.querySelector('.stats-grid');
        if (!statsSection || !isInViewport(statsSection)) return;
        
        statsAnimated = true;
        
        statNumbers.forEach(stat => {
            const targetNum = parseFloat(stat.dataset.count);
            const decimalPlaces = String(targetNum).includes('.') ? 1 : 0;
            let currentNum = 0;
            const increment = targetNum / 40; // Divide by steps
            const duration = 1500; // ms
            const stepTime = duration / 40;
            
            const counter = setInterval(() => {
                currentNum += increment;
                
                if (currentNum >= targetNum) {
                    currentNum = targetNum;
                    clearInterval(counter);
                }
                
                // Format the number with appropriate decimal places
                stat.textContent = currentNum.toFixed(decimalPlaces);
            }, stepTime);
        });
    }
    
    // ===== Animate Skill Bars =====
    let skillsAnimated = false;
    
    function animateSkillBars() {
        if (skillsAnimated) return;
        
        const expertiseSection = document.querySelector('.expertise');
        if (!expertiseSection || !isInViewport(expertiseSection)) return;
        
        skillsAnimated = true;
        
        skillBars.forEach(bar => {
            const width = bar.dataset.width;
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }
    
    // ===== Project Filtering =====
    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        const categories = card.getAttribute('data-category').split(' ');
                        if (categories.includes(filter)) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 100);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
    }
    
    // ===== Form Interaction Effects =====
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                
                // Add 'filled' class if input has value
                if (this.value.trim() !== '') {
                    this.parentElement.classList.add('filled');
                } else {
                    this.parentElement.classList.remove('filled');
                }
            });
        });
        
        // Form submission handling
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            formInputs.forEach(input => {
                if (input.hasAttribute('required') && input.value.trim() === '') {
                    isValid = false;
                    input.parentElement.classList.add('error');
                } else {
                    input.parentElement.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Show success message (in real implementation, you'd send data to server)
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.textContent = 'Your message has been sent. I will get back to you soon!';
                
                this.appendChild(successMessage);
                this.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    // ===== Smooth Scrolling for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== Translation System =====
    function applyTranslations(lang) {
        const translations = {
            'en': {
                'nav.home': 'Home',
                'nav.about': 'About',
                'nav.expertise': 'Expertise',
                'nav.projects': 'Projects',
                'nav.certificates': 'Certificates',
                'nav.experience': 'Experience',
                'nav.contact': 'Contact',
                'hero.name': 'Khant Phyo Wai',
                'hero.tagline': 'Bringing innovative solutions at the intersection of technology, business, and creative design',
                'hero.projects': 'View Projects',
                'hero.contact': 'Contact Me',
                'about.title': 'About Me',
                'expertise.title': 'My Expertise',
                'projects.title': 'Featured Projects',
                'certificates.title': 'Certificates & Achievements',
                'experience.title': 'Work Experience',
                'contact.title': 'Get In Touch',
                'contact.form.submit': 'Send Message'
                // Add more as needed
            },
            'my': {
                'nav.home': 'ပင်မစာမျက်နှာ',
                'nav.about': 'ကျွန်ုပ်အကြောင်း',
                'nav.expertise': 'ကျွမ်းကျင်မှု',
                'nav.projects': 'စီမံကိန်းများ',
                'nav.certificates': 'အောင်လက်မှတ်များ',
                'nav.experience': 'အတွေ့အကြုံ',
                'nav.contact': 'ဆက်သွယ်ရန်',
                'hero.name': 'ခန့်ဖြိုးဝေ',
                'hero.tagline': 'နည်းပညာ၊ စီးပွားရေးနှင့် ဖန်တီးမှုဒီဇိုင်းတို့၏ ပေါင်းစည်းမှုမှ ဆန်းသစ်သောဖြေရှင်းချက်များကိုဖန်တီးပေးခြင်း',
                'hero.projects': 'စီမံကိန်းများကြည့်ရန်',
                'hero.contact': 'ဆက်သွယ်ရန်',
                'about.title': 'ကျွန်ုပ်အကြောင်း',
                'expertise.title': 'ကျွမ်းကျင်မှုများ',
                'projects.title': 'အဓိကစီမံကိန်းများ',
                'certificates.title': 'အောင်လက်မှတ်များနှင့် အောင်မြင်မှုများ',
                'experience.title': 'လုပ်ငန်းအတွေ့အကြုံ',
                'contact.title': 'ဆက်သွယ်ပါ',
                'contact.form.submit': 'မက်ဆေ့ချ်ပို့ရန်'
                // Add more as needed
            },
            'th': {
                'nav.home': 'หน้าแรก',
                'nav.about': 'เกี่ยวกับ',
                'nav.expertise': 'ความเชี่ยวชาญ',
                'nav.projects': 'โปรเจกต์',
                'nav.certificates': 'ประกาศนียบัตร',
                'nav.experience': 'ประสบการณ์',
                'nav.contact': 'ติดต่อ',
                'hero.name': 'คันท์ พโย ไว',
                'hero.tagline': 'นำเสนอโซลูชั่นนวัตกรรมที่จุดตัดของเทคโนโลยี ธุรกิจ และการออกแบบเชิงสร้างสรรค์',
                'hero.projects': 'ดูโปรเจกต์',
                'hero.contact': 'ติดต่อฉัน',
                'about.title': 'เกี่ยวกับฉัน',
                'expertise.title': 'ความเชี่ยวชาญของฉัน',
                'projects.title': 'โปรเจกต์เด่น',
                'certificates.title': 'ประกาศนียบัตรและความสำเร็จ',
                'experience.title': 'ประสบการณ์การทำงาน',
                'contact.title': 'ติดต่อ',
                'contact.form.submit': 'ส่งข้อความ'
                // Add more as needed
            }
        };
        
        // Get translation set for the selected language (or fall back to English)
        const translationSet = translations[lang] || translations['en'];
        
        // Apply translations to all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translationSet[key]) {
                element.textContent = translationSet[key];
            }
        });
        
        // Apply translations to all elements with data-i18n-placeholder attribute (for form inputs)
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translationSet[key]) {
                element.setAttribute('placeholder', translationSet[key]);
            }
        });
    }
    
    // Language notification helper
    function showLanguageNotification(lang) {
        const langNames = {
            'en': 'English',
            'my': 'Burmese',
            'th': 'Thai'
        };
        
        // Remove any existing notifications
        const existingNotifications = document.querySelectorAll('.language-notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'language-notification';
        notification.textContent = `Language changed to ${langNames[lang] || lang}`;
        document.body.appendChild(notification);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 2500);
    }
    
    // Trigger initial animations
    setTimeout(function() {
        window.dispatchEvent(new Event('scroll'));
    }, 500);
});
