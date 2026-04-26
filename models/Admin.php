<?php
require_once __DIR__ . '/../config/database.php';

class Admin {
    private $pdo;
    
    public function __construct() {
        $this->pdo = getDBConnection();
    }
    
    // Authenticate admin
    public function login($username, $password) {
        $stmt = $this->pdo->prepare("SELECT * FROM admins WHERE username = ?");
        $stmt->execute([sanitize($username)]);
        $admin = $stmt->fetch();
        
        if ($admin && password_verify($password, $admin['password_hash'])) {
            $_SESSION['admin_id'] = $admin['id'];
            $_SESSION['admin_username'] = $admin['username'];
            return true;
        }
        return false;
    }
    
    // Check if logged in
    public function isLoggedIn() {
        return isset($_SESSION['admin_id']);
    }
    
    // Logout
    public function logout() {
        unset($_SESSION['admin_id']);
        unset($_SESSION['admin_username']);
        session_destroy();
    }
    
    // Require login
    public function requireLogin() {
        if (!$this->isLoggedIn()) {
            header('Location: login.php');
            exit;
        }
    }
}
