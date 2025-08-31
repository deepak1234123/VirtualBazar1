// Exchange rates (fixed as per requirements)
const EXCHANGE_RATES = {
    'BDT_TO_USD_CRYPTO': 138, // 138 BDT = 1 USD
    'USD_TO_BDT': 120,        // 1 USD = 120 BDT
    'BDT_TO_INR': 0.6,        // 100 BDT = 60 INR (so 1 BDT = 0.6 INR)
    'BDT_TO_PKR': 1.9,        // 100 BDT = 190 PKR (so 1 BDT = 1.9 PKR)
    'INR_TO_BDT': 1/0.6,      // Inverse of BDT to INR
    'PKR_TO_BDT': 1/1.9       // Inverse of BDT to PKR
};

// DOM Elements
const fromAmount = document.getElementById('fromAmount');
const toAmount = document.getElementById('toAmount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const swapButton = document.getElementById('swapCurrencies');
const exchangeRateText = document.getElementById('exchangeRateText');

// Initialize calculator
document.addEventListener('DOMContentLoaded', function() {
    // Set default currencies
    fromCurrency.value = 'BDT';
    toCurrency.value = 'USD';
    
    // Add event listeners
    fromAmount.addEventListener('input', calculateExchange);
    fromCurrency.addEventListener('change', calculateExchange);
    toCurrency.addEventListener('change', calculateExchange);
    swapButton.addEventListener('click', swapCurrencies);
    
    // Initialize smooth scrolling for navigation
    initSmoothScrolling();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add header scroll effect
    initHeaderScrollEffect();
});

// Calculate exchange rate and convert amount
function calculateExchange() {
    const amount = parseFloat(fromAmount.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;
    
    if (isNaN(amount) || amount <= 0) {
        toAmount.value = '';
        exchangeRateText.textContent = 'Enter amount to see exchange rate';
        return;
    }
    
    const rate = getExchangeRate(from, to);
    if (rate === null) {
        toAmount.value = '';
        exchangeRateText.textContent = 'Exchange rate not available';
        return;
    }
    
    const convertedAmount = amount * rate;
    toAmount.value = convertedAmount.toFixed(2);
    
    // Update exchange rate display
    updateExchangeRateDisplay(from, to, rate, amount);
    
    // Add animation to result
    animateResult();
}

// Get exchange rate between two currencies
function getExchangeRate(from, to) {
    if (from === to) return 1;
    
    // BDT to other currencies
    if (from === 'BDT' && to === 'USD') {
        return 1 / EXCHANGE_RATES.BDT_TO_USD_CRYPTO; // For crypto rate
    }
    if (from === 'BDT' && to === 'INR') {
        return EXCHANGE_RATES.BDT_TO_INR;
    }
    if (from === 'BDT' && to === 'PKR') {
        return EXCHANGE_RATES.BDT_TO_PKR;
    }
    
    // USD to other currencies
    if (from === 'USD' && to === 'BDT') {
        return EXCHANGE_RATES.USD_TO_BDT;
    }
    if (from === 'USD' && to === 'INR') {
        // USD -> BDT -> INR
        return EXCHANGE_RATES.USD_TO_BDT * EXCHANGE_RATES.BDT_TO_INR;
    }
    if (from === 'USD' && to === 'PKR') {
        // USD -> BDT -> PKR
        return EXCHANGE_RATES.USD_TO_BDT * EXCHANGE_RATES.BDT_TO_PKR;
    }
    
    // INR to other currencies
    if (from === 'INR' && to === 'BDT') {
        return EXCHANGE_RATES.INR_TO_BDT;
    }
    if (from === 'INR' && to === 'USD') {
        // INR -> BDT -> USD (crypto rate)
        return EXCHANGE_RATES.INR_TO_BDT / EXCHANGE_RATES.BDT_TO_USD_CRYPTO;
    }
    if (from === 'INR' && to === 'PKR') {
        // INR -> BDT -> PKR
        return EXCHANGE_RATES.INR_TO_BDT * EXCHANGE_RATES.BDT_TO_PKR;
    }
    
    // PKR to other currencies
    if (from === 'PKR' && to === 'BDT') {
        return EXCHANGE_RATES.PKR_TO_BDT;
    }
    if (from === 'PKR' && to === 'USD') {
        // PKR -> BDT -> USD (crypto rate)
        return EXCHANGE_RATES.PKR_TO_BDT / EXCHANGE_RATES.BDT_TO_USD_CRYPTO;
    }
    if (from === 'PKR' && to === 'INR') {
        // PKR -> BDT -> INR
        return EXCHANGE_RATES.PKR_TO_BDT * EXCHANGE_RATES.BDT_TO_INR;
    }
    
    return null;
}

// Update exchange rate display text
function updateExchangeRateDisplay(from, to, rate, amount) {
    let rateText = '';
    
    if (from === 'BDT' && to === 'USD') {
        rateText = `1 USD = ${EXCHANGE_RATES.BDT_TO_USD_CRYPTO} BDT (Crypto Rate)`;
    } else if (from === 'USD' && to === 'BDT') {
        rateText = `1 USD = ${EXCHANGE_RATES.USD_TO_BDT} BDT`;
    } else if (from === 'BDT' && to === 'INR') {
        rateText = `100 BDT = 60 INR`;
    } else if (from === 'BDT' && to === 'PKR') {
        rateText = `100 BDT = 190 PKR`;
    } else {
        rateText = `1 ${from} = ${rate.toFixed(4)} ${to}`;
    }
    
    exchangeRateText.textContent = rateText;
}

// Swap currencies
function swapCurrencies() {
    const fromValue = fromCurrency.value;
    const toValue = toCurrency.value;
    
    fromCurrency.value = toValue;
    toCurrency.value = fromValue;
    
    // Clear amounts and recalculate
    fromAmount.value = '';
    toAmount.value = '';
    exchangeRateText.textContent = 'Enter amount to see exchange rate';
    
    // Add animation to swap button
    swapButton.style.transform = 'scale(1.2) rotate(180deg)';
    setTimeout(() => {
        swapButton.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
}

// Animate result field
function animateResult() {
    toAmount.style.transform = 'scale(1.05)';
    toAmount.style.background = '#f0fff4';
    
    setTimeout(() => {
        toAmount.style.transform = 'scale(1)';
        toAmount.style.background = 'white';
    }, 200);
}

// Initialize smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Add animation class to elements
    const animatedElements = document.querySelectorAll('.rate-card, .contact-card, .calculator-card');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Initialize header scroll effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(102, 126, 234, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Add currency formatting
function formatCurrency(amount, currency) {
    const symbols = {
        'BDT': '৳',
        'USD': '$',
        'INR': '₹',
        'PKR': '₨'
    };
    
    return `${symbols[currency] || ''}${amount}`;
}

// Add input validation
fromAmount.addEventListener('input', function() {
    // Remove any non-numeric characters except decimal point
    this.value = this.value.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = this.value.split('.');
    if (parts.length > 2) {
        this.value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Limit to 2 decimal places
    if (parts[1] && parts[1].length > 2) {
        this.value = parts[0] + '.' + parts[1].substring(0, 2);
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to swap currencies
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        swapCurrencies();
    }
    
    // Escape to clear calculator
    if (e.key === 'Escape') {
        fromAmount.value = '';
        toAmount.value = '';
        exchangeRateText.textContent = 'Enter amount to see exchange rate';
        fromAmount.focus();
    }
});

// Add focus management
fromAmount.addEventListener('focus', function() {
    this.parentElement.classList.add('focused');
});

fromAmount.addEventListener('blur', function() {
    this.parentElement.classList.remove('focused');
});

// Add contact link tracking (for analytics if needed)
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('click', function() {
        const platform = this.querySelector('h3').textContent;
        console.log(`Contact clicked: ${platform}`);
        
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Initialize tooltips for exchange rates
function initTooltips() {
    const rateCards = document.querySelectorAll('.rate-card');
    
    rateCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
}

// Call tooltip initialization
initTooltips();

// Add performance optimization for scroll events
let ticking = false;

function updateOnScroll() {
    // Scroll-based animations or updates can go here
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker can be added later for offline functionality
        console.log('Service Worker support detected');
    });
}
