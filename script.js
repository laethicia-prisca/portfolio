// ========================================
// Portfolio JavaScript - Premium Edition
// Modern, Clean, and Efficient with Theme System
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Premium Theme System - Light/Dark Mode
    // ========================================
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', currentTheme);
    
    /**
     * Toggle between light and dark themes
     */
    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add transition class for smooth theme switching
        htmlElement.classList.add('theme-transitioning');
        
        // Update theme attribute
        htmlElement.setAttribute('data-theme', newTheme);
        
        // Save preference to localStorage
        localStorage.setItem('theme', newTheme);
        
        // Remove transition class after animation completes
        setTimeout(() => {
            htmlElement.classList.remove('theme-transitioning');
        }, 300);
        
        // Add ripple effect
        createThemeRipple(event);
    }
    
    /**
     * Create ripple effect on theme toggle
     */
    function createThemeRipple(event) {
        const ripple = document.createElement('div');
        ripple.className = 'theme-ripple';
        ripple.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
            animation: themeRipple 0.6s ease-out;
        `;
        
        document.body.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
        // Add theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // ========================================
    // Premium Loading Management
    // ========================================
    const loader = document.querySelector('.premium-loader');
    
    /**
     * Hide loader when page is fully loaded
     */
    function hideLoader() {
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }
    }
    
    // Hide loader when everything is loaded
    window.addEventListener('load', hideLoader);
    
    // Also hide loader after a minimum time for better UX
    setTimeout(hideLoader, 1000);
    
    // Add theme ripple animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes themeRipple {
            to {
                width: 200vw;
                height: 200vw;
                opacity: 0;
            }
        }
        
        .theme-transitioning * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
        }
    `;
    document.head.appendChild(style);
    
    // ========================================
    // Enhanced Navigation Bar Scroll Effect
    // ========================================
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    /**
     * Handle navbar background change on scroll with theme awareness
     */
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Initial check
    handleNavbarScroll();
    
    // Listen to scroll events with throttling for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleNavbarScroll();
                handleScrollAnimations();
                handleScrollTopButton();
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // ========================================
    // Enhanced Smooth Scrolling for Navigation Links
    // ========================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if link has a hash (internal link)
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                    
                    // Smooth scroll to section
                    const offsetTop = targetSection.offsetTop - 70; // 70px offset for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ========================================
    // Update Active Navigation Link on Scroll
    // ========================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100; // Offset for better detection
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section link
                const currentLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (currentLink) {
                    currentLink.classList.add('active');
                }
            }
        });
    }
    
    // ========================================
    // Scroll Animations (Fade In on Scroll)
    // ========================================
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-up');
    
    /**
     * Check if element is in viewport
     */
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return (
            rect.top <= windowHeight * 0.85 && // Element is 85% into viewport
            rect.bottom >= 0
        );
    }
    
    /**
     * Handle scroll animations
     */
    function handleScrollAnimations() {
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initial check for elements already in viewport
    handleScrollAnimations();
    
    // ========================================
    // Skills Progress Bar Animation
    // ========================================
    const skillBars = document.querySelectorAll('.progress-bar');
    let skillsAnimated = false;
    
    /**
     * Animate skill progress bars
     */
    function animateSkillBars() {
        if (skillsAnimated) return;
        
        const skillsSection = document.getElementById('about');
        if (skillsSection && isInViewport(skillsSection)) {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                
                // Animate width
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
            });
            
            skillsAnimated = true;
        }
    }
    
    // Listen for scroll to trigger skill bars animation
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Initial check
    
    // ========================================
    // Contact Form Handling
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Submit form to Formspree
            submitFormToFormspree(name, email, subject, message);
        });
    }
    
    /**
     * Validate email format
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /**
     * Show form message
     */
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
    
    /**
     * Handle form submission with mailto fallback
     */
    async function submitFormToFormspree(name, email, subject, message) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
        submitButton.disabled = true;
        
        try {
            // Create mailto link with form data
            const mailtoSubject = encodeURIComponent(`Contact Form: ${subject}`);
            const mailtoBody = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            );
            const mailtoLink = `mailto:?subject=${mailtoSubject}&body=${mailtoBody}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showFormMessage(
                `Thank you ${name}! Your email client should open with the message ready to send.`,
                'success'
            );
            
            // Reset form after a delay
            setTimeout(() => {
                contactForm.reset();
            }, 2000);
            
        } catch (error) {
            // Fallback error handling
            showFormMessage(
                'Please try again or use another contact method.',
                'error'
            );
        } finally {
            // Reset button state
            setTimeout(() => {
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }, 2000);
        }
    }
    
    // ========================================
    // Scroll to Top Button
    // ========================================
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    /**
     * Show/hide scroll to top button
     */
    function handleScrollTopButton() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }
    
    /**
     * Scroll to top when button is clicked
     */
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========================================
    // Project Cards Hover Effect Enhancement
    // ========================================
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add a subtle tilt effect on hover (optional enhancement)
            this.style.transform = 'translateY(-10px) rotateX(2deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // ========================================
    // Tech Stack Cards Interaction
    // ========================================
    const techCards = document.querySelectorAll('.tech-card');
    
    techCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add pulse animation to icon on hover
            const icon = this.querySelector('.tech-icon');
            if (icon) {
                icon.style.animation = 'pulse 0.5s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.tech-icon');
            if (icon) {
                icon.style.animation = '';
            }
        });
    });
    
    // ========================================
    // Dynamic Year in Footer (if needed)
    // ========================================
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-text');
    if (footerText) {
        footerText.innerHTML = footerText.innerHTML.replace('2026', currentYear);
    }
    
    // ========================================
    // Preloader (Optional Enhancement)
    // ========================================
    window.addEventListener('load', function() {
        // Hide preloader if exists
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }
        
        // Trigger initial animations
        document.body.classList.add('loaded');
    });
    
    // ========================================
    // Parallax Effect for Hero Section (Subtle)
    // ========================================
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const parallaxSpeed = 0.5;
            
            // Apply subtle parallax effect
            if (scrolled < window.innerHeight) {
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
    
    // ========================================
    // Keyboard Navigation Accessibility
    // ========================================
    document.addEventListener('keydown', function(e) {
        // Press Escape to close mobile menu
        if (e.key === 'Escape') {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
    
    // ========================================
    // Intersection Observer for Performance
    // (Alternative to scroll event for animations)
    // ========================================
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: stop observing after animation
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all animated elements
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // ========================================
    // Console Message (Easter Egg)
    // ========================================
    console.log('%c👋 Hello Developer! ', 'background: linear-gradient(135deg, #6366f1, #a855f7); color: white; font-size: 20px; padding: 10px 20px; border-radius: 10px;');
    console.log('%cThis portfolio was created with ❤️ and lots of coffee ☕', 'color: #a855f7; font-size: 14px;');
    console.log('%cIf you are interested in the source code, contact me!', 'color: #6366f1; font-size: 12px;');
    
    // ========================================
    // Performance Monitoring (Development Only)
    // ========================================
    if (window.performance) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
            }, 0);
        });
    }
    
}); // End of DOMContentLoaded

// ========================================
// External Link Handler (Open in new tab)
// ========================================
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        const href = e.target.getAttribute('href');
        // Open external links in new tab
        if (href && !href.startsWith('#') && !href.startsWith('/') && href !== '') {
            e.target.setAttribute('target', '_blank');
            e.target.setAttribute('rel', 'noopener noreferrer');
        }
    }
});

// ========================================
// Service Worker Registration (Optional - for PWA)
// ========================================
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registered: ', registration);
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}
*/

// ========================================
// Utility Functions
// ========================================

/**
 * Debounce function to limit function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for scroll events
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Get element offset from top of page
 */
function getOffset(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX
    };
}

// ========================================
// Pulse Animation for Tech Icons
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);