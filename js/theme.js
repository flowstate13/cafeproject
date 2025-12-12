const updateCartBubble = () => {
    const badge = document.getElementById('cart-count');
    if (!badge) return;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const total = cart.reduce((s, i) => s + (i.quantity || 0), 0);
    badge.textContent = total;
    badge.style.display = total ? 'grid' : 'none';
};

const setTheme = mode => {
    document.body.classList.toggle('dark', mode === 'dark');
    localStorage.setItem('theme', mode);
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        const icon = btn.querySelector('i');
        icon.classList.toggle('fa-sun', mode === 'dark');
        icon.classList.toggle('fa-moon', mode !== 'dark');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
    updateCartBubble();

    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.addEventListener('click', () => {
            const current = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }
});
