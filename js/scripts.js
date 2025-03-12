/**
 * Khant Phyo Wai Portfolio - Optimized JavaScript
 * Consolidated version with improved animations and performance
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===== DOM Elements =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    const themeSwitch = document.querySelector('.theme-switch');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const webProjectCards = document.querySelectorAll('.web-project-card');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const typedTextElement = document.getElementById('typed-text');
    const skillBars = document.querySelectorAll('.skill-progress');
    const statNumbers = document.querySelectorAll('.stat-number');
    const languageToggle = document.querySelector('.language-toggle');
    const buttons = document.querySelectorAll('.btn');
    
    // Create or get particles container
    let particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) {
        particlesContainer = document.createElement('div');
        particlesContainer.id = 'particles-js';
        document.body.insertBefore(particlesContainer, document.body.firstChild);
    }
    
    // ===== Utility Functions =====
    
    // Check if element is in viewport
    function isInViewport(element, offset = 0.8) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * offset
        );
    }
    
    // Add a debounce function to prevent excessive function calls
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Helper to check for touch devices
    const isTouchDevice = 'ontouchstart' in window || 
                         navigator.maxTouchPoints > 0 || 
                         navigator.msMaxTouchPoints > 0;
    
    // ===== Initialize EmailJS =====
    function initEmailJS() {
        // Replace with your own EmailJS user ID
        emailjs.init("your_emailjs_user_id");
    }
    
    // ===== Mobile Menu Toggle =====
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
        
        navLinks.forEach((link, index) => {
            // Add item index for staggered animation
            link.parentElement.style.setProperty('--item-index', index);
            
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
    
    projectCards.forEach(card => {
        // Enable hover effects after a short delay
        setTimeout(() => {
            card.classList.add('hover-enabled');
        }, 300);
        
        // For touch devices, use click instead of hover
        if (isTouchDevice) {
            card.addEventListener('click', function(e) {
                // Don't trigger if clicking on a link or button
                if (e.target.closest('a') || e.target.closest('button')) return;
                
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
    
    // Add similar hover effects to web project cards
    webProjectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });
    
    // ===== Enhanced Particle System =====
    
    // Add particle styles
    function addParticleStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #particles-js {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 0;
                pointer-events: none;
                overflow: hidden;
            }
            
            .particle {
                position: absolute;
                border-radius: 50%;
                transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
                will-change: transform, opacity;
                pointer-events: none;
                transform: translate(0, 0);
            }
            
            /* Add glow to larger particles */
            .particle[style*="width: 6"], 
            .particle[style*="width: 7"],
            .particle[style*="width: 8"],
            .particle[style*="width: 9"],
            .particle[style*="width: 10"],
            .particle[style*="width: 11"],
            .particle[style*="width: 12"] {
                box-shadow: 0 0 10px rgba(79, 209, 197, 0.5);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create particles
    function createParticles() {
        // Clear any existing particles
        particlesContainer.innerHTML = '';
        
        // Particle settings based on screen size - increase count for better distribution
        const particleCount = window.innerWidth < 768 ? 60 : 100;
        const particleColors = [
            'rgba(79, 209, 197, 0.7)',  // Teal
            'rgba(104, 211, 145, 0.7)',  // Green
            'rgba(251, 191, 36, 0.6)',   // Amber
            'rgba(96, 165, 250, 0.6)',   // Blue
            'rgba(167, 139, 250, 0.5)'   // Purple
        ];
        
        // Add CSS transition for smooth window resizing
        const transitionStyle = document.createElement('style');
        transitionStyle.textContent = `
            @media (prefers-reduced-motion: no-preference) {
                .particle {
                    transition: transform 0.3s ease-out;
                }
            }
        `;
        document.head.appendChild(transitionStyle);
        
        // Create particles - distribute in batches for better performance
        const batchSize = 20;
        let particlesCreated = 0;
        
        function createBatch() {
            const endIndex = Math.min(particlesCreated + batchSize, particleCount);
            
            for (let i = particlesCreated; i < endIndex; i++) {
                createParticle(particleColors);
            }
            
            particlesCreated = endIndex;
            
            if (particlesCreated < particleCount) {
                // Create next batch on next frame for better performance
                requestAnimationFrame(createBatch);
            }
        }
        
        // Start creating particles in batches
        createBatch();
    }
    
    // Create a single particle
    function createParticle(colors) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 1px and 10px
        const size = 1 + Math.random() * 9;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Calculate absolute positioning values for better distribution
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Ensure even distribution across entire viewport
        const posX = Math.floor(Math.random() * windowWidth);
        const posY = Math.floor(Math.random() * windowHeight);
        
        // Use absolute pixel values instead of percentages for more precise positioning
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        
        // Store original position for reference in animation
        particle.dataset.origX = posX;
        particle.dataset.origY = posY;
        
        // Random opacity
        particle.style.opacity = 0.1 + Math.random() * 0.5;
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        
        // Occasional non-circle shape for variety
        if (Math.random() > 0.9) {
            particle.style.borderRadius = `${30 + Math.random() * 40}%`;
        }
        
        // Add to container
        particlesContainer.appendChild(particle);
        
        // Animate the particle
        animateParticle(particle, size);
    }
    
    // Animate a single particle with smoother motion
    function animateParticle(particle, size) {
        // Get original position
        const origX = parseFloat(particle.dataset.origX);
        const origY = parseFloat(particle.dataset.origY);
        
        // Movement range proportional to size (smaller particles move more)
        // Reduced range to prevent large jumps
        const movementRange = 50 * (1 - size/10);
        
        // Create movement with positive and negative values
        const xMove = movementRange * (Math.random() > 0.5 ? 1 : -1) * Math.random();
        const yMove = movementRange * (Math.random() > 0.5 ? 1 : -1) * Math.random();
        
        // Longer duration for smoother animation
        const duration = 25 + size * 2;
        
        // Animation pattern choice (0-3)
        // Using only patterns that produce smoother movements
        const patternChoice = Math.floor(Math.random() * 2); // Limit to first 2 patterns which are smoother
        
        // Animation start time - using performance.now() for more accurate timing
        const startTime = performance.now();
        
        // Keep track of previous position to avoid jumps
        let prevX = 0;
        let prevY = 0;
        
        // Animation function with smoother transitions
        function move(timestamp) {
            const elapsedTime = (timestamp - startTime) / 1000; // seconds
            const progress = (elapsedTime % duration) / duration;
            
            // Use sine-based easing for smoother movement
            const easeValue = Math.sin(progress * Math.PI * 2);
            const smoothProgress = 0.5 + 0.5 * easeValue; // Normalize to 0-1
            
            let xOffset, yOffset;
            
            // Simplified movement patterns
            switch(patternChoice) {
                case 0: // Simple sine wave
                    xOffset = Math.sin(progress * Math.PI * 2) * xMove;
                    yOffset = Math.sin(progress * Math.PI * 2 + Math.PI/2) * yMove;
                    break;
                case 1: // Circular
                    xOffset = Math.sin(progress * Math.PI * 2) * xMove;
                    yOffset = Math.cos(progress * Math.PI * 2) * yMove;
                    break;
            }
            
            // Smooth transition between previous position and new position
            // to prevent any jumping effects
            if (Math.abs(xOffset - prevX) > movementRange/2) {
                xOffset = prevX + (xOffset > prevX ? 0.5 : -0.5);
            }
            if (Math.abs(yOffset - prevY) > movementRange/2) {
                yOffset = prevY + (yOffset > prevY ? 0.5 : -0.5);
            }
            
            // Store for next frame
            prevX = xOffset;
            prevY = yOffset;
            
            // Apply transform with precise values
            particle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            
            // Continue animation with next frame
            requestAnimationFrame(move);
        }
        
        // Start animation loop
        requestAnimationFrame(move);
    }
    
    // ===== Navbar Scroll Effect =====
    function handleScroll() {
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
        
        // Call other scroll-based animations
        checkElementsInViewport();
    }
    
    // ===== Scroll-Based Animations =====
    function checkElementsInViewport() {
        // Check skill bars
        const skillBarsContainer = document.querySelector('.expertise-skills');
        if (skillBarsContainer && isInViewport(skillBarsContainer)) {
            animateSkillBars();
        }
        
        // Check stats section
        const statsSection = document.querySelector('.stats-grid');
        if (statsSection && isInViewport(statsSection)) {
            animateStats();
        }
        
        // Call the original animations functions from the original code
        enhanceSectionTransitions();
        initFadeInAnimations();
        
        // Call intersection animations (preserved from original code)
        handleIntersectionAnimations();
    }
    
    // Enhanced section transitions
    function enhanceSectionTransitions() {
        const sections = document.querySelectorAll('section:not(.section-visible)');
        sections.forEach(section => {
            if (isInViewport(section, 0.15)) {
                section.classList.add('section-visible');
                
                // Animate children with staggered delay
                const elements = section.querySelectorAll('.animate-stagger');
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, 100 * index);
                });
            }
        });
    }
    
    // Fade-in animations
    function initFadeInAnimations() {
        // Select all elements to animate
        const elementsToAnimate = document.querySelectorAll(
            '.animate:not(.active), .fade-in-element:not(.animated)'
        );
        
        elementsToAnimate.forEach(element => {
            if (isInViewport(element, 0.1)) {
                if (element.classList.contains('animate')) {
                    element.classList.add('active');
                } else {
                    element.classList.add('animated');
                }
            }
        });
    }
    
    // ===== Animate Stats Counter - Improved Version =====
    function animateStats() {
        statNumbers.forEach(stat => {
            // Skip if already animated
            if (stat.classList.contains('counted')) return;
            
            const targetNum = parseFloat(stat.getAttribute('data-count') || stat.dataset.count);
            const decimalPlaces = String(targetNum).includes('.') ? 1 : 0;
            
            // Animation using requestAnimationFrame for smoothness
            const duration = 2000;
            const startTime = performance.now();
            
            function updateNumber(currentTime) {
                // Calculate elapsed time
                const elapsedTime = currentTime - startTime;
                
                if (elapsedTime >= duration) {
                    // Animation complete
                    stat.textContent = targetNum.toFixed(decimalPlaces);
                    stat.classList.add('counted');
                    return;
                }
                
                // Smooth easing function
                const progress = elapsedTime / duration;
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                
                // Calculate current value
                const currentValue = targetNum * easedProgress;
                
                // Update the element
                stat.textContent = currentValue.toFixed(decimalPlaces);
                
                // Continue animation
                requestAnimationFrame(updateNumber);
            }
            
            // Start animation
            requestAnimationFrame(updateNumber);
        });
    }
    
    // ===== Animate Skill Bars =====
    function animateSkillBars() {
        const skillBarsContainer = document.querySelector('.expertise-skills');
        if (!skillBarsContainer) return;
        
        if (!isInViewport(skillBarsContainer)) return;
        
        skillBars.forEach(bar => {
            // Skip if already animated
            if (bar.classList.contains('animated')) return;
            
            const width = bar.getAttribute('data-width') || bar.dataset.width;
            setTimeout(() => {
                bar.style.width = width;
                bar.classList.add('animated');
            }, 300);
        });
    }
    
    // ===== Enhanced Button Effects =====
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            if (isTouchDevice) return; // Skip effect on touch devices
            
            const btnRect = this.getBoundingClientRect();
            const mouseX = e.clientX - btnRect.left;
            const mouseY = e.clientY - btnRect.top;
            
            this.style.setProperty('--mouse-x', `${mouseX}px`);
            this.style.setProperty('--mouse-y', `${mouseY}px`);
            
            this.classList.add('btn-hover');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('btn-hover');
        });
    });
    
    // ===== Enhanced Image Loading =====
    function enhanceImageLoading() {
        const images = document.querySelectorAll('img:not(.loaded)');
        
        images.forEach(img => {
            // Skip already processed images
            if (img.classList.contains('loading-handled')) return;
            img.classList.add('loading-handled');
            
            // Create a wrapper if needed
            let wrapper = img.parentNode;
            if (!wrapper.classList.contains('img-loading-wrapper')) {
                wrapper = document.createElement('div');
                wrapper.className = 'img-loading-wrapper';
                img.parentNode.insertBefore(wrapper, img);
                wrapper.appendChild(img);
            }
            
            // Add placeholder overlay
            const placeholder = document.createElement('div');
            placeholder.className = 'img-placeholder';
            wrapper.insertBefore(placeholder, img);
            
            // When image loads, fade out placeholder
            img.addEventListener('load', function() {
                img.classList.add('loaded');
                placeholder.classList.add('img-placeholder-hidden');
                
                // Remove placeholder after animation
                setTimeout(() => {
                    if (placeholder.parentNode) {
                        placeholder.parentNode.removeChild(placeholder);
                    }
                }, 500);
            });
            
            // If image is already loaded, trigger event
            if (img.complete) {
                img.dispatchEvent(new Event('load'));
            }
        });
    }
    
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
            "Web Developer",
            "Educator",
            "Certified Jack of All Trades"
        ];
        
        if (!typedTextElement) return;
        
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
        
        // Start typing
        setTimeout(type, 1000);
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
    
    // ===== Contact Form Submission =====
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        // Form field focus effects
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
        
        // Form submission handling with EmailJS
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
                // Prepare form data for EmailJS
                const templateParams = {
                    to_email: "kelvinwai.khantphyo@gmail.com", // Your email address
                    name: this.querySelector('#name').value,
                    email: this.querySelector('#email').value,
                    subject: this.querySelector('#subject').value,
                    message: this.querySelector('#message').value
                };
                
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Send the email using EmailJS
                emailjs.send('service_id', 'template_id', templateParams)
                    .then(function() {
                        // Show success message
                        formStatus.textContent = 'Your message has been sent successfully. I will get back to you soon!';
                        formStatus.className = 'success';
                        formStatus.style.display = 'block';
                        
                        // Reset form
                        contactForm.reset();
                        
                        // Remove success message after 5 seconds
                        setTimeout(() => {
                            formStatus.style.display = 'none';
                        }, 5000);
                    }, function(error) {
                        // Show error message
                        formStatus.textContent = 'There was an error sending your message. Please try again later.';
                        formStatus.className = 'error';
                        formStatus.style.display = 'block';
                        
                        console.error('EmailJS error:', error);
                    })
                    .finally(() => {
                        // Reset button state
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    });
            }
        });
    }
    
    // ===== Smooth Scrolling for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
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
                'nav.portfolio': 'Web Portfolio',
                'nav.webprojects': 'Web Projects',
                'nav.projects': 'Projects',
                'nav.certificates': 'Certificates',
                'nav.experience': 'Experience',
                'nav.contact': 'Contact',
                'hero.tagline': 'Bringing innovative solutions at the intersection of technology, business, and creative design',
                'hero.projects': 'View Projects',
                'hero.contact': 'Contact Me',
                'about.title': 'About Me',
                'about.paragraph1': 'I am a passionate business strategist and AI engineer with experience in market research, financial analysis, copywriting, and game development. With a strong foundation in AI and Computer Engineering from CMKL University, I specialize in creating meaningful solutions that bridge technical capabilities with business objectives.',
                'about.paragraph2': 'My journey began at Yangon Technological University, but when disrupted by circumstances, I persevered and earned a scholarship at CMKL University. Now I work on projects spanning AI, business strategy, and interactive technologies.',
                'expertise.title': 'My Expertise',
                'expertise.web.title': 'Web Development',
                'expertise.web.summary': 'Building functional and visually appealing websites and web applications that effectively serve business and user needs.',
                'expertise.ai.title': 'AI & Data Science',
                'expertise.ai.summary': 'Leveraging advanced algorithms and data analysis to create intelligent solutions for complex problems.',
                'expertise.business.title': 'Business Strategy',
                'expertise.business.summary': 'Developing comprehensive business plans and market analyses to drive sustainable growth and innovation.',
                'expertise.creative.title': 'Creative & Design',
                'expertise.creative.summary': 'Creating engaging content and immersive user experiences through thoughtful design and compelling storytelling.',
                'expertise.education.title': 'Education & Teaching',
                'expertise.education.summary': 'Developing student potential through personalized instruction and curriculum development in various subjects and educational systems.',
                'projects.title': 'Featured Projects',
                'certificates.title': 'Certificates & Achievements',
                'experience.title': 'Work Experience',
                'contact.title': 'Get In Touch',
                'contact.location.title': 'Location',
                'contact.location.value': 'Lat Krabang, Bangkok, Thailand',
                'contact.email.title': 'Email',
                'contact.phone.title': 'Phone',
                'contact.form.name': 'Your Name',
                'contact.form.email': 'Your Email',
                'contact.form.subject': 'Subject',
                'contact.form.message': 'Your Message',
                'contact.form.submit': 'Send Message'
            },
            'my': {
                'nav.home': 'ပင်မစာမျက်နှာ',
                'nav.about': 'ကျွန်ုပ်အကြောင်း',
                'nav.expertise': 'ကျွမ်းကျင်မှု',
                'nav.webprojects': 'ဝဘ်ဆိုက်များ',
                'nav.projects': 'စီမံကိန်းများ',
                'nav.certificates': 'အောင်လက်မှတ်များ',
                'nav.experience': 'အတွေ့အကြုံ',
                'nav.contact': 'ဆက်သွယ်ရန်',
                'hero.tagline': 'နည်းပညာ၊ စီးပွားရေးနှင့် ဖန်တီးမှုဒီဇိုင်းတို့၏ ပေါင်းစည်းမှုမှ ဆန်းသစ်သောဖြေရှင်းချက်များကိုဖန်တီးပေးခြင်း',
                'hero.projects': 'စီမံကိန်းများကြည့်ရန်',
                'hero.contact': 'ဆက်သွယ်ရန်',
                // Add more translations as needed
            },
            'th': {
                'nav.home': 'หน้าแรก',
                'nav.about': 'เกี่ยวกับ',
                'nav.expertise': 'ความเชี่ยวชาญ',
                'nav.webprojects': 'เว็บไซต์',
                'nav.projects': 'โปรเจกต์',
                'nav.certificates': 'ประกาศนียบัตร',
                'nav.experience': 'ประสบการณ์',
                'nav.contact': 'ติดต่อ',
                'hero.tagline': 'นำเสนอโซลูชั่นนวัตกรรมที่จุดตัดของเทคโนโลยี ธุรกิจ และการออกแบบเชิงสร้างสรรค์',
                'hero.projects': 'ดูโปรเจกต์',
                'hero.contact': 'ติดต่อฉัน',
                // Add more translations as needed
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
    
    // Show language notification helper
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
    
    // ===== Add Scroll To Top Button =====
    function addScrollToTopButton() {
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-top-btn';
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollTopBtn.title = 'Scroll to top';
        document.body.appendChild(scrollTopBtn);
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .scroll-top-btn {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: var(--primary);
                color: white;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.3s ease, transform 0.3s ease, background-color 0.3s ease;
                z-index: 99;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            }
            
            .scroll-top-btn.visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            .scroll-top-btn:hover {
                background-color: var(--secondary);
                transform: translateY(-3px);
            }
            
            .dark-mode .scroll-top-btn {
                background-color: var(--primary-light);
            }
            
            .dark-mode .scroll-top-btn:hover {
                background-color: var(--secondary-light);
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===== Check for reduced motion preference =====
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
    }
    
    // ===== Intersection Observer Animations =====
    function handleIntersectionAnimations() {
        // Enhanced section transitions
        const enhanceSectionTransitions = () => {
            const sections = document.querySelectorAll('section');
            
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.15
            };
            
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section-visible');
                        
                        // Animate children with staggered delay
                        const elements = entry.target.querySelectorAll('.animate-stagger');
                        elements.forEach((el, index) => {
                            setTimeout(() => {
                                el.classList.add('visible');
                            }, 100 * index);
                        });
                        
                        // Unobserve after animation
                        sectionObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            sections.forEach(section => {
                if (!section.classList.contains('section-transition')) {
                    section.classList.add('section-transition');
                    sectionObserver.observe(section);
                }
            });
        };
        
        // Enhanced fade-in animations
        const initFadeInAnimations = () => {
            // Select all elements to animate
            const elementsToAnimate = document.querySelectorAll(
                '.animate:not(.active), .fade-in-element:not(.animated)'
            );
            
            const fadeInOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
            
            const fadeInObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (entry.target.classList.contains('animate')) {
                            entry.target.classList.add('active');
                        } else {
                            entry.target.classList.add('animated');
                        }
                        fadeInObserver.unobserve(entry.target);
                    }
                });
            }, fadeInOptions);
            
            elementsToAnimate.forEach(element => {
                fadeInObserver.observe(element);
            });
        };
        
        // Execute animations
        enhanceSectionTransitions();
        initFadeInAnimations();
        
        // Also check for stats and skill bars
        animateStats();
        animateSkillBars();
    }

    // ===== Initialize =====
    function init() {
        // Add particle styles
        addParticleStyles();
        
        // Create particles
        createParticles();
        
        // Initialize EmailJS
        if (typeof emailjs !== 'undefined') {
            initEmailJS();
        }
        
        // Enhance image loading
        enhanceImageLoading();
        
        // Start typewriter effect
        typeWriter();
        
        // Add scroll to top button
        addScrollToTopButton();
        
        // Apply saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeSwitch) themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // Trigger initial animations - force execution of handleScroll to make elements visible on load
        handleScroll();
        handleIntersectionAnimations();
        
        // Make sure all visible elements get animated on initial load
        // This ensures elements are visible without needing to scroll first
        document.querySelectorAll('section:not(.section-visible)').forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('section-visible');
                
                // Also animate children
                const staggerElements = section.querySelectorAll('.animate-stagger');
                staggerElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, 100 * index);
                });
            }
        });
        
        // Force animation of elements that should be visible on load
        const visibleElements = document.querySelectorAll('.animate:not(.active), .fade-in-element:not(.animated)');
        visibleElements.forEach(element => {
            if (isInViewport(element)) {
                if (element.classList.contains('animate')) {
                    element.classList.add('active');
                } else {
                    element.classList.add('animated');
                }
            }
        });
    }
    
    // Run initialization
    init();
    
    // Add scroll event listener with debounce for better performance
    window.addEventListener('scroll', debounce(handleScroll, 10));
    
    // Recreate particles on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(createParticles, 300);
    });
});