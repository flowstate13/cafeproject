<?php
require_once __DIR__ . '/../models/Admin.php';
require_once __DIR__ . '/../models/Product.php';

$admin = new Admin();
$admin->requireLogin();

$productModel = new Product();
$message = '';
$error = '';

// Handle stock update
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_stock'])) {
    $productId = $_POST['product_id'];
    $quantity = intval($_POST['quantity']);
    $reason = $_POST['reason'] ?? '';
    
    if ($productModel->updateStock($productId, $quantity, $reason)) {
        $message = 'Stock mis à jour avec succès';
    } else {
        $error = 'Erreur lors de la mise à jour du stock';
    }
}

// Get selected product for quick edit
$selectedProduct = null;
if (isset($_GET['product'])) {
    $selectedProduct = $productModel->getById($_GET['product']);
}

// Get all products and low stock
$products = $productModel->getAll();
$lowStock = $productModel->getLowStock();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stock - Admin Café Bohème</title>
    <link rel="stylesheet" href="../css/admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script>
        const savedTheme = localStorage.getItem('admin-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    </script>
</head>
<body>
    <div class="admin-layout">
        <aside class="sidebar">
            <div class="sidebar-header">
                <h2><i class="fas fa-coffee"></i> Café Bohème</h2>
                <p>Panel Admin</p>
            </div>
            <ul class="nav-menu">
                <li><a href="index.php"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                <li><a href="products.php"><i class="fas fa-mug-hot"></i> Produits</a></li>
                <li><a href="stock.php" class="active"><i class="fas fa-boxes"></i> Stock</a></li>
            </ul>
            <div class="sidebar-footer">
                <button class="theme-toggle" onclick="toggleTheme()">
                    <i class="fas fa-moon"></i> Dark Mode
                </button>
            </div>
        </aside>
        
        <main class="main-content">
            <div class="header-bar">
                <h1>Gestion des Stocks</h1>
            </div>
            
            <?php if ($message): ?>
                <div class="alert alert-success"><i class="fas fa-check-circle"></i> <?php echo $message; ?></div>
            <?php endif; ?>
            <?php if ($error): ?>
                <div class="alert alert-error"><i class="fas fa-exclamation-circle"></i> <?php echo $error; ?></div>
            <?php endif; ?>
            
            <!-- Quick Stock Update -->
            <div class="panel">
                <h2><i class="fas fa-sync-alt"></i> Mise à jour rapide du stock</h2>
                <form method="POST">
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Produit</label>
                            <select name="product_id" required>
                                <option value="">Choisir un produit...</option>
                                <?php foreach ($products as $p): ?>
                                    <option value="<?php echo $p['id']; ?>" 
                                            <?php echo ($selectedProduct['id'] ?? '') == $p['id'] ? 'selected' : ''; ?>>
                                        <?php echo htmlspecialchars($p['name']); ?> 
                                        (Stock: <?php echo $p['stock']; ?>)
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Quantité (+/-)</label>
                            <input type="number" name="quantity" required 
                                   placeholder="Ex: +10 ou -5">
                        </div>
                        <div class="form-group">
                            <label>Raison (optionnel)</label>
                            <input type="text" name="reason" 
                                   placeholder="Ex: Réception livraison, Ventes...">
                        </div>
                        <button type="submit" name="update_stock" class="btn btn-success">
                            <i class="fas fa-save"></i> Mettre à jour
                        </button>
                    </div>
                </form>
            </div>
            
            <!-- Stock Overview -->
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>Stock Total</h3>
                    <div class="stat-value"><?php echo array_sum(array_column($products, 'stock')); ?></div>
                </div>
                <div class="stat-card">
                    <h3>Produits en alerte</h3>
                    <div class="stat-value" style="color: #e74c3c;"><?php echo count($lowStock); ?></div>
                </div>
                <div class="stat-card">
                    <h3>Références</h3>
                    <div class="stat-value"><?php echo count($products); ?></div>
                </div>
            </div>
            
            <!-- Stock Table -->
            <div class="panel">
                <h2><i class="fas fa-list"></i> Inventaire complet</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Produit</th>
                            <th>Catégorie</th>
                            <th>Stock Actuel</th>
                            <th>Stock Min</th>
                            <th>Niveau</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($products as $product): 
                            $ratio = $product['stock_min'] > 0 ? $product['stock'] / $product['stock_min'] : 1;
                            if ($ratio <= 0.5) {
                                $stockClass = 'stock-low';
                                $barClass = 'stock-low';
                            } elseif ($ratio <= 1) {
                                $stockClass = 'stock-medium';
                                $barClass = 'stock-medium';
                            } else {
                                $stockClass = 'stock-good';
                                $barClass = 'stock-good';
                            }
                            $percent = min(100, ($ratio * 50));
                        ?>
                        <tr>
                            <td><?php echo htmlspecialchars($product['name']); ?></td>
                            <td><?php echo ucfirst(str_replace('-', ' ', $product['category'])); ?></td>
                            <td <?php echo $ratio <= 0.5 ? 'class="stock-critical"' : ''; ?>>
                                <?php echo $product['stock']; ?>
                            </td>
                            <td><?php echo $product['stock_min']; ?></td>
                            <td>
                                <div class="stock-level">
                                    <div class="stock-bar">
                                        <div class="stock-bar-fill <?php echo $barClass; ?>" 
                                             style="width: <?php echo $percent; ?>%"></div>
                                    </div>
                                    <span><?php echo round($ratio * 100); ?>%</span>
                                </div>
                            </td>
                            <td>
                                <a href="stock.php?product=<?php echo $product['id']; ?>" class="btn btn-sm">
                                    <i class="fas fa-edit"></i> Modifier
                                </a>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </main>
    </div>
    <script>
        function toggleTheme() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('admin-theme', newTheme);
            const btn = document.querySelector('.theme-toggle');
            if (newTheme === 'dark') {
                btn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
            } else {
                btn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
            }
        }
        document.addEventListener('DOMContentLoaded', () => {
            const btn = document.querySelector('.theme-toggle');
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                btn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
            }
        });
    </script>
</body>
</html>
