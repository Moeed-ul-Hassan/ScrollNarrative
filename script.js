// DOM Elements
const floatingHeartsContainer = document.getElementById('floating-hearts');
const noButton = document.getElementById('no-btn');
const yesButton = document.getElementById('yes-btn');
const successMessage = document.getElementById('success-message');
const celebrationHeartsContainer = document.getElementById('celebration-hearts');
const buttonsContainer = document.querySelector('.buttons-container');

// Initialize Feather Icons
feather.replace();

// Smooth Scrolling for Internal Links
document.addEventListener('DOMContentLoaded', function() {
    // Create floating hearts on page load
    createFloatingHearts();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize dodging button
    initDodgingButton();
    
    // Initialize yes button
    initYesButton();
    
    // Add cute interaction effects
    addCuteInteractionEffects();
    
    // Add Amna name interaction
    initAmnaNameInteraction();
});

// Create Enhanced Floating Hearts Background Effect
function createFloatingHearts() {
    const heartsCount = 20;
    const heartEmojis = ['💕', '💖', '💗', '💝', '💘', '💞', '💓', '🤍', '💙', '💜'];
    
    for (let i = 0; i < heartsCount; i++) {
        setTimeout(() => {
            createFloatingHeart(heartEmojis[Math.floor(Math.random() * heartEmojis.length)]);
        }, i * 800); // Faster stagger
    }
    
    // Continue creating hearts more frequently
    setInterval(() => {
        createFloatingHeart(heartEmojis[Math.floor(Math.random() * heartEmojis.length)]);
    }, 2000);
}

function createFloatingHeart(emoji = '💖') {
    const heart = document.createElement('div');
    heart.innerHTML = emoji;
    heart.className = 'floating-heart';
    
    // Enhanced romantic positioning and effects
    const startX = Math.random() * 100;
    const endX = startX + (Math.random() - 0.5) * 30; // Slight drift
    
    heart.style.left = startX + '%';
    heart.style.fontSize = (Math.random() * 15 + 18) + 'px';
    heart.style.animationDuration = (Math.random() * 8 + 12) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heart.style.filter = `blur(${Math.random() * 0.5}px) brightness(${0.8 + Math.random() * 0.4})`;
    
    // Add subtle rotation
    heart.style.setProperty('--end-x', endX + '%');
    heart.style.setProperty('--rotation', (Math.random() - 0.5) * 30 + 'deg');
    
    floatingHeartsContainer.appendChild(heart);
    
    // Performance: Remove heart after animation completes
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 15000);
}

// Scroll Animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('visible');
                }, delay);
                
                // Unobserve after animation
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

// Enhanced Dodging "No" Button - Making rejection impossible
function initDodgingButton() {
    let dodgeCount = 0;
    const maxDodges = 8; // More dodges
    const encouragingMessages = [
        "Amna, galat button par ja rahi ho! 😅",
        "Nahi nahi Amna, wo button kaam nahi kar raha! 😉",
        "Dekho Amna, button bhi mere saath hai! 💕",
        "Button bhi janta hai tumhara dil kya kehta hai! 😊",
        "Amna, even this button says YES! 💖",
        "Maine button ko sikhaya hai tumhe samjhana! 😂",
        "Technology bhi tumhare saath YES keh rahi hai! 💝",
        "Button ne decide kar liya - only YES for Amna! 🤍"
    ];
    
    let messageIndex = 0;
    
    // Desktop: Mouse hover
    noButton.addEventListener('mouseenter', () => {
        if (dodgeCount < maxDodges) {
            dodgeButton();
            showEncouragingMessage(encouragingMessages[messageIndex % encouragingMessages.length]);
            messageIndex++;
            dodgeCount++;
        } else {
            transformNoButtonToYes();
        }
    });
    
    // Mobile: Touch start
    noButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (dodgeCount < maxDodges) {
            dodgeButton();
            showEncouragingMessage(encouragingMessages[messageIndex % encouragingMessages.length]);
            messageIndex++;
            dodgeCount++;
        } else {
            transformNoButtonToYes();
        }
    });
    
    // Prevent actual clicking
    noButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (dodgeCount < maxDodges) {
            dodgeButton();
            showEncouragingMessage(encouragingMessages[messageIndex % encouragingMessages.length]);
            messageIndex++;
            dodgeCount++;
        } else {
            transformNoButtonToYes();
        }
        return false;
    });
}

function dodgeButton() {
    const container = buttonsContainer.getBoundingClientRect();
    const button = noButton.getBoundingClientRect();
    
    // Calculate safe dodge positions within the container
    const maxX = container.width - button.width - 20;
    const maxY = container.height - button.height - 20;
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    // Apply dodging animation
    noButton.style.position = 'relative';
    noButton.style.transform = `translate(${newX - button.width/2}px, ${newY - button.height/2}px)`;
    noButton.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    
    // Add shake animation
    noButton.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
        noButton.style.animation = '';
    }, 500);
}

function showEncouragingMessage(text) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.encouraging-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const message = document.createElement('div');
    message.innerHTML = `<p style="color: var(--color-accent); font-style: italic; margin-top: 1rem; text-align: center; animation: bounceIn 0.6s;">${text}</p>`;
    message.className = 'encouraging-message';
    buttonsContainer.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 3000);
}

function transformNoButtonToYes() {
    // Transform the No button to Yes with animation
    noButton.innerHTML = '<span>Yes ❤️</span>';
    noButton.style.background = 'linear-gradient(135deg, var(--color-success) 0%, #90c695 100%)';
    noButton.style.transform = 'scale(1.1)';
    noButton.style.animation = 'heartbeat 1s infinite';
    
    // Show final message
    showEncouragingMessage("Dekho Amna! Button ne khud decide kar liya - only YES for you! 💕💕");
    
    // Make it clickable and trigger success
    noButton.onclick = (e) => {
        e.preventDefault();
        showSuccessMessage();
        createCelebrationEffect();
    };
}

// Initialize "Yes" Button
function initYesButton() {
    yesButton.addEventListener('click', (e) => {
        e.preventDefault();
        showSuccessMessage();
        createCelebrationEffect();
    });
}

function showSuccessMessage() {
    // Hide buttons
    buttonsContainer.style.display = 'none';
    
    // Show success message
    successMessage.classList.add('show');
    
    // Scroll to success message smoothly
    setTimeout(() => {
        successMessage.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }, 500);
}

function createCelebrationEffect() {
    const colors = ['💖', '💕', '💗', '💝', '💘', '💞', '💓', '💟', '❤️', '🤍'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createCelebrationHeart(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 100);
    }
    
    // Create continuous celebration for a few seconds
    const celebrationInterval = setInterval(() => {
        for (let i = 0; i < 3; i++) {
            createCelebrationHeart(colors[Math.floor(Math.random() * colors.length)]);
        }
    }, 500);
    
    setTimeout(() => {
        clearInterval(celebrationInterval);
    }, 5000);
}

function createCelebrationHeart(emoji) {
    const heart = document.createElement('div');
    heart.innerHTML = emoji;
    heart.className = 'celebration-heart';
    
    // Random positioning within the success message
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 15 + 20) + 'px';
    
    celebrationHeartsContainer.appendChild(heart);
    
    // Remove after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 2000);
}

// Enhanced interaction feedback
function addCuteInteractionEffects() {
    // Add subtle heart beat to yes button
    yesButton.addEventListener('mouseenter', () => {
        yesButton.style.transform = 'scale(1.05)';
        createTemporaryHeart(yesButton);
    });
    
    yesButton.addEventListener('mouseleave', () => {
        yesButton.style.transform = 'scale(1)';
    });
}

function createTemporaryHeart(button) {
    const heart = document.createElement('span');
    heart.innerHTML = '💕';
    heart.style.position = 'absolute';
    heart.style.fontSize = '1.5rem';
    heart.style.animation = 'floatUp 2s ease-out forwards';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    
    const rect = button.getBoundingClientRect();
    heart.style.left = (rect.left + rect.width/2) + 'px';
    heart.style.top = rect.top + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 2000);
}

// CSS for floatUp animation
const floatUpCSS = `
    @keyframes floatUp {
        0% { transform: translateY(0) scale(0); opacity: 1; }
        100% { transform: translateY(-50px) scale(1); opacity: 0; }
    }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = floatUpCSS;
document.head.appendChild(styleSheet);

// Special Amna name interaction
function initAmnaNameInteraction() {
    const amnaTitle = document.querySelector('.amna-name-title');
    if (!amnaTitle) return;
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        const rect = amnaTitle.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (mouseX - centerX) / 50;
        const deltaY = (mouseY - centerY) / 50;
        
        amnaTitle.style.transform = `translate(${deltaX}px, ${deltaY}px) perspective(1000px) rotateX(${deltaY * 0.1}deg) rotateY(${deltaX * 0.1}deg)`;
    });
    
    // Add click effect to each letter
    const letters = amnaTitle.textContent.split('');
    amnaTitle.innerHTML = letters.map((letter, index) => {
        if (letter === ' ') return '<span class="space"> </span>';
        return `<span class="letter-hover" data-letter="${letter}" style="animation-delay: ${index * 0.1}s">${letter}</span>`;
    }).join('');
    
    // Add hover effects to individual letters
    document.querySelectorAll('.letter-hover').forEach((letter, index) => {
        letter.addEventListener('mouseenter', () => {
            letter.style.color = 'var(--color-rose)';
            letter.style.transform = 'scale(1.2) translateY(-5px)';
            letter.style.textShadow = '0 0 25px rgba(244, 194, 161, 0.8)';
            
            // Create hearts around the letter
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    createLetterHeart(letter);
                }, i * 100);
            }
        });
        
        letter.addEventListener('mouseleave', () => {
            letter.style.color = '';
            letter.style.transform = '';
            letter.style.textShadow = '';
        });
    });
}

function createLetterHeart(element) {
    const heart = document.createElement('span');
    heart.innerHTML = ['💕', '💖', '💗', '🤍', '💝'][Math.floor(Math.random() * 5)];
    heart.style.position = 'absolute';
    heart.style.fontSize = '1rem';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'letterHeartFloat 2s ease-out forwards';
    heart.style.zIndex = '1000';
    
    const rect = element.getBoundingClientRect();
    heart.style.left = (rect.left + Math.random() * rect.width) + 'px';
    heart.style.top = rect.top + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 2000);
}

// Add CSS for letter hearts animation
const letterHeartCSS = `
    @keyframes letterHeartFloat {
        0% { 
            transform: translateY(0) scale(0) rotate(0deg); 
            opacity: 1; 
        }
        100% { 
            transform: translateY(-80px) scale(1.5) rotate(360deg); 
            opacity: 0; 
        }
    }
    
    .letter-hover {
        display: inline-block;
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        cursor: pointer;
    }
    
    .space {
        width: 0.5em;
        display: inline-block;
    }
`;

const letterStyleSheet = document.createElement('style');
letterStyleSheet.textContent = letterHeartCSS;
document.head.appendChild(letterStyleSheet);

// Smooth scroll behavior for navigation
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    // Reset no button position on resize
    if (noButton) {
        noButton.style.transform = 'none';
        noButton.style.position = 'static';
    }
});

// Performance optimization: Debounce scroll events
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

// Enhanced parallax effect with performance optimization
const parallaxElements = [];
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
    
    ticking = false;
}

function requestParallaxUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

// Initialize parallax elements
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.dataset.speed = '0.3';
        parallaxElements.push(hero);
    }
});

window.addEventListener('scroll', requestParallaxUpdate);

// Accessibility: Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target === yesButton) {
            e.preventDefault();
            yesButton.click();
        } else if (e.target === noButton) {
            e.preventDefault();
            // Trigger dodge on keyboard interaction too
            dodgeButton();
        }
    }
});

// Error handling for missing elements
function safeElementOperation(elementId, operation) {
    const element = document.getElementById(elementId);
    if (element) {
        operation(element);
    } else {
        console.warn(`Element with ID "${elementId}" not found`);
    }
}

// Performance: Lazy load non-critical animations
function initLazyAnimations() {
    // Only create hearts after initial render
    setTimeout(createFloatingHearts, 500);
    
    // Optimize scroll listener frequency
    let scrollTimeout;
    const optimizedScrollHandler = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            requestParallaxUpdate();
        }, 16); // ~60fps
    };
    
    window.removeEventListener('scroll', requestParallaxUpdate);
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
}

// Preload critical resources
function preloadCriticalResources() {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = 'https://fonts.gstatic.com';
    document.head.appendChild(link);
}

// Initialize everything when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        preloadCriticalResources();
        initLazyAnimations();
        console.log('Enhanced romantic proposal website loaded successfully! 💕');
    });
} else {
    preloadCriticalResources();
    initLazyAnimations();
    console.log('Enhanced romantic proposal website loaded successfully! 💕');
}
