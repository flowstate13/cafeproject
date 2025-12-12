const products = [
    { id: 'p1', name: 'Espresso', category: 'boissons-chaudes', price: 3.5, description: 'Café court et intense.', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop' },
    { id: 'p2', name: 'Cappuccino', category: 'boissons-chaudes', price: 4.5, description: 'Mousse de lait généreuse.', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop' },
    { id: 'p3', name: 'Latte vanille', category: 'boissons-chaudes', price: 5, description: 'Note douce et sucrée.', image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&h=300&fit=crop' },
    { id: 'p4', name: 'Ice latte', category: 'boissons-froides', price: 5.5, description: 'Version glacée rafraîchissante.', image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop' },
    { id: 'p5', name: 'Frappuccino caramel', category: 'boissons-froides', price: 6, description: 'Crémeux et gourmand.', image: 'https://images.unsplash.com/photo-1562155955-1cb2d73488d7?w=400&h=300&fit=crop' },
    { id: 'p6', name: 'Croissant beurre', category: 'patisseries', price: 2.5, description: 'Feuilleté croustillant.', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop' },
    { id: 'p7', name: 'Cheesecake', category: 'patisseries', price: 5, description: 'Crémeux et citronné.', image: 'https://images.unsplash.com/photo-1702925614886-50ad13c88d3f?q=80&w=789&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'p8', name: 'Sandwich poulet', category: 'sandwiches', price: 7, description: 'Poulet grillé et crudités.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop' }
];

let cart = [];
let activeCategory = 'all';
const grid = document.getElementById('menu-grid');
const badge = document.getElementById('cart-count');
const cartKey = 'cart';
let sortMode = 'default';

const formatPrice = n => `${n.toFixed(2)} TND`;

const updateBadge = () => {
    const total = cart.reduce((s, item) => s + (item.quantity || 0), 0);
    if (badge) {
        badge.textContent = total;
        badge.style.display = total ? 'grid' : 'none';
    }
};

const saveCart = () => {
    localStorage.setItem(cartKey, JSON.stringify(cart));
    updateBadge();
};

const toast = msg => {
    const el = document.createElement('div');
    el.textContent = msg;
    el.style.cssText = 'position:fixed;bottom:20px;right:20px;padding:10px 14px;border-radius:8px;background:#7b4c2c;color:#fff;box-shadow:var(--shadow);z-index:50;';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1800);
};

const addToCart = product => {
    const existing = cart.find(i => i.id === product.id);
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    saveCart();
    toast('Ajouté au panier');
};

const buildCard = product => {
    const card = document.createElement('div');
    card.className = 'panel product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="text-muted">${product.description}</p>
        <div class="product-footer">
            <span class="price">${formatPrice(product.price)}</span>
            <button class="btn" data-id="${product.id}"><i class="fas fa-cart-plus"></i> Ajouter</button>
        </div>
    `;
    return card;
};

const sortProducts = list => {
    if (sortMode === 'price-asc') return [...list].sort((a,b) => a.price - b.price);
    if (sortMode === 'price-desc') return [...list].sort((a,b) => b.price - a.price);
    return list;
};

const renderProducts = () => {
    const filtered = activeCategory === 'all'
        ? products
        : products.filter(p => p.category === activeCategory);
    const items = sortProducts(filtered);
    grid.innerHTML = '';
    items.forEach(p => grid.appendChild(buildCard(p)));
};

document.addEventListener('click', e => {
    const addBtn = e.target.closest('button[data-id]');
    if (addBtn) {
        const product = products.find(p => p.id === addBtn.dataset.id);
        if (product) addToCart(product);
    }
    const chip = e.target.closest('.chip');
    if (chip) {
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeCategory = chip.dataset.category;
        renderProducts();
    }
});

const sortSelect = document.getElementById('sort-select');
if (sortSelect) {
    sortSelect.addEventListener('change', e => {
        sortMode = e.target.value;
        renderProducts();
    });
}

const handleCustomCoffee = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const [sizeLabel, basePrice] = data.get('size').split('|');
    let price = parseFloat(basePrice);

    const milk = data.get('milk');
    if (milk === 'Amande' || milk === 'Avoine') price += 0.4;

    const syrup = data.get('syrup');
    if (syrup && syrup !== 'Sans sirop') price += 0.3;

    const extras = data.getAll('extras');
    extras.forEach(extra => {
        if (extra === 'Shot espresso') price += 0.8;
        else if (extra === 'Chantilly') price += 0.3;
        else price += 0.2;
    });

    const name = `Café ${sizeLabel.toLowerCase()} personnalisé`;
    const note = `${data.get('roast')} • ${milk} • ${syrup || 'Sans sirop'}${extras.length ? ' • ' + extras.join(', ') : ''}`;
    addToCart({ id: `custom-${Date.now()}`, name, price, description: '', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop', note });
    e.target.reset();
};

const init = () => {
    cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    updateBadge();
    renderProducts();
    const form = document.getElementById('custom-coffee-form');
    if (form) form.addEventListener('submit', handleCustomCoffee);
};

document.addEventListener('DOMContentLoaded', init);

