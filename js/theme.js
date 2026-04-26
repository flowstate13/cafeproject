const updateCartBubble = () => {
    const badge = document.getElementById('cart-count');
    if (!badge) return;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const total = cart.reduce((s, i) => s + (i.quantity || 0), 0);
    badge.textContent = total;
    badge.style.display = total ? 'grid' : 'none';
};

// Dark Mode Toggle
const initDarkMode = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        const icon = toggleBtn.querySelector('i');
        if (savedTheme === 'dark') {
            icon.className = 'fas fa-sun';
        }
        
        toggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            if (newTheme === 'dark') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    updateCartBubble();
    initDarkMode();
});
