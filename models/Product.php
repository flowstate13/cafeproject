<?php
require_once __DIR__ . '/../config/database.php';

class Product {
    private $pdo;
    
    public function __construct() {
        $this->pdo = getDBConnection();
    }
    
    // Get all products
    public function getAll($activeOnly = false) {
        $sql = "SELECT * FROM products";
        if ($activeOnly) {
            $sql .= " WHERE active = 1";
        }
        $sql .= " ORDER BY category, name";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll();
    }
    
    // Get products by category
    public function getByCategory($category) {
        $stmt = $this->pdo->prepare("SELECT * FROM products WHERE category = ? AND active = 1 ORDER BY name");
        $stmt->execute([$category]);
        return $stmt->fetchAll();
    }
    
    // Get single product
    public function getById($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM products WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }
    
    // Create product
    public function create($data) {
        $stmt = $this->pdo->prepare("INSERT INTO products (name, category, price, description, image, stock, stock_min) VALUES (?, ?, ?, ?, ?, ?, ?)");
        return $stmt->execute([
            sanitize($data['name']),
            sanitize($data['category']),
            floatval($data['price']),
            sanitize($data['description']),
            sanitize($data['image']),
            intval($data['stock']),
            intval($data['stock_min'])
        ]);
    }
    
    // Update product
    public function update($id, $data) {
        $stmt = $this->pdo->prepare("UPDATE products SET name = ?, category = ?, price = ?, description = ?, image = ?, stock = ?, stock_min = ?, active = ? WHERE id = ?");
        return $stmt->execute([
            sanitize($data['name']),
            sanitize($data['category']),
            floatval($data['price']),
            sanitize($data['description']),
            sanitize($data['image']),
            intval($data['stock']),
            intval($data['stock_min']),
            intval($data['active']),
            $id
        ]);
    }
    
    // Delete product
    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM products WHERE id = ?");
        return $stmt->execute([$id]);
    }
    
    // Update stock
    public function updateStock($id, $quantity, $reason = '') {
        $this->pdo->beginTransaction();
        try {
            // Update product stock
            $stmt = $this->pdo->prepare("UPDATE products SET stock = stock + ? WHERE id = ?");
            $stmt->execute([$quantity, $id]);
            
            // Log stock change
            $stmt = $this->pdo->prepare("INSERT INTO stock_history (product_id, quantity_change, reason) VALUES (?, ?, ?)");
            $stmt->execute([$id, $quantity, sanitize($reason)]);
            
            $this->pdo->commit();
            return true;
        } catch (Exception $e) {
            $this->pdo->rollBack();
            return false;
        }
    }
    
    // Get low stock products
    public function getLowStock() {
        $stmt = $this->pdo->query("SELECT * FROM products WHERE stock <= stock_min AND active = 1 ORDER BY stock ASC");
        return $stmt->fetchAll();
    }
    
    // Get stock history for a product
    public function getStockHistory($productId) {
        $stmt = $this->pdo->prepare("SELECT * FROM stock_history WHERE product_id = ? ORDER BY created_at DESC");
        $stmt->execute([$productId]);
        return $stmt->fetchAll();
    }
    
    // Get product stats
    public function getStats() {
        $stats = [];
        
        $stmt = $this->pdo->query("SELECT COUNT(*) as total FROM products");
        $stats['total'] = $stmt->fetch()['total'];
        
        $stmt = $this->pdo->query("SELECT COUNT(*) as active FROM products WHERE active = 1");
        $stats['active'] = $stmt->fetch()['active'];
        
        $stmt = $this->pdo->query("SELECT COUNT(*) as low_stock FROM products WHERE stock <= stock_min AND active = 1");
        $stats['low_stock'] = $stmt->fetch()['low_stock'];
        
        return $stats;
    }
}
