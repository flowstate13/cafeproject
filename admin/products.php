<?php
require_once __DIR__ . '/../models/Admin.php';
require_once __DIR__ . '/../models/Product.php';

$admin = new Admin();
$admin->requireLogin();

$productModel = new Product();
$message = '';
$error = '';
$action = $_GET['action'] ?? 'list';
$editProduct = null;

// Handle form submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['delete'])) {
        if ($productModel->delete($_POST['id'])) {
            $message = 'Produit supprimé avec succès';
        } else {
            $error = 'Erreur lors de la suppression';
        }
    } elseif (isset($_POST['save'])) {
        $data = [
            'name' => $_POST['name'],
            'category' => $_POST['category'],
            'price' => $_POST['price'],
            'description' => $_POST['description'],
            'image' => $_POST['image'],
            'stock' => $_POST['stock'],
            'stock_min' => $_POST['stock_min'],
            'active' => isset($_POST['active']) ? 1 : 0
        ];
        
        if (!empty($_POST['id'])) {
            if ($productModel->update($_POST['id'], $data)) {
                $message = 'Produit mis à jour avec succès';
                $action = 'list';
            } else {
                $error = 'Erreur lors de la mise à jour';
            }
        } else {
            if ($productModel->create($data)) {
                $message = 'Produit créé avec succès';
                $action = 'list';
            } else {
                $error = 'Erreur lors de la création';
            }
        }
    }
}

// Load product for editing
if ($action === 'edit' && isset($_GET['id'])) {
    $editProduct = $productModel->getById($_GET['id']);
}

// Get all products
$products = $productModel->getAll();

$categories = ['boissons-chaudes', 'boissons-froides', 'patisseries', 'sandwiches'];
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Produits - Admin Café Bohème</title>
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
                <li><a href="products.php" class="active"><i class="fas fa-mug-hot"></i> Produits</a></li>
                <li><a href="stock.php"><i class="fas fa-boxes"></i> Stock</a></li>
            </ul>
            <div class="sidebar-footer">
                <button class="theme-toggle" onclick="toggleTheme()">
                    <i class="fas fa-moon"></i> Dark Mode
                </button>
            </div>
        </aside>
        
        <main class="main-content">
            <?php if ($message): ?>
                <div class="alert alert-success"><i class="fas fa-check-circle"></i> <?php echo $message; ?></div>
            <?php endif; ?>
            <?php if ($error): ?>
                <div class="alert alert-error"><i class="fas fa-exclamation-circle"></i> <?php echo $error; ?></div>
            <?php endif; ?>
            
            <?php if ($action === 'add' || $action === 'edit'): ?>
                <!-- Add/Edit Form -->
                <div class="header-bar">
                    <h1><?php echo $action === 'edit' ? 'Modifier' : 'Ajouter'; ?> un produit</h1>
                    <div class="header-actions">
                        <a href="products.php" class="btn btn-secondary"><i class="fas fa-arrow-left"></i> Retour</a>
                    </div>
                </div>
                
                <div class="panel">
                    <form method="POST">
                        <input type="hidden" name="id" value="<?php echo $editProduct['id'] ?? ''; ?>">
                        
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Nom du produit</label>
                                <input type="text" name="name" required 
                                       value="<?php echo htmlspecialchars($editProduct['name'] ?? ''); ?>">
                            </div>
                            
                            <div class="form-group">
                                <label>Catégorie</label>
                                <select name="category" required>
                                    <?php foreach ($categories as $cat): ?>
                                        <option value="<?php echo $cat; ?>" 
                                            <?php echo ($editProduct['category'] ?? '') === $cat ? 'selected' : ''; ?>>
                                            <?php echo ucfirst(str_replace('-', ' ', $cat)); ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label>Prix (TND)</label>
                                <input type="number" name="price" step="0.01" min="0" required
                                       value="<?php echo $editProduct['price'] ?? ''; ?>">
                            </div>
                            
                            <div class="form-group">
                                <label>Image URL</label>
                                <input type="url" name="image" 
                                       value="<?php echo htmlspecialchars($editProduct['image'] ?? ''); ?>">
                            </div>
                            
                            <div class="form-group">
                                <label>Stock initial</label>
                                <input type="number" name="stock" min="0" required
                                       value="<?php echo $editProduct['stock'] ?? '0'; ?>">
                            </div>
                            
                            <div class="form-group">
                                <label>Stock minimum (alerte)</label>
                                <input type="number" name="stock_min" min="0" required
                                       value="<?php echo $editProduct['stock_min'] ?? '5'; ?>">
                            </div>
                            
                            <div class="form-group full-width">
                                <label>Description</label>
                                <textarea name="description"><?php echo htmlspecialchars($editProduct['description'] ?? ''); ?></textarea>
                            </div>
                            
                            <?php if ($action === 'edit'): ?>
                            <div class="form-group">
                                <label>
                                    <input type="checkbox" name="active" <?php echo ($editProduct['active'] ?? 1) ? 'checked' : ''; ?>>
                                    Produit actif (visible sur le site)
                                </label>
                            </div>
                            <?php endif; ?>
                        </div>
                        
                        <div class="form-actions">
                            <button type="submit" name="save" class="btn">
                                <i class="fas fa-save"></i> Enregistrer
                            </button>
                            <a href="products.php" class="btn btn-secondary">Annuler</a>
                        </div>
                    </form>
                </div>
                
            <?php else: ?>
                <!-- Product List -->
                <div class="header-bar">
                    <h1>Gestion des Produits</h1>
                    <div class="header-actions">
                        <a href="products.php?action=add" class="btn"><i class="fas fa-plus"></i> Ajouter</a>
                    </div>
                </div>
                
                <div class="panel">
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Nom</th>
                                <th>Catégorie</th>
                                <th>Prix</th>
                                <th>Stock</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($products as $product): ?>
                            <tr>
                                <td>
                                    <img src="<?php echo htmlspecialchars($product['image']); ?>" 
                                         alt="<?php echo htmlspecialchars($product['name']); ?>"
                                         class="product-image">
                                </td>
                                <td><?php echo htmlspecialchars($product['name']); ?></td>
                                <td><?php echo ucfirst(str_replace('-', ' ', $product['category'])); ?></td>
                                <td><?php echo number_format($product['price'], 2); ?> TND</td>
                                <td <?php echo $product['stock'] <= $product['stock_min'] ? 'class="stock-low"' : ''; ?>>
                                    <?php echo $product['stock']; ?>
                                </td>
                                <td>
                                    <span class="status <?php echo $product['active'] ? 'status-active' : 'status-inactive'; ?>">
                                        <?php echo $product['active'] ? 'Actif' : 'Inactif'; ?>
                                    </span>
                                </td>
                                <td>
                                    <a href="products.php?action=edit&id=<?php echo $product['id']; ?>" 
                                       class="btn btn-sm" style="background: #3498db;">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                    <form method="POST" style="display: inline;" 
                                          onsubmit="return confirm('Supprimer ce produit ?');">
                                        <input type="hidden" name="id" value="<?php echo $product['id']; ?>">
                                        <button type="submit" name="delete" class="btn btn-sm btn-danger">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </form>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            <?php endif; ?>
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
