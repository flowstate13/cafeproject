const updateCartBubble = () => {
    const badge = document.getElementById('cart-count');
    if (!badge) return;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const total = cart.reduce((s, i) => s + (i.quantity || 0), 0);
    badge.textContent = total;
    badge.style.display = total ? 'grid' : 'none';
};

document.addEventListener('DOMContentLoaded', () => {
    updateCartBubble();
});
