<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Product.php';

header('Content-Type: application/json');

$productModel = new Product();

$action = $_GET['action'] ?? 'list';

try {
    switch ($action) {
        case 'list':
            $category = $_GET['category'] ?? null;
            if ($category && $category !== 'all') {
                $products = $productModel->getByCategory($category);
            } else {
                $products = $productModel->getAll(true);
            }
            echo json_encode(['success' => true, 'data' => $products]);
            break;
            
        case 'get':
            $id = $_GET['id'] ?? null;
            if ($id) {
                $product = $productModel->getById($id);
                if ($product) {
                    echo json_encode(['success' => true, 'data' => $product]);
                } else {
                    http_response_code(404);
                    echo json_encode(['success' => false, 'error' => 'Produit non trouvé']);
                }
            } else {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'ID manquant']);
            }
            break;
            
        default:
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Action invalide']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
