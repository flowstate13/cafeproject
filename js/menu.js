// ===================================
// Données des produits du menu
// ===================================
const products = [
    // Boissons Chaudes
    {
        id: 1,
        name: 'Espresso',
        category: 'boissons-chaudes',
        price: 3.50,
        description: 'Un expresso intense et aromatique, extrait à la perfection.',
        image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop',
        popularity: 5,
        popular: true
    },
    {
        id: 2,
        name: 'Cappuccino',
        category: 'boissons-chaudes',
        price: 4.50,
        description: 'Café expresso surmonté d\'une mousse de lait crémeuse.',
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop',
        popularity: 5,
        popular: true
    },
    {
        id: 3,
        name: 'Latte Vanille',
        category: 'boissons-chaudes',
        price: 5.00,
        description: 'Café au lait avec un soupçon de vanille naturelle.',
        image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&h=300&fit=crop',
        popularity: 4,
        popular: false
    },
    {
        id: 4,
        name: 'Café Turc',
        category: 'boissons-chaudes',
        price: 3.00,
        description: 'Café traditionnel turc, finement moulu et épicé.',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop',
        popularity: 4,
        popular: false
    },
    {
        id: 5,
        name: 'Thé à la Menthe',
        category: 'boissons-chaudes',
        price: 2.50,
        description: 'Thé vert traditionnel tunisien avec menthe fraîche.',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
        popularity: 4,
        popular: false
    },
    {
        id: 6,
        name: 'Chocolat Chaud',
        category: 'boissons-chaudes',
        price: 4.00,
        description: 'Chocolat onctueux fait avec du cacao belge premium.',
        image: 'https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=400&h=300&fit=crop',
        popularity: 5,
        popular: true
    },
    
    // Boissons Froides
    {
        id: 7,
        name: 'Ice Latte',
        category: 'boissons-froides',
        price: 5.50,
        description: 'Café au lait glacé, parfait pour les journées chaudes.',
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop',
        popularity: 5,
        popular: true
    },
    {
        id: 8,
        name: 'Frappuccino Caramel',
        category: 'boissons-froides',
        price: 6.00,
        description: 'Boisson glacée crémeuse au caramel et café.',
        image: 'https://images.unsplash.com/photo-1562155955-1cb2d73488d7?w=400&h=300&fit=crop',
        popularity: 5,
        popular: true
    },
    {
        id: 9,
        name: 'Smoothie Fruits Rouges',
        category: 'boissons-froides',
        price: 5.00,
        description: 'Mélange frais de fruits rouges et yaourt.',
        image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop',
        popularity: 4,
        popular: false
    },
    {
        id: 10,
        name: 'Jus d\'Orange Frais',
        category: 'boissons-froides',
        price: 4.00,
        description: 'Oranges pressées minute, 100% naturel.',
        image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop',
        popularity: 4,
        popular: false
    },
    
    // Pâtisseries
    {
        id: 11,
        name: 'Croissant au Beurre',
        category: 'patisseries',
        price: 2.50,
        description: 'Croissant français croustillant et fondant.',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop',
        popularity: 5,
        popular: true
    },
    {
        id: 12,
        name: 'Pain au Chocolat',
        category: 'patisseries',
        price: 2.80,
        description: 'Viennoiserie garnie de deux barres de chocolat.',
        image: 'https://images.unsplash.com/photo-1623334044303-241021148842?w=400&h=300&fit=crop',
        popularity: 5,
        popular: true
    },
    {
        id: 13,
        name: 'Mille-feuille',
        category: 'patisseries',
        price: 4.50,
        description: 'Pâte feuilletée croustillante et crème pâtissière.',
        image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?w=400&h=300&fit=crop',
        popularity: 4,
        popular: false
    },
    {
        id: 14,
        name: 'Éclair au Café',
        category: 'patisseries',
        price: 3.50,
        description: 'Éclair fourré à la crème au café, glaçage fondant.',
        image: 'https://images.unsplash.com/photo-1612201142855-e7f6f2a4c708?w=400&h=300&fit=crop',
        popularity: 4,
        popular: false
    },
    {
        id: 15,
        name: 'Tarte aux Pommes',
        category: 'patisseries',
        price: 4.00,
        description: 'Tarte maison avec pommes caramélisées.',
        image: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=400&h=300&fit=crop',
        popularity: 4,
        popular: false
    },
    {
        id: 16,
        name: 'Cheesecake',
        category: 'patisseries',
        price: 5.00,
        description: 'Cheesecake crémeux sur base biscuitée.',
        image: 'https://images.unsplash.com/photo-1533134242820-b35df4a7e137?w=400&h=300&fit=crop',
        popularity: 5,
        popular: true
    },
    
    // Sandwiches
    {
        id: 17,
        name: 'Sandwich Poulet',
        category: 'sandwiches',
        price: 7.00,
        description: 'Poulet grillé, salade, tomates et sauce maison.',
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop',
        popularity: 5,
        popular: true
    },
    {
        id: 18,
        name: 'Sandwich Végétarien',
        category: 'sandwiches',
        price: 6.50,
        description: 'Légumes grillés, houmous et fromage frais.',
        image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop',
        popularity: 4,
        popular: false
    },
    {
        id: 19,
        name: 'Panini Thon',
        category: 'sandwiches',
        price: 6.00,
        description: 'Thon, olives, câpres et fromage gratiné.',
        image: 'https://images.unsplash.com/photo-1621852004158-f3bc188ace2d?w=400&h=300&fit=crop',
        popularity: 4,
        popular: false
    },
    {
        id: 20,
        name: 'Club Sandwich',
        category: 'sandwiches',
        price: 8.00,
        description: 'Triple étage: poulet, bacon, œuf et crudités.',
        image: 'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=400&h=300&fit=crop',
        popularity: 5,
        popular: true
    }
];

// ===================================
// Variables globales
// ===================================
let cart = [];
let currentFilter = 'all';
let currentSort = 'default';

// ===================================
// Fonction pour créer une carte de produit
// ===================================
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;
    card.dataset.price = product.price;
    card.dataset.popularity = product.popularity;
    card.dataset.productId = product.id;
    
    // Badge de popularité
    const popularBadge = product.popular ? '<span class="popular-badge">⭐ Populaire</span>' : '';
    
    // Étoiles de popularité
    const stars = '⭐'.repeat(product.popularity);
    
    card.innerHTML = `
        ${popularBadge}
        <button class="favorite-btn" data-product-id="${product.id}" onclick="toggleFavorite(${product.id}, event)" title="Ajouter aux favoris">
            <i class="far fa-heart"></i>
        </button>
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <span class="product-category">${getCategoryLabel(product.category)}</span>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">${product.price.toFixed(2)} TND</span>
                <span class="product-popularity" title="Popularité">${stars}</span>
            </div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id}, event)">
                <i class="fas fa-shopping-cart"></i> Ajouter au panier
            </button>
        </div>
    `;
    
    // Make card clickable to show details
    card.addEventListener('click', function(e) {
        // Don't open modal if clicking on add to cart button
        if (!e.target.closest('.add-to-cart-btn')) {
            showProductModal(product.id);
        }
    });
    
    card.style.cursor = 'pointer';
    
    return card;
}

// ===================================
// Fonction pour obtenir le label de la catégorie
// ===================================
function getCategoryLabel(category) {
    const labels = {
        'boissons-chaudes': 'Boissons Chaudes',
        'boissons-froides': 'Boissons Froides',
        'patisseries': 'Pâtisseries',
        'sandwiches': 'Sandwiches'
    };
    return labels[category] || category;
}

// ===================================
// Fonction pour afficher les produits
// ===================================
function displayProducts() {
    const menuGrid = document.getElementById('menu-grid');
    menuGrid.innerHTML = '';
    
    let filteredProducts = products;
    
    // Filtrage par catégorie
    if (currentFilter !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === currentFilter);
    }
    
    // Tri
    switch(currentSort) {
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'popularity':
            filteredProducts.sort((a, b) => b.popularity - a.popularity);
            break;
        default:
            // Tri par défaut (ordre original)
            break;
    }
    
    // Affichage des produits avec animation
    filteredProducts.forEach((product, index) => {
        const card = createProductCard(product);
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        menuGrid.appendChild(card);
        
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// ===================================
// Gestion des filtres
// ===================================
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Retirer la classe active de tous les boutons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        
        // Ajouter la classe active au bouton cliqué
        this.classList.add('active');
        
        // Mettre à jour le filtre
        currentFilter = this.dataset.category;
        
        // Réafficher les produits
        displayProducts();
    });
});

// ===================================
// Gestion du tri
// ===================================
document.getElementById('sort-select').addEventListener('change', function() {
    currentSort = this.value;
    displayProducts();
});

// ===================================
// Show product details modal
// ===================================
function showProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const modalBody = document.getElementById('product-modal-body');
    
    // Features based on category
    const features = {
        'boissons-chaudes': [
            'Servi chaud à température optimale',
            'Grains fraîchement moulus',
            'Options: sucre, lait, crème'
        ],
        'boissons-froides': [
            'Servi avec glaçons',
            'Ingrédients frais du jour',
            'Parfait pour l\'été'
        ],
        'patisseries': [
            'Fait maison quotidiennement',
            'Ingrédients de qualité supérieure',
            'Peut contenir des allergènes'
        ],
        'sandwiches': [
            'Pain frais du jour',
            'Ingrédients locaux et bio',
            'Préparé à la commande'
        ]
    };
    
    modalBody.innerHTML = `
        <div>
            <img src="${product.image}" alt="${product.name}" class="product-modal-image">
        </div>
        <div class="product-modal-details">
            <span class="product-modal-category">${getCategoryLabel(product.category)}</span>
            <h2>${product.name}</h2>
            <div class="product-modal-rating">
                ${'⭐'.repeat(product.popularity)}
                <span style="color: var(--text-light); font-size: 0.9rem;">(${product.popularity}/5)</span>
            </div>
            <p class="product-modal-description">${product.description}</p>
            <div class="product-modal-price">${product.price.toFixed(2)} TND</div>
            
            <div class="product-modal-features">
                <h3><i class="fas fa-check-circle"></i> Caractéristiques</h3>
                <ul>
                    ${features[product.category].map(f => `<li><i class="fas fa-star"></i> ${f}</li>`).join('')}
                </ul>
            </div>
            
            <div class="product-modal-actions">
                <button class="modal-add-cart" onclick="addToCart(${product.id}, event); closeProductModal();">
                    <i class="fas fa-shopping-cart"></i>
                    Ajouter au panier
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

// ===================================
// Close product modal
// ===================================
function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
}

document.getElementById('close-product-modal').addEventListener('click', closeProductModal);

// Close when clicking outside
window.addEventListener('click', function(e) {
    const productModal = document.getElementById('product-modal');
    if (e.target === productModal) {
        closeProductModal();
    }
});

// ===================================
// Fonction pour ajouter au panier
// ===================================
function addToCart(productId, event) {
    if (event) {
        event.stopPropagation(); // Prevent card click event
    }
    
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCart();
    updateCartCount(); // Update header cart count
    
    // Animation de confirmation
    showNotification('✅ Produit ajouté au panier!');
}

// ===================================
// Fonction pour mettre à jour le panier
// ===================================
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
        document.getElementById('checkout-btn').disabled = true;
    } else {
        cartItemsContainer.innerHTML = '';
        document.getElementById('checkout-btn').disabled = false;
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price.toFixed(2)} TND</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }
    
    updateTotals();
}

// ===================================
// Fonction pour mettre à jour la quantité
// ===================================
function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
            updateCartCount();
        }
    }
}

// ===================================
// Fonction pour retirer du panier
// ===================================
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    updateCartCount();
    showNotification('🗑️ Produit retiré du panier');
}

// ===================================
// Fonction pour calculer les totaux
// ===================================
function updateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.13; // TVA 13%
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = subtotal.toFixed(2) + ' TND';
    document.getElementById('tax').textContent = tax.toFixed(2) + ' TND';
    document.getElementById('total').textContent = total.toFixed(2) + ' TND';
}

// ===================================
// Fonction pour afficher la facture
// ===================================
document.getElementById('checkout-btn').addEventListener('click', function() {
    if (cart.length === 0) return;
    
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        showNotification('⚠️ Veuillez vous connecter pour passer commande', 'error');
        document.getElementById('auth-modal').classList.add('active');
        return;
    }
    
    // Générer la facture
    const modal = document.getElementById('invoice-modal');
    const invoiceItems = document.getElementById('invoice-items');
    
    // Date actuelle
    const now = new Date();
    document.getElementById('invoice-date').textContent = now.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Items de la facture
    invoiceItems.innerHTML = '';
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const invoiceItem = document.createElement('div');
        invoiceItem.className = 'invoice-item';
        invoiceItem.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>${itemTotal.toFixed(2)} TND</span>
        `;
        invoiceItems.appendChild(invoiceItem);
    });
    
    // Totaux
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.13;
    const total = subtotal + tax;
    
    document.getElementById('invoice-subtotal').textContent = subtotal.toFixed(2) + ' TND';
    document.getElementById('invoice-tax').textContent = tax.toFixed(2) + ' TND';
    document.getElementById('invoice-total').textContent = total.toFixed(2) + ' TND';
    
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('userOrders')) || [];
    const newOrder = {
        id: Date.now(),
        userId: currentUser.id,
        items: cart.map(item => ({...item})),
        subtotal: subtotal,
        tax: tax,
        total: total,
        date: new Date().toISOString(),
        status: 'pending'
    };
    orders.push(newOrder);
    localStorage.setItem('userOrders', JSON.stringify(orders));
    
    // Award loyalty points (1 point per 10 TND spent)
    const pointsEarned = Math.floor(total / 10);
    const currentPoints = parseInt(localStorage.getItem(`points_${currentUser.id}`)) || 0;
    localStorage.setItem(`points_${currentUser.id}`, currentPoints + pointsEarned);
    
    // Show points notification
    if (pointsEarned > 0) {
        setTimeout(() => {
            showNotification(`🎉 Vous avez gagné ${pointsEarned} points fidélité!`);
        }, 1000);
    }
    
    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    updateCartCount();
    
    // Afficher le modal
    modal.classList.add('active');
});

// ===================================
// Fermer le modal
// ===================================
document.querySelector('.close-modal').addEventListener('click', function() {
    document.getElementById('invoice-modal').classList.remove('active');
});

// Fermer en cliquant en dehors
window.addEventListener('click', function(e) {
    const modal = document.getElementById('invoice-modal');
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// ===================================
// Notification temporaire
// ===================================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #d4a574;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Animations CSS pour les notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Load cart from localStorage
// ===================================
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// ===================================
// Update cart count in header (from auth.js)
// ===================================
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        cartCountElement.textContent = totalItems;
        
        if (totalItems > 0) {
            cartCountElement.style.display = 'flex';
        } else {
            cartCountElement.style.display = 'none';
        }
    }
}

// ===================================
// Initialisation
// ===================================
loadCart(); // Load cart from localStorage
displayProducts();
updateCart();
updateCartCount();

// Update favorite buttons after products are displayed
setTimeout(() => {
    if (typeof updateFavoriteButtons === 'function') {
        updateFavoriteButtons();
    }
}, 100);
