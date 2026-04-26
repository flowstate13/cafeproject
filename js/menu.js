// Fetch products from database API
let products = [];
let isLoading = true;

const fetchProducts = async (category = 'all') => {
    try {
        const response = await fetch(`api/products.php?action=list&category=${category}`);
        const data = await response.json();
        if (data.success) {
            products = data.data.map(p => ({
                id: 'p' + p.id,
                dbId: p.id,
                name: p.name,
                category: p.category,
                price: parseFloat(p.price),
                description: p.description,
                image: p.image,
                stock: p.stock
            }));
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        grid.innerHTML = '<p style="text-align:center;color:#888;">Erreur de chargement du menu.</p>';
    } finally {
        isLoading = false;
    }
};

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
    if (isLoading) {
        grid.innerHTML = '<p style="text-align:center;color:#888;"><i class="fas fa-spinner fa-spin"></i> Chargement...</p>';
        return;
    }
    const filtered = activeCategory === 'all'
        ? products
        : products.filter(p => p.category === activeCategory);
    const items = sortProducts(filtered);
    grid.innerHTML = '';
    if (items.length === 0) {
        grid.innerHTML = '<p style="text-align:center;color:#888;">Aucun produit disponible.</p>';
        return;
    }
    items.forEach(p => grid.appendChild(buildCard(p)));
};

document.addEventListener('click', async e => {
    const addBtn = e.target.closest('button[data-id]');
    if (addBtn) {
        const product = products.find(p => p.id === addBtn.dataset.id);
        if (product) addToCart(product);
    }
    const chip = e.target.closest('.chip');
    if (chip && chip.tagName === 'BUTTON') {
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeCategory = chip.dataset.category;
        await fetchProducts(activeCategory);
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

const init = async () => {
    cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    updateBadge();
    await fetchProducts();
    renderProducts();
    const form = document.getElementById('custom-coffee-form');
    if (form) form.addEventListener('submit', handleCustomCoffee);
};

document.addEventListener('DOMContentLoaded', init);

