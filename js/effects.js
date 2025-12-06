// ===================================
// Premium UI Effects & Animations
// ===================================

// Scroll to top button
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.title = 'Retour en haut';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 55px;
        height: 55px;
        background: linear-gradient(135deg, var(--gold) 0%, var(--primary-color) 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
        box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
        transition: all 0.3s ease;
        z-index: 1000;
        animation: pulse 2s infinite;
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top on click
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.15) translateY(-5px)';
        this.style.boxShadow = '0 12px 35px rgba(212, 175, 55, 0.6)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.4)';
    });
});

// ===================================
// Smooth scroll reveal animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to sections
    const animatedElements = document.querySelectorAll('.about-section, .values-section, .cta-section, .menu-section, .contact-content, .map-section');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease';
        element.classList.add('fade-in-element');
        fadeInObserver.observe(element);
    });
    
    // Add CSS for fade-in
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-element {
            opacity: 0;
            transform: translateY(30px);
        }
        .fade-in-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

// ===================================
// Page loading animation
// ===================================
window.addEventListener('load', function() {
    // Create loader
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <i class="fas fa-coffee loader-icon"></i>
            <div class="loader-text">Chargement...</div>
            <div class="loader-bar">
                <div class="loader-progress"></div>
            </div>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--gold) 0%, var(--primary-color) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s, visibility 0.5s;
    `;
    
    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        .loader-content {
            text-align: center;
            color: white;
        }
        .loader-icon {
            font-size: 4rem;
            animation: bounce 1s infinite;
            margin-bottom: 1rem;
        }
        .loader-text {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
        }
        .loader-bar {
            width: 200px;
            height: 4px;
            background: rgba(255,255,255,0.3);
            border-radius: 10px;
            overflow: hidden;
            margin: 0 auto;
        }
        .loader-progress {
            height: 100%;
            background: white;
            border-radius: 10px;
            animation: loading 2s ease-in-out;
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        @keyframes loading {
            0% { width: 0%; }
            100% { width: 100%; }
        }
    `;
    
    document.head.appendChild(loaderStyle);
    document.body.prepend(loader);
    
    // Remove loader after page loads
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        setTimeout(() => loader.remove(), 500);
    }, 1500);
});

// ===================================
// Parallax effect for hero section
// ===================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImages = document.querySelectorAll('.slide img');
    
    heroImages.forEach(img => {
        if (scrolled < window.innerHeight) {
            img.style.transform = `translateY(${scrolled * 0.5}px) scale(1.1)`;
        }
    });
});

// ===================================
// Cursor trail effect (creative)
// ===================================
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Create custom cursor
const cursor = document.createElement('div');
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid var(--gold);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.1s ease;
    display: none;
`;

document.body.appendChild(cursor);

// Only show on desktop
if (window.innerWidth > 768) {
    cursor.style.display = 'block';
}

function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.15;
    cursorY += dy * 0.15;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// ===================================
// Interactive card tilt effect
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.product-card, .value-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

// ===================================
// Console art
// ===================================
console.log('%c', 'font-size: 1px; padding: 100px 150px; background: url(https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop) no-repeat;');
console.log('%c☕ Café Bohème - Site Web Premium', 'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #d4af37, #c9a86a); -webkit-background-clip: text; -webkit-text-fill-color: transparent; padding: 10px;');
console.log('%c✨ Développé avec passion | Design moderne & élégant', 'font-size: 14px; color: #6b4423; font-weight: 600;');
console.log('%c🎨 Fonctionnalités:', 'font-size: 14px; font-weight: bold; color: #d4af37;');
console.log('%c   • Authentification utilisateur', 'color: #555;');
console.log('%c   • Système de favoris', 'color: #555;');
console.log('%c   • Points de fidélité', 'color: #555;');
console.log('%c   • Mode sombre/clair', 'color: #555;');
console.log('%c   • Panier intelligent', 'color: #555;');
console.log('%c   • Historique des commandes', 'color: #555;');
