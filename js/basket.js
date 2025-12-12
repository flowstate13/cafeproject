const cartKey = 'cart';
let basket = [];

const formatPrice = n => `${n.toFixed(2)} TND`;
const badge = document.getElementById('cart-count');

const updateBadge = () => {
    const total = basket.reduce((s, item) => s + (item.quantity || 0), 0);
    if (badge) {
        badge.textContent = total;
        badge.style.display = total ? 'grid' : 'none';
    }
};

const persist = () => {
    localStorage.setItem(cartKey, JSON.stringify(basket));
    updateBadge();
};

const updateTotals = () => {
    const subtotal = basket.reduce((s, i) => s + i.price * i.quantity, 0);
    const tax = subtotal * 0.13;
    const total = subtotal + tax;
    document.getElementById('basket-subtotal').textContent = formatPrice(subtotal);
    document.getElementById('basket-tax').textContent = formatPrice(tax);
    document.getElementById('basket-total').textContent = formatPrice(total);
};

const renderBasket = () => {
    const container = document.getElementById('basket-list');
    if (!basket.length) {
        container.innerHTML = `<p class="text-muted">Votre panier est vide. Retournez au <a href="menu.html">menu</a> pour ajouter des produits.</p>`;
        updateTotals();
        persist();
        return;
    }

    container.innerHTML = '';
    basket.forEach(item => {
        const row = document.createElement('div');
        row.className = 'basket-item';
        row.innerHTML = `
            <img src="${item.image || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300'}" alt="${item.name}">
            <div>
                <strong>${item.name}</strong>
                <div class="text-muted">${item.note || ''}</div>
                <div class="text-muted">${formatPrice(item.price)}</div>
            </div>
            <div class="qty">
                <button aria-label="Diminuer" data-id="${item.id}" data-delta="-1">-</button>
                <span>${item.quantity}</span>
                <button aria-label="Augmenter" data-id="${item.id}" data-delta="1">+</button>
                <button aria-label="Supprimer" data-id="${item.id}" data-delta="remove" style="border:none;background:none;color:#c4473b;font-weight:700;cursor:pointer;">×</button>
            </div>
        `;
        container.appendChild(row);
    });
    updateTotals();
};

const changeQty = (id, delta) => {
    const item = basket.find(i => i.id === id);
    if (!item) return;
    if (delta === 'remove') {
        basket = basket.filter(i => i.id !== id);
    } else {
        item.quantity += Number(delta);
        if (item.quantity <= 0) basket = basket.filter(i => i.id !== id);
    }
    persist();
    renderBasket();
};

document.addEventListener('click', e => {
    const btn = e.target.closest('button[data-id]');
    if (!btn) return;
    const id = btn.dataset.id;
    const delta = btn.dataset.delta;
    changeQty(id, delta);
});

document.getElementById('checkout-btn').addEventListener('click', () => {
    if (!basket.length) return alert('Ajoutez des articles avant de commander.');
    document.getElementById('success-modal').classList.add('show');
    basket = [];
    persist();
    renderBasket();
});

document.getElementById('clear-btn').addEventListener('click', () => {
    if (!basket.length) return;
    basket = [];
    persist();
    renderBasket();
});

const initBasket = () => {
    basket = JSON.parse(localStorage.getItem(cartKey) || '[]');
    renderBasket();
    updateBadge();
};

const openInvoice = () => {
    if (!basket.length) return;
    const modal = document.getElementById('invoice-modal');
    const list = document.getElementById('invoice-items');
    const sub = basket.reduce((s, i) => s + i.price * i.quantity, 0);
    const tax = sub * 0.13;
    const total = sub + tax;

    list.innerHTML = basket.map(i => `<div style="display:flex;justify-content:space-between;margin:6px 0;"><span>${i.name} x${i.quantity}</span><strong>${formatPrice(i.price * i.quantity)}</strong></div>`).join('');
    document.getElementById('inv-sub').textContent = formatPrice(sub);
    document.getElementById('inv-tax').textContent = formatPrice(tax);
    document.getElementById('inv-total').textContent = formatPrice(total);

    modal.classList.add('show');
};

const closeInvoice = () => document.getElementById('invoice-modal').classList.remove('show');
const closeSuccess = () => document.getElementById('success-modal').classList.remove('show');

document.addEventListener('DOMContentLoaded', () => {
    initBasket();
    document.getElementById('invoice-btn').addEventListener('click', openInvoice);
    document.getElementById('close-invoice').addEventListener('click', closeInvoice);
    document.getElementById('invoice-modal').addEventListener('click', e => {
        if (e.target.id === 'invoice-modal') closeInvoice();
    });
    document.getElementById('print-invoice').addEventListener('click', () => window.print());
    document.getElementById('close-success').addEventListener('click', closeSuccess);
    document.getElementById('success-modal').addEventListener('click', e => {
        if (e.target.id === 'success-modal') closeSuccess();
    });
});

