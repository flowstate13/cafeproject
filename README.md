# ☕ Café Bohème - Modern Café Website

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![OpenStreetMap](https://img.shields.io/badge/OpenStreetMap-7EBC6F?style=for-the-badge&logo=openstreetmap&logoColor=white)

A beautiful, modern, and feature-rich website for a local café in Sousse, Tunisia. Built with vanilla HTML, CSS, and JavaScript - no frameworks needed!

---

## 🎨 Design Moderne

### Palette de Couleurs
- **Or Premium**: `#d4af37` - Accent principal
- **Caramel**: `#c9a86a` - Couleur primaire
- **Brun Foncé**: `#6b4423` - Couleur secondaire
- **Crème**: `#e8d5c4` - Accent doux
- **Fond**: `#f8f5f0` - Crème clair

### Améliorations du Design
- ✨ Dégradés élégants sur tous les éléments interactifs
- 🎭 Effets de survol avec animations fluides (cubic-bezier)
- 💫 Effets de brillance au survol des cartes
- 🌟 Logo avec dégradé doré
- 📦 Ombres réalistes et profondeur
- 🎯 Transitions fluides (0.4s cubic-bezier)
- 🖼️ Header avec effet de flou (backdrop-filter)

---

## 📄 Structure du Projet

```
Projet Web/
│
├── index.html          # Page d'accueil avec slideshow
├── menu.html           # Page menu avec système de commande
├── contact.html        # Page contact avec formulaire et carte
│
├── css/
│   └── styles.css      # Styles CSS modernes avec commentaires
│
├── js/
│   ├── home.js         # JavaScript page d'accueil
│   ├── menu.js         # JavaScript menu et panier
│   └── contact.js      # JavaScript formulaire et Google Maps
│
└── README.md           # Ce fichier
```

---

## 🚀 Lancement du Site

### Option 1: Ouverture Directe
Double-cliquez sur `index.html` dans votre navigateur.

### Option 2: Serveur Local Python (Recommandé)
```bash
cd "Projet Web"
python3 -m http.server 8000
```
Puis ouvrez: http://localhost:8000

### Option 3: VS Code Live Server
1. Installez l'extension "Live Server"
2. Clic droit sur `index.html` → "Open with Live Server"

---

## 🗺️ Configuration Google Maps API

### Obtenir une Clé API (Gratuite)

1. **Créer un compte Google Cloud**
   - Allez sur: https://console.cloud.google.com

2. **Créer un nouveau projet**
   - Cliquez sur "Nouveau projet"
   - Nom: "Café Bohème"

3. **Activer l'API Maps JavaScript**
   - Menu: APIs & Services → Bibliothèque
   - Recherchez: "Maps JavaScript API"
   - Cliquez sur "Activer"

4. **Créer une clé API**
   - APIs & Services → Identifiants
   - Créer des identifiants → Clé API
   - Copiez votre clé

5. **Configurer la clé dans le projet**
   - Ouvrez `contact.html`
   - Ligne 203, remplacez la clé existante par la vôtre:
   ```html
   <script async defer
       src="https://maps.googleapis.com/maps/api/js?key=VOTRE_CLE_ICI&callback=initMap">
   </script>
   ```

### Note Importante
- ✅ Une clé de démonstration est déjà configurée
- ✅ Un système de fallback élégant s'active si la carte ne charge pas
- 💰 Google Maps offre 200$ de crédit gratuit par mois
- 🔒 Pour la production, ajoutez des restrictions sur votre clé API

---

## ✨ Fonctionnalités Principales

### 🏠 Page d'Accueil
- ✅ **Slideshow automatique** (3 images, changement toutes les 5s)
- ✅ **Animations CSS** (@keyframes fadeIn & slideUp)
- ✅ **Section "À propos"** avec image et texte
- ✅ **Cartes de valeurs** avec effets de brillance
- ✅ **Bouton CTA animé** avec effet d'ondulation
- ✅ **Défilement fluide** (smooth scroll)
- ✅ **Effet parallaxe** sur le hero

### 🍽️ Page Menu
- ✅ **20 produits** en 4 catégories
- ✅ **Filtrage dynamique** par catégorie
- ✅ **Tri multiple**: prix (↑↓) et popularité (⭐)
- ✅ **Système de panier complet**:
  - Ajout/retrait de produits
  - Gestion des quantités (+/-)
  - Calcul automatique TVA (13%)
- ✅ **Facture professionnelle**:
  - Génération dynamique
  - Fonction d'impression
  - Design élégant
- ✅ **Badges "Populaire"** sur les produits phares
- ✅ **Notifications toast** pour les actions
- ✅ **Cartes produits** avec effets 3D

### 📧 Page Contact
- ✅ **Formulaire validé** (5 champs):
  - Nom (2-50 caractères)
  - Email (validation regex)
  - Téléphone (optionnel, format tunisien)
  - Sujet (sélection)
  - Message (10-1000 caractères)
- ✅ **Validation en temps réel** (blur + input events)
- ✅ **Messages d'erreur dynamiques**
- ✅ **Confirmation animée** après envoi
- ✅ **Compteur de caractères** pour le message
- ✅ **Google Maps interactive** avec:
  - Marqueur personnalisé
  - InfoWindow stylisée
  - Système de fallback élégant
- ✅ **Cartes d'information** avec animations

---

## 🎯 Exigences Respectées

### HTML ✅
- Structure sémantique (header, section, footer, nav)
- 3 pages complètes
- Liens de navigation fonctionnels
- Attributs alt sur toutes les images

### CSS ✅
- **Design moderne et minimaliste**
- **Grid & Flexbox** pour les layouts
- **Palette de couleurs élégante**
- **Typographie**: Open Sans + Roboto
- **Responsive Design**: Media queries (mobile, tablette, desktop)
- **Effets hover** partout
- **Animations CSS** (@keyframes)
- **Transitions fluides**
- **Dégradés élégants**

### JavaScript ✅
- **Slideshow automatique** (setInterval)
- **Défilement fluide** (scrollIntoView)
- **Effets dynamiques** (mouseenter/mouseleave)
- **Filtrage dynamique** (Array.filter)
- **Tri dynamique** (Array.sort)
- **Validation de formulaire** (regex, conditions)
- **Gestion du DOM** (création d'éléments)
- **API Google Maps** (intégration)
- **Système de panier** (localStorage compatible)

---

## 🎨 Éléments Créatifs (Bonus)

1. ✨ **Nom moderne**: "Café Bohème" (élégant et raffiné)
2. 🎭 **Dégradés dorés** partout
3. 💫 **Effet de brillance** au survol des cartes
4. 🌊 **Effet d'ondulation** sur les boutons
5. 🎯 **IntersectionObserver** pour animations au scroll
6. 📊 **Système de popularité** avec étoiles
7. 🎨 **Design glassmorphism** sur le header
8. 🖼️ **Ombres réalistes** avec profondeur
9. 📱 **Responsive parfait** sur tous les appareils
10. 🎪 **Console stylée** avec dégradés

---

## 📱 Responsive Design

### Desktop (> 992px)
- Grille 3 colonnes pour les valeurs
- Menu en 4 colonnes
- Layout complet

### Tablette (768px - 992px)
- Grille 2 colonnes
- Menu en 2-3 colonnes
- Navigation adaptée

### Mobile (< 768px)
- 1 colonne partout
- Menu hamburger (optionnel)
- Touch-friendly
- Images optimisées

---

## 🔧 Technologies Utilisées

- **HTML5**: Structure sémantique
- **CSS3**: Styles modernes
  - CSS Grid & Flexbox
  - Custom Properties (variables)
  - Animations & Transitions
  - Media Queries
  - Backdrop-filter
- **JavaScript ES6+**: 
  - Arrow functions
  - Template literals
  - Destructuring
  - Array methods
  - DOM API
- **Font Awesome 6.4.0**: Icônes
- **Google Fonts**: Open Sans & Roboto
- **Google Maps API**: Carte interactive

---

## 📊 Performance

- ⚡ Chargement rapide
- 🎨 Images optimisées (Unsplash)
- 📦 CSS minifiable
- 🚀 JavaScript vanilla (pas de frameworks lourds)
- 💾 Pas de dépendances externes (sauf polices et icônes)

---

## 🎓 Contexte Académique

**Projet**: Site Web pour un Café Local  
**Cours**: Développement Web  
**Enseignant**: Dr Rim Zarrouk  
**Institution**: Polytec Sousse  
**Année**: 2025-2026

### Critères d'Évaluation
- ✅ Projet complet et respecte les consignes (13 pts)
- ✅ Clarté et précision (5 pts)
- ✅ Partie créative (2 pts)

---

## 📝 Notes de Développement

### Structure CSS
Le fichier `styles.css` est organisé en sections:
1. Variables globales
2. Reset & Base
3. Header & Navigation
4. Hero & Slideshow
5. Sections de contenu
6. Menu & Produits
7. Panier & Commande
8. Contact & Formulaire
9. Footer
10. Responsive

### JavaScript Modulaire
- `home.js`: Gère le slideshow et les animations de la page d'accueil
- `menu.js`: Gère le filtrage, tri, panier et facture
- `contact.js`: Gère la validation et Google Maps

---

## 🐛 Résolution de Problèmes

### La carte Google Maps ne s'affiche pas?
1. Vérifiez votre clé API
2. Vérifiez que l'API Maps JavaScript est activée
3. Vérifiez la console pour les erreurs
4. Le fallback s'activera automatiquement après 3 secondes

### Le slideshow ne fonctionne pas?
- Vérifiez que `home.js` est bien chargé
- Ouvrez la console (F12) pour voir les erreurs

### Le panier ne sauvegarde pas?
- Normal, il se réinitialise au rechargement
- Pour ajouter localStorage, décommentez les sections dans `menu.js`

---

## 📞 Contact

**Café Bohème**  
Avenue Habib Bourguiba, Sousse, Tunisie  
📧 contact@cafeboheme.tn  
📱 +216 12 345 678  

---

## 📜 Licence

Ce projet est développé à des fins éducatives.  
© 2025 Café Bohème - Tous droits réservés.

---

## 🌟 Améliorations Futures Possibles

- [ ] Backend (Node.js + Express)
- [ ] Base de données (MongoDB)
- [ ] Authentification utilisateur
- [ ] Système de paiement en ligne
- [ ] Réservation de table
- [ ] Programme de fidélité
- [ ] Multi-langues (FR/AR/EN)
- [ ] Mode sombre
- [ ] Progressive Web App (PWA)

---

**Développé avec passion ❤️ pour le cours de Développement Web**
