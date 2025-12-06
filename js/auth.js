// ===================================
// User Authentication System
// ===================================

// Initialize user data from localStorage
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let users = JSON.parse(localStorage.getItem('users')) || [];

// ===================================
// Update UI based on authentication state
// ===================================
function updateAuthUI() {
    const userBtn = document.getElementById('user-btn');
    const userName = document.querySelector('.user-name');
    
    if (currentUser) {
        if (userName) {
            userName.textContent = currentUser.name.split(' ')[0]; // First name only
        }
        userBtn.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
        userBtn.title = `Connecté en tant que ${currentUser.name}`;
        
        // Add logout functionality
        userBtn.addEventListener('click', showUserMenu);
    } else {
        if (userName) {
            userName.textContent = 'Connexion';
        }
        userBtn.title = 'Se connecter';
        userBtn.addEventListener('click', openAuthModal);
    }
}

// ===================================
// Show user menu when logged in
// ===================================
function showUserMenu(e) {
    e.stopPropagation();
    
    // Remove existing menu
    const existingMenu = document.querySelector('.user-dropdown');
    if (existingMenu) {
        existingMenu.remove();
        return;
    }
    
    // Create dropdown menu
    const menu = document.createElement('div');
    menu.className = 'user-dropdown';
    menu.innerHTML = `
        <div class="user-dropdown-header">
            <i class="fas fa-user-circle"></i>
            <div>
                <div class="user-dropdown-name">${currentUser.name}</div>
                <div class="user-dropdown-email">${currentUser.email}</div>
            </div>
        </div>
        <div class="user-dropdown-divider"></div>
        <button class="user-dropdown-item" onclick="viewOrders()">
            <i class="fas fa-shopping-bag"></i> Mes commandes
        </button>
        <button class="user-dropdown-item" onclick="viewProfile()">
            <i class="fas fa-user-edit"></i> Mon profil
        </button>
        <div class="user-dropdown-divider"></div>
        <button class="user-dropdown-item logout-btn" onclick="logout()">
            <i class="fas fa-sign-out-alt"></i> Déconnexion
        </button>
    `;
    
    // Add CSS for dropdown
    const style = document.createElement('style');
    style.textContent = `
        .user-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            margin-top: 10px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.15);
            min-width: 250px;
            z-index: 3000;
            animation: slideDown 0.3s ease;
        }
        .user-dropdown-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1.5rem;
            background: linear-gradient(135deg, var(--gold), var(--primary-color));
            color: white;
            border-radius: 15px 15px 0 0;
        }
        .user-dropdown-header i {
            font-size: 2.5rem;
        }
        .user-dropdown-name {
            font-weight: 700;
            font-size: 1.1rem;
        }
        .user-dropdown-email {
            font-size: 0.85rem;
            opacity: 0.9;
        }
        .user-dropdown-divider {
            height: 1px;
            background: #e0e0e0;
            margin: 0.5rem 0;
        }
        .user-dropdown-item {
            width: 100%;
            padding: 1rem 1.5rem;
            background: none;
            border: none;
            text-align: left;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            color: var(--text-dark);
            font-size: 1rem;
        }
        .user-dropdown-item:hover {
            background: var(--bg-cream);
        }
        .user-dropdown-item i {
            color: var(--gold);
            width: 20px;
        }
        .logout-btn {
            color: #ff6b6b;
        }
        .logout-btn i {
            color: #ff6b6b;
        }
    `;
    
    if (!document.querySelector('.user-dropdown-style')) {
        style.className = 'user-dropdown-style';
        document.head.appendChild(style);
    }
    
    // Position relative to button
    const userBtn = document.getElementById('user-btn');
    userBtn.parentElement.style.position = 'relative';
    userBtn.parentElement.appendChild(menu);
    
    // Close menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeMenu() {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        });
    }, 100);
}

// ===================================
// View user orders
// ===================================
function viewOrders() {
    const orders = JSON.parse(localStorage.getItem('userOrders')) || [];
    const userOrders = orders.filter(o => o.userId === currentUser.id);
    
    const ordersModal = document.createElement('div');
    ordersModal.className = 'modal active';
    ordersModal.id = 'orders-modal';
    
    let ordersHTML = '';
    if (userOrders.length === 0) {
        ordersHTML = '<div class="empty-orders"><i class="fas fa-shopping-bag" style="font-size: 4rem; color: var(--gold); opacity: 0.3;"></i><p>Vous n\'avez pas encore passé de commande</p><a href="menu.html" class="cta-button" style="margin-top: 1rem;">Découvrir le menu</a></div>';
    } else {
        ordersHTML = userOrders.reverse().map(order => `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <h3><i class="fas fa-receipt"></i> Commande #${order.id}</h3>
                        <p class="order-date">${new Date(order.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    <div class="order-status ${order.status}">
                        ${order.status === 'completed' ? '<i class="fas fa-check-circle"></i> Livrée' : '<i class="fas fa-clock"></i> En cours'}
                    </div>
                </div>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <img src="${item.image}" alt="${item.name}">
                            <span>${item.name} x${item.quantity}</span>
                            <span class="order-item-price">${(item.price * item.quantity).toFixed(2)} TND</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-total">
                    <strong>Total:</strong> ${order.total.toFixed(2)} TND
                </div>
            </div>
        `).join('');
    }
    
    ordersModal.innerHTML = `
        <div class="modal-content" style="max-width: 800px; max-height: 90vh; overflow-y: auto;">
            <span class="close-modal" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <div style="padding: 2rem;">
                <h2 style="color: var(--secondary-color); margin-bottom: 2rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-shopping-bag"></i> Mes Commandes
                </h2>
                ${ordersHTML}
            </div>
        </div>
    `;
    
    document.body.appendChild(ordersModal);
}

// ===================================
// View user profile
// ===================================
function viewProfile() {
    const profileModal = document.createElement('div');
    profileModal.className = 'modal active';
    profileModal.id = 'profile-modal';
    
    const userData = users.find(u => u.id === currentUser.id) || currentUser;
    const userPoints = parseInt(localStorage.getItem(`points_${currentUser.id}`)) || 0;
    const userOrders = (JSON.parse(localStorage.getItem('userOrders')) || []).filter(o => o.userId === currentUser.id);
    
    profileModal.innerHTML = `
        <div class="modal-content auth-modal-content">
            <span class="close-modal" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <div class="profile-container">
                <div class="profile-header">
                    <div class="profile-avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <h2>${currentUser.name}</h2>
                    <p style="color: var(--text-light);">${currentUser.email}</p>
                </div>
                
                <div class="profile-stats">
                    <div class="stat-card">
                        <i class="fas fa-shopping-bag"></i>
                        <div class="stat-value">${userOrders.length}</div>
                        <div class="stat-label">Commandes</div>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-star"></i>
                        <div class="stat-value">${userPoints}</div>
                        <div class="stat-label">Points fidélité</div>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-heart"></i>
                        <div class="stat-value">${(JSON.parse(localStorage.getItem('favorites')) || []).filter(f => f.userId === currentUser.id).length}</div>
                        <div class="stat-label">Favoris</div>
                    </div>
                </div>
                
                <div class="profile-form">
                    <h3><i class="fas fa-user-edit"></i> Modifier mes informations</h3>
                    <form id="update-profile-form">
                        <div class="form-group">
                            <label><i class="fas fa-user"></i> Nom complet</label>
                            <input type="text" id="update-name" value="${currentUser.name}" required>
                        </div>
                        <div class="form-group">
                            <label><i class="fas fa-envelope"></i> Email</label>
                            <input type="email" id="update-email" value="${currentUser.email}" required>
                        </div>
                        <div class="form-group">
                            <label><i class="fas fa-lock"></i> Nouveau mot de passe (optionnel)</label>
                            <input type="password" id="update-password" placeholder="Laisser vide pour conserver">
                        </div>
                        <button type="submit" class="auth-btn">
                            <i class="fas fa-save"></i> Enregistrer les modifications
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(profileModal);
    
    // Handle profile update
    document.getElementById('update-profile-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newName = document.getElementById('update-name').value.trim();
        const newEmail = document.getElementById('update-email').value.trim().toLowerCase();
        const newPassword = document.getElementById('update-password').value;
        
        // Update user data
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex].name = newName;
            users[userIndex].email = newEmail;
            if (newPassword) {
                users[userIndex].password = btoa(newPassword);
            }
            localStorage.setItem('users', JSON.stringify(users));
        }
        
        // Update current user
        currentUser.name = newName;
        currentUser.email = newEmail;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Update UI
        updateAuthUI();
        profileModal.remove();
        showNotification('✅ Profil mis à jour avec succès!');
    });
}

// ===================================
// Logout function
// ===================================
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    updateCartCount(); // Reset cart display
    showNotification('✅ Déconnexion réussie! À bientôt!');
    
    // Reload page to refresh state
    setTimeout(() => {
        window.location.reload();
    }, 1500);
}

// ===================================
// Open authentication modal
// ===================================
function openAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

// ===================================
// Close modals
// ===================================
const closeAuthModal = document.getElementById('close-auth-modal');
if (closeAuthModal) {
    closeAuthModal.addEventListener('click', function() {
        document.getElementById('auth-modal').classList.remove('active');
    });
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const authModal = document.getElementById('auth-modal');
    if (e.target === authModal) {
        authModal.classList.remove('active');
    }
});

// ===================================
// Switch between login and register forms
// ===================================
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');

if (showRegisterLink) {
    showRegisterLink.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('login-form-container').style.display = 'none';
        document.getElementById('register-form-container').style.display = 'block';
    });
}

if (showLoginLink) {
    showLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('register-form-container').style.display = 'none';
        document.getElementById('login-form-container').style.display = 'block';
    });
}

// ===================================
// Handle Registration
// ===================================
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim().toLowerCase();
        const password = document.getElementById('register-password').value;
        const confirm = document.getElementById('register-confirm').value;
        
        // Validation
        if (name.length < 2) {
            showNotification('❌ Le nom doit contenir au moins 2 caractères', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('❌ Email invalide', 'error');
            return;
        }
        
        if (password.length < 6) {
            showNotification('❌ Le mot de passe doit contenir au moins 6 caractères', 'error');
            return;
        }
        
        if (password !== confirm) {
            showNotification('❌ Les mots de passe ne correspondent pas', 'error');
            return;
        }
        
        // Check if user already exists
        if (users.find(u => u.email === email)) {
            showNotification('❌ Cet email est déjà utilisé', 'error');
            return;
        }
        
        // Create new user
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: btoa(password), // Simple encoding (not secure for production!)
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Auto login
        currentUser = { id: newUser.id, name: newUser.name, email: newUser.email };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Close modal and update UI
        document.getElementById('auth-modal').classList.remove('active');
        updateAuthUI();
        
        showNotification(`🎉 Bienvenue ${name}! Votre compte a été créé avec succès!`);
        registerForm.reset();
    });
}

// ===================================
// Handle Login
// ===================================
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value.trim().toLowerCase();
        const password = document.getElementById('login-password').value;
        
        // Find user
        const user = users.find(u => u.email === email);
        
        if (!user) {
            showNotification('❌ Email ou mot de passe incorrect', 'error');
            return;
        }
        
        // Verify password
        if (atob(user.password) !== password) {
            showNotification('❌ Email ou mot de passe incorrect', 'error');
            return;
        }
        
        // Login successful
        currentUser = { id: user.id, name: user.name, email: user.email };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Close modal and update UI
        document.getElementById('auth-modal').classList.remove('active');
        updateAuthUI();
        
        showNotification(`✅ Bon retour ${user.name}!`);
        loginForm.reset();
    });
}

// ===================================
// Email validation
// ===================================
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===================================
// Update cart count in header
// ===================================
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
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
// Notification function
// ===================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#ff6b6b' : 'linear-gradient(135deg, #4caf50, #45a049)'};
        color: white;
        padding: 1.2rem 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
        max-width: 400px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===================================
// Initialize on page load
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    updateAuthUI();
    updateCartCount();
    
    // Update cart count every second (for synchronization)
    setInterval(updateCartCount, 1000);
});

// ===================================
// Console welcome message
// ===================================
console.log('%c🔐 Système d\'authentification activé!', 
    'font-size: 16px; font-weight: bold; color: #4caf50;');
console.log('%c💡 Créez un compte ou connectez-vous pour profiter de toutes les fonctionnalités', 
    'font-size: 13px; color: #666;');
