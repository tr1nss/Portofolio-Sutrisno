// ========================================
// PORTFOLIO INTERACTIVE SCRIPT
// Sutrisno Portfolio - Main JavaScript File
// ========================================

(function() {
    'use strict';

    // ========================================
    // WAIT FOR DOM TO BE READY
    // ========================================
    document.addEventListener('DOMContentLoaded', function() {
        
        // Initialize all functions
        initScrollToTop();
        initSmoothScroll();
        initCardAnimations();
        initSkillEffects();
        initContactCopy();
        initKeyboardShortcuts();
        updateFooterYear();
        initLazyLoading();
        showWelcomeMessage();

    });

    // ========================================
    // SCROLL TO TOP BUTTON
    // ========================================
    function initScrollToTop() {
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        
        if (!scrollTopBtn) return;

        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        // Smooth scroll to top when clicked
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // SMOOTH SCROLL FOR INTERNAL LINKS
    // ========================================
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        if (links.length === 0) return;

        links.forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ========================================
    // CARD ANIMATION ON SCROLL
    // ========================================
    function initCardAnimations() {
        const cards = document.querySelectorAll('.card');
        
        if (cards.length === 0) return;
        if (!('IntersectionObserver' in window)) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Set initial state and observe
        cards.forEach(function(card) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    // ========================================
    // SKILL ITEMS HOVER EFFECTS
    // ========================================
    function initSkillEffects() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        if (skillItems.length === 0) return;

        skillItems.forEach(function(item) {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05) rotate(2deg)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }

    // ========================================
    // CONTACT INFO - CLICK TO COPY
    // ========================================
    function initContactCopy() {
        const contactItems = document.querySelectorAll('.contact-info div');
        
        if (contactItems.length === 0) return;

        contactItems.forEach(function(item) {
            item.style.cursor = 'pointer';
            item.setAttribute('title', 'Click to copy');
            
            item.addEventListener('click', function() {
                const spanElement = this.querySelector('span');
                
                if (!spanElement) return;
                
                const text = spanElement.textContent;
                
                // Try to copy to clipboard
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text)
                        .then(function() {
                            showCopyFeedback(item);
                        })
                        .catch(function(err) {
                            console.log('Copy failed:', err);
                        });
                } else {
                    // Fallback for older browsers
                    fallbackCopy(text);
                    showCopyFeedback(item);
                }
            });
        });
    }

    // Show copy success feedback
    function showCopyFeedback(element) {
        const originalText = element.innerHTML;
        const originalColor = element.style.color;
        
        element.innerHTML = '✓ Copied!';
        element.style.color = '#4CAF50';
        
        setTimeout(function() {
            element.innerHTML = originalText;
            element.style.color = originalColor;
        }, 2000);
    }

    // Fallback copy method for older browsers
    function fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
        } catch (err) {
            console.log('Fallback copy failed:', err);
        }
        
        document.body.removeChild(textArea);
    }

    // ========================================
    // KEYBOARD SHORTCUTS
    // ========================================
    function initKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Press 'T' to scroll to top
            if (e.key === 't' || e.key === 'T') {
                if (!isInputFocused()) {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            }
            
            // Press 'B' to scroll to bottom
            if (e.key === 'b' || e.key === 'B') {
                if (!isInputFocused()) {
                    window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    // Check if input/textarea is focused
    function isInputFocused() {
        const activeElement = document.activeElement;
        return activeElement && (
            activeElement.tagName === 'INPUT' || 
            activeElement.tagName === 'TEXTAREA'
        );
    }

    // ========================================
    // UPDATE FOOTER YEAR DYNAMICALLY
    // ========================================
    function updateFooterYear() {
        const currentYear = new Date().getFullYear();
        const footerText = document.querySelector('footer p');
        
        if (footerText) {
            footerText.textContent = footerText.textContent.replace('2024', currentYear);
        }
    }

    // ========================================
    // LAZY LOADING OPTIMIZATION
    // ========================================
    function initLazyLoading() {
        if (!('IntersectionObserver' in window)) return;
        
        const lazyElements = document.querySelectorAll('.card, .skill-item, .cert-item');
        
        if (lazyElements.length === 0) return;

        const lazyObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    lazyObserver.unobserve(entry.target);
                }
            });
        });
        
        lazyElements.forEach(function(element) {
            lazyObserver.observe(element);
        });
    }

    // ========================================
    // WELCOME CONSOLE MESSAGE
    // ========================================
    function showWelcomeMessage() {
        if (typeof console !== 'undefined' && console.log) {
            console.log('%c👋 Welcome to Sutrisno Portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
            console.log('%cDesigned with ❤️ and professionalism', 'color: #764ba2; font-size: 14px;');
            console.log('%cKeyboard shortcuts: Press T (top) or B (bottom)', 'color: #888; font-size: 12px;');
        }
    }

    // ========================================
    // PRINT FUNCTION (Optional)
    // ========================================
    window.printPortfolio = function() {
        window.print();
    };

    // ========================================
    // TYPING EFFECT (Optional - Commented Out)
    // ========================================
    /*
    function typeWriter(element, text, speed) {
        speed = speed || 100;
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Uncomment to enable typing effect
    // const h1 = document.querySelector('h1');
    // if (h1) {
    //     const originalText = h1.textContent;
    //     typeWriter(h1, originalText, 150);
    // }
    */

})();

// ========================================
// END OF SCRIPT
// ========================================
