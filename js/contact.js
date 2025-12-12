const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const success = document.getElementById('success-message');
    const badge = document.getElementById('cart-count');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const msgField = document.getElementById('message');

    if (badge) {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const total = cart.reduce((s, i) => s + (i.quantity || 0), 0);
        badge.textContent = total;
        badge.style.display = total ? 'grid' : 'none';
    }

    if (!form) return;
    if (success) success.classList.remove('active');

    form.addEventListener('submit', e => {
        e.preventDefault();
        let valid = true;

        if (!nameField.value.trim()) {
            document.getElementById('name-error').textContent = 'Nom requis';
            valid = false;
        } else document.getElementById('name-error').textContent = '';

        if (!emailOk(emailField.value.trim())) {
            document.getElementById('email-error').textContent = 'Email invalide';
            valid = false;
        } else document.getElementById('email-error').textContent = '';

        if (msgField.value.trim().length < 5) {
            document.getElementById('message-error').textContent = 'Message trop court';
            valid = false;
        } else document.getElementById('message-error').textContent = '';

        if (!valid) return;

        form.reset();
        if (success) {
            success.classList.add('active');
            success.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => success.classList.remove('active'), 3500);
        }
    });
});

