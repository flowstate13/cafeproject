document.addEventListener('DOMContentLoaded', () => {
    // Cart badge functionality
    const badge = document.getElementById('cart-count');
    if (badge) {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const total = cart.reduce((s, item) => s + (item.quantity || 0), 0);
        badge.textContent = total;
        badge.style.display = total ? 'grid' : 'none';
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // CTA hover effects
    const cta = document.querySelector('.cta');
    if (cta) {
        cta.addEventListener('mouseenter', () => {
            cta.style.transform = 'scale(1.05)';
            cta.style.boxShadow = '0 10px 24px rgba(0,0,0,0.15)';
        });
        cta.addEventListener('mouseleave', () => {
            cta.style.transform = 'scale(1)';
            cta.style.boxShadow = '';
        });
    }
});
