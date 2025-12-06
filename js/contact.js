// ===================================
// Validation du formulaire de contact
// ===================================

const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

// ===================================
// Expressions régulières pour validation
// ===================================
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(\+216)?[0-9]{8}$/;

// ===================================
// Fonction pour afficher les erreurs
// ===================================
function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement && inputElement) {
        errorElement.textContent = message;
        inputElement.style.borderColor = '#ff6b6b';
    }
}

// ===================================
// Fonction pour effacer les erreurs
// ===================================
function clearError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement && inputElement) {
        errorElement.textContent = '';
        inputElement.style.borderColor = '#e0e0e0';
    }
}

// ===================================
// Fonction de validation du nom
// ===================================
function validateName() {
    const name = document.getElementById('name').value.trim();
    
    if (name === '') {
        showError('name', 'Le nom est requis');
        return false;
    }
    
    if (name.length < 2) {
        showError('name', 'Le nom doit contenir au moins 2 caractères');
        return false;
    }
    
    if (name.length > 50) {
        showError('name', 'Le nom ne peut pas dépasser 50 caractères');
        return false;
    }
    
    clearError('name');
    return true;
}

// ===================================
// Fonction de validation de l'email
// ===================================
function validateEmail() {
    const email = document.getElementById('email').value.trim();
    
    if (email === '') {
        showError('email', 'L\'email est requis');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        showError('email', 'Veuillez entrer une adresse email valide');
        return false;
    }
    
    clearError('email');
    return true;
}

// ===================================
// Fonction de validation du téléphone (optionnel)
// ===================================
function validatePhone() {
    const phone = document.getElementById('phone').value.trim();
    
    // Le téléphone est optionnel
    if (phone === '') {
        clearError('phone');
        return true;
    }
    
    if (!phoneRegex.test(phone)) {
        showError('phone', 'Format invalide (ex: +216 12 345 678 ou 12345678)');
        return false;
    }
    
    clearError('phone');
    return true;
}

// ===================================
// Fonction de validation du sujet
// ===================================
function validateSubject() {
    const subject = document.getElementById('subject').value;
    
    if (subject === '') {
        showError('subject', 'Veuillez sélectionner un sujet');
        return false;
    }
    
    clearError('subject');
    return true;
}

// ===================================
// Fonction de validation du message
// ===================================
function validateMessage() {
    const message = document.getElementById('message').value.trim();
    
    if (message === '') {
        showError('message', 'Le message est requis');
        return false;
    }
    
    if (message.length < 10) {
        showError('message', 'Le message doit contenir au moins 10 caractères');
        return false;
    }
    
    if (message.length > 1000) {
        showError('message', 'Le message ne peut pas dépasser 1000 caractères');
        return false;
    }
    
    clearError('message');
    return true;
}

// ===================================
// Validation en temps réel (au changement)
// ===================================
document.getElementById('name').addEventListener('blur', validateName);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('phone').addEventListener('blur', validatePhone);
document.getElementById('subject').addEventListener('change', validateSubject);
document.getElementById('message').addEventListener('blur', validateMessage);

// ===================================
// Validation et soumission du formulaire
// ===================================
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Valider tous les champs
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();
    
    // Si tous les champs sont valides
    if (isNameValid && isEmailValid && isPhoneValid && isSubjectValid && isMessageValid) {
        // Animation du bouton de soumission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;
        
        // Simuler l'envoi du formulaire (2 secondes)
        setTimeout(() => {
            // Cacher le formulaire
            contactForm.style.display = 'none';
            
            // Afficher le message de succès
            successMessage.classList.add('active');
            
            // Réinitialiser le bouton
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Réinitialiser le formulaire après 5 secondes
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                successMessage.classList.remove('active');
            }, 5000);
            
            // Défiler vers le message de succès
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
        }, 2000);
    } else {
        // Défiler vers le premier champ invalide
        const firstError = contactForm.querySelector('input[style*="border-color: rgb(255, 107, 107)"], select[style*="border-color: rgb(255, 107, 107)"], textarea[style*="border-color: rgb(255, 107, 107)"]');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
    }
});

// ===================================
// Effacer les erreurs lors de la saisie
// ===================================
document.getElementById('name').addEventListener('input', function() {
    if (this.value.trim() !== '') clearError('name');
});

document.getElementById('email').addEventListener('input', function() {
    if (this.value.trim() !== '') clearError('email');
});

document.getElementById('phone').addEventListener('input', function() {
    if (this.value.trim() !== '') clearError('phone');
});

document.getElementById('message').addEventListener('input', function() {
    if (this.value.trim() !== '') clearError('message');
});

// ===================================
// Initialisation de la carte avec Leaflet.js et OpenStreetMap
// ===================================
window.addEventListener('load', function() {
    const mapContainer = document.getElementById('map');
    
    // First, try Leaflet if it's available
    if (mapContainer && typeof L !== 'undefined') {
        // Coordonnées de Sousse, Tunisie (Avenue Habib Bourguiba)
        const cafeLocation = [35.8256, 10.6369];
        
        // Initialiser la carte
        const map = L.map('map', {
            center: cafeLocation,
            zoom: 15,
            zoomControl: true,
            scrollWheelZoom: true
        });
        
        // Ajouter les tuiles OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
            className: 'map-tiles'
        }).addTo(map);
        
        // Créer une icône personnalisée pour le marqueur
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `
                <div style="position: relative;">
                    <div style="
                        width: 50px;
                        height: 50px;
                        background: linear-gradient(135deg, #d4af37, #c9a86a);
                        border-radius: 50% 50% 50% 0;
                        transform: rotate(-45deg);
                        border: 3px solid white;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    ">
                        <i class="fas fa-coffee" style="
                            font-size: 1.5rem;
                            color: white;
                            transform: rotate(45deg);
                        "></i>
                    </div>
                </div>
            `,
            iconSize: [50, 50],
            iconAnchor: [25, 50],
            popupAnchor: [0, -50]
        });
        
        // Ajouter le marqueur
        const marker = L.marker(cafeLocation, { 
            icon: customIcon,
            title: 'Café Bohème'
        }).addTo(map);
        
        // Contenu du popup
        const popupContent = `
            <div style="font-family: 'Roboto', sans-serif; min-width: 250px;">
                <h3 style="
                    color: #6b4423;
                    margin: 0 0 15px 0;
                    font-size: 1.3rem;
                    font-weight: 800;
                    border-bottom: 3px solid #d4af37;
                    padding-bottom: 10px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                ">
                    <i class="fas fa-coffee" style="color: #d4af37;"></i>
                    Café Bohème
                </h3>
                <div style="margin: 12px 0;">
                    <p style="margin: 8px 0; color: #555; font-size: 0.95rem; display: flex; align-items: start; gap: 8px;">
                        <i class="fas fa-location-dot" style="color: #d4af37; margin-top: 3px;"></i>
                        <span><strong>Adresse:</strong><br>Avenue Habib Bourguiba<br>Sousse, Tunisie</span>
                    </p>
                    <p style="margin: 8px 0; color: #555; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-phone" style="color: #d4af37;"></i>
                        <span><strong>Téléphone:</strong> +216 12 345 678</span>
                    </p>
                    <p style="margin: 8px 0; color: #555; font-size: 0.95rem; display: flex; align-items: start; gap: 8px;">
                        <i class="fas fa-clock" style="color: #d4af37; margin-top: 3px;"></i>
                        <span><strong>Horaires:</strong><br>Lun-Ven: 7h-20h<br>Sam-Dim: 8h-22h</span>
                    </p>
                </div>
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
                    <a href="https://www.openstreetmap.org/?mlat=35.8256&mlon=10.6369#map=15/35.8256/10.6369" 
                       target="_blank"
                       style="
                           display: inline-flex;
                           align-items: center;
                           gap: 6px;
                           padding: 8px 16px;
                           background: linear-gradient(135deg, #d4af37, #c9a86a);
                           color: white;
                           text-decoration: none;
                           border-radius: 25px;
                           font-weight: 600;
                           font-size: 0.9rem;
                           transition: all 0.3s ease;
                       "
                       onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 15px rgba(212,175,55,0.4)';"
                       onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none';">
                        <i class="fas fa-directions"></i>
                        Obtenir l'itinéraire
                    </a>
                </div>
            </div>
        `;
        
        // Ajouter le popup au marqueur
        marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'custom-popup'
        });
        
        // Ouvrir le popup automatiquement
        marker.openPopup();
        
        // Animation du marqueur
        setTimeout(() => {
            marker.setLatLng(cafeLocation);
        }, 500);
        
        // Ajouter un cercle autour du café
        L.circle(cafeLocation, {
            color: '#d4af37',
            fillColor: '#c9a86a',
            fillOpacity: 0.2,
            radius: 100
        }).addTo(map);
        
        console.log('%c🗺️ Carte OpenStreetMap chargée avec succès!', 
            'font-size: 14px; font-weight: bold; color: #4caf50;');
    } else if (mapContainer) {
        // Fallback: Use OpenStreetMap iframe (always works, no dependencies)
        console.log('Using iframe fallback for map');
        mapContainer.innerHTML = `
            <div style="
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #f8f5f0 0%, #e8d5c4 100%);
                border-radius: 10px;
            ">
                <div style="text-align: center; padding: 2rem;">
                    <i class="fas fa-map-marked-alt" style="font-size: 4rem; color: #d4af37; margin-bottom: 1rem;"></i>
                    <h3 style="color: #6b4423; margin-bottom: 0.5rem;">☕ Café Bohème</h3>
                    <p style="color: #666;">Avenue Habib Bourguiba, Sousse</p>
                    <a href="https://www.openstreetmap.org/?mlat=35.8256&mlon=10.6369#map=15/35.8256/10.6369" 
                       target="_blank"
                       style="
                           display: inline-block;
                           margin-top: 1rem;
                           padding: 0.8rem 1.5rem;
                           background: linear-gradient(135deg, #d4af37, #c9a86a);
                           color: white;
                           text-decoration: none;
                           border-radius: 25px;
                           font-weight: 600;
                       ">
                        <i class="fas fa-map"></i> Voir sur OpenStreetMap
                    </a>
                </div>
            </div>
        `;
    }
});

// ===================================
// Animation au scroll des cartes d'information
// ===================================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const fadeInObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, observerOptions);

// Observer les cartes d'information
document.querySelectorAll('.info-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    fadeInObserver.observe(card);
});

// ===================================
// Animation des liens sociaux
// ===================================
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ===================================
// Compteur de caractères pour le message
// ===================================
const messageTextarea = document.getElementById('message');
const messageLabel = messageTextarea.previousElementSibling;

messageTextarea.addEventListener('input', function() {
    const currentLength = this.value.length;
    const maxLength = 1000;
    
    // Trouver ou créer l'indicateur de compteur
    let counter = document.getElementById('message-counter');
    if (!counter) {
        counter = document.createElement('span');
        counter.id = 'message-counter';
        counter.style.cssText = 'float: right; color: #999; font-size: 0.85rem;';
        messageLabel.appendChild(counter);
    }
    
    counter.textContent = `${currentLength}/${maxLength}`;
    
    // Changer la couleur si proche de la limite
    if (currentLength > maxLength * 0.9) {
        counter.style.color = '#ff6b6b';
    } else {
        counter.style.color = '#999';
    }
});

// ===================================
// Message de bienvenue dans la console
// ===================================
console.log('%c📧 Page de Contact - Café Bohème', 
    'font-size: 18px; font-weight: bold; background: linear-gradient(135deg, #d4af37, #c9a86a); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cN\'hésitez pas à nous contacter! Nous sommes à votre écoute ✨', 
    'font-size: 14px; color: #6b4423; font-weight: 600;');
