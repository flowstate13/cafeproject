// ===================================
// Slideshow automatique pour la bannière
// ===================================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Fonction pour afficher le slide actuel
function showSlide(index) {
    // Retirer la classe active de tous les slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Ajouter la classe active au slide actuel
    slides[index].classList.add('active');
}

// Fonction pour passer au slide suivant
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Initialiser le premier slide
showSlide(currentSlide);

// Changer de slide automatiquement toutes les 5 secondes
setInterval(nextSlide, 5000);

// ===================================
// Défilement fluide pour les liens de navigation
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===================================
// Effet de survol dynamique sur le bouton CTA
// ===================================
const ctaButton = document.querySelector('.cta-button');

if (ctaButton) {
    // Effet mouseenter - agrandir et changer
    ctaButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.15)';
        this.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.25)';
    });

    // Effet mouseleave - revenir à la normale
    ctaButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
}

// ===================================
// Animation d'apparition au scroll
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les cartes de valeurs
document.querySelectorAll('.value-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.2}s`;
    fadeInObserver.observe(card);
});

// ===================================
// Effet parallaxe léger sur le hero
// ===================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.3}px)`;
    }
});

// ===================================
// Animation des icônes de valeurs au survol
// ===================================
document.querySelectorAll('.value-card').forEach(card => {
    const icon = card.querySelector('.value-icon i');
    
    card.addEventListener('mouseenter', function() {
        if (icon) {
            icon.style.transform = 'rotate(360deg)';
            icon.style.transition = 'transform 0.6s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (icon) {
            icon.style.transform = 'rotate(0deg)';
        }
    });
});

// ===================================
// Message de bienvenue dans la console (créativité)
// ===================================
console.log('%c☕ Bienvenue au Café Bohème! ✨', 
    'font-size: 22px; font-weight: bold; background: linear-gradient(135deg, #d4af37, #c9a86a); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 2px 2px 8px rgba(0,0,0,0.2);');
console.log('%cSite web développé avec passion ❤️ | Design moderne & élégant', 
    'font-size: 14px; color: #6b4423; font-weight: 600;');
