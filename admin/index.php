<?php
require_once __DIR__ . '/../models/Admin.php';
require_once __DIR__ . '/../models/Product.php';

$admin = new Admin();
$admin->requireLogin();

$productModel = new Product();
$stats = $productModel->getStats();
$lowStock = $productModel->getLowStock();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Admin Café Bohème</title>
    <link rel="stylesheet" href="../css/admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script>
        // Check for saved theme preference
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
                <li><a href="index.php" class="active"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                <li><a href="products.php"><i class="fas fa-mug-hot"></i> Produits</a></li>
                <li><a href="stock.php"><i class="fas fa-boxes"></i> Stock</a></li>
            </ul>
            <div class="sidebar-footer">
                <button class="theme-toggle" onclick="toggleTheme()">
                    <i class="fas fa-moon"></i> Dark Mode
                </button>
            </div>
        </aside>
        
        <main class="main-content">
            <div class="header-bar">
                <h1>Dashboard</h1>
                <div class="header-actions">
                    <span><i class="fas fa-user"></i> <?php echo htmlspecialchars($_SESSION['admin_username']); ?></span>
                    <a href="logout.php" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Déconnexion</a>
                </div>
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>Total Produits</h3>
                    <div class="stat-value"><?php echo $stats['total']; ?></div>
                </div>
                <div class="stat-card">
                    <h3>Produits Actifs</h3>
                    <div class="stat-value"><?php echo $stats['active']; ?></div>
                </div>
                <div class="stat-card <?php echo $stats['low_stock'] > 0 ? 'warning' : ''; ?>">
                    <h3>Stock Faible</h3>
                    <div class="stat-value"><?php echo $stats['low_stock']; ?></div>
                </div>
            </div>
            
            <?php if (count($lowStock) > 0): ?>
            <div class="panel">
                <h2><i class="fas fa-exclamation-triangle"></i> Alertes Stock Faible</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Produit</th>
                            <th>Catégorie</th>
                            <th>Stock Actuel</th>
                            <th>Stock Minimum</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($lowStock as $product): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($product['name']); ?></td>
                            <td><?php echo htmlspecialchars($product['category']); ?></td>
                            <td class="stock-low"><?php echo $product['stock']; ?></td>
                            <td><?php echo $product['stock_min']; ?></td>
                            <td><a href="stock.php?product=<?php echo $product['id']; ?>" class="btn btn-sm">Gérer</a></td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
            <?php endif; ?>
            
            <div class="panel">
                <h2><i class="fas fa-compass"></i> Navigation Rapide</h2>
                <div class="form-actions">
                    <a href="products.php?action=add" class="btn"><i class="fas fa-plus"></i> Ajouter un produit</a>
                    <a href="products.php" class="btn btn-secondary"><i class="fas fa-list"></i> Voir tous les produits</a>
                    <a href="../index.html" target="_blank" class="btn btn-secondary"><i class="fas fa-external-link-alt"></i> Voir le site</a>
                </div>
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
            
            // Update button text
            const btn = document.querySelector('.theme-toggle');
            if (newTheme === 'dark') {
                btn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
            } else {
                btn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
            }
        }
        
        // Set initial button text
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
