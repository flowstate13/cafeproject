// ===================================
// Favorites/Wishlist System
// ===================================

// Toggle favorite
function toggleFavorite(productId, event) {
    if (event) {
        event.stopPropagation();
    }
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        showNotification('⚠️ Connectez-vous pour ajouter des favoris', 'error');
        document.getElementById('auth-modal').classList.add('active');
        return;
    }
    
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteIndex = favorites.findIndex(f => f.userId === currentUser.id && f.productId === productId);
    
    if (favoriteIndex > -1) {
        // Remove from favorites
        favorites.splice(favoriteIndex, 1);
        showNotification('💔 Retiré des favoris');
    } else {
        // Add to favorites
        favorites.push({
            userId: currentUser.id,
            productId: productId,
            addedAt: new Date().toISOString()
        });
        showNotification('❤️ Ajouté aux favoris!');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteButtons();
}

// Check if product is favorite
function isFavorite(productId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return false;
    
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.some(f => f.userId === currentUser.id && f.productId === productId);
}

// Update favorite button states
function updateFavoriteButtons() {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const productId = parseInt(btn.dataset.productId);
        const icon = btn.querySelector('i');
        
        if (isFavorite(productId)) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            btn.classList.add('favorited');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            btn.classList.remove('favorited');
        }
    });
}

// View all favorites
function viewFavorites() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        showNotification('⚠️ Connectez-vous pour voir vos favoris', 'error');
        return;
    }
    
    window.location.href = 'menu.html#favorites';
}

// Initialize favorites on page load
document.addEventListener('DOMContentLoaded', function() {
    updateFavoriteButtons();
});
