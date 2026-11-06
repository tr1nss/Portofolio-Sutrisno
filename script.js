// ========================================
// SCROLL TO TOP BUTTON FUNCTIONALITY
// ========================================
const scrollTopBtn = document.getElementById('scrollTopBtn');

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Smooth scroll to top when button is clicked
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// SMOOTH SCROLL FOR INTERNAL LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// CARD ANIMATION ON SCROLL
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ========================================
// SKILL ITEMS INTERACTIVE EFFECT
// ========================================
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(2deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ========================================
// CONTACT INFO COPY TO CLIPBOARD
// ========================================
const contactItems = document.querySelectorAll('.contact-info div');

contactItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.setAttribute('title', 'Click to copy');
    
    item.addEventListener('click', function() {
        const text = this.querySelector('span').textContent;
        
        // Copy to clipboard
        navigator.clipboard.writeText(text).then(() => {
            // Show feedback
            const originalText = this.innerHTML;
            this.innerHTML = '✓ Copied!';
            this.style.color = '#4CAF50';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    });
});

// ========================================
// TYPING EFFECT FOR HEADER TITLE (Optional)
// ========================================
function typeWriter(element, text, speed = 100) {
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

// Uncomment below to enable typing effect on page load
// window.addEventListener('load', () => {
//     const h1 = document.querySelector('h1');
//     const originalText = h1.textContent;
//     typeWriter(h1, originalText, 150);
// });

// ========================================
// DYNAMIC YEAR IN FOOTER
// ========================================
window.addEventListener('load', () => {
    const currentYear = new Date().getFullYear();
    const footer = document.querySelector('footer p');
    footer.textContent = footer.textContent.replace('2024', currentYear);
});

// ========================================
// KEYBOARD NAVIGATION ACCESSIBILITY
// ========================================
document.addEventListener('keydown', (e) => {
    // Press 'T' to scroll to top
    if (e.key === 't' || e.key === 'T') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Press 'B' to scroll to bottom
    if (e.key === 'b' || e.key === 'B') {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
});

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%c👋 Welcome to Sutrisno Portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cDesigned with ❤️ and professionalism', 'color: #764ba2; font-size: 14px;');

// ========================================
// PERFORMANCE: LAZY LOADING OPTIMIZATION
// ========================================
if ('IntersectionObserver' in window) {
    const lazyElements = document.querySelectorAll('.card, .skill-item, .cert-item');
    
    const lazyLoad = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                lazyLoad.unobserve(entry.target);
            }
        });
    });
    
    lazyElements.forEach(el => lazyLoad.observe(el));
}

// ========================================
// PRINT FUNCTIONALITY
// ========================================
function printPortfolio() {
    window.print();
}

// Add print button if needed (optional)
// You can add this button to HTML: <button onclick="printPortfolio()">Print Portfolio</button>
