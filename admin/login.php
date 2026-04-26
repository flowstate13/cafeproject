<?php
require_once __DIR__ . '/../models/Admin.php';

$admin = new Admin();
$error = '';

if ($admin->isLoggedIn()) {
    header('Location: index.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    if ($admin->login($username, $password)) {
        header('Location: index.php');
        exit;
    } else {
        $error = 'Nom d\'utilisateur ou mot de passe incorrect';
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Café Bohème</title>
    <link rel="stylesheet" href="../css/admin.css">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script>
        const savedTheme = localStorage.getItem('admin-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    </script>
    <style>
        .login-container {
            background: var(--bg-primary);
        }
        .theme-toggle-login {
            position: absolute;
            top: 20px;
            right: 20px;
            z-index: 10;
        }
    </style>
</head>
<body>
    <button class="theme-toggle theme-toggle-login" onclick="toggleTheme()">
        <i class="fas fa-moon"></i>
    </button>
    <div class="login-container">
        <div class="login-box">
            <h1><i class="fas fa-coffee"></i> Café Bohème</h1>
            <h2 style="text-align: center; margin-bottom: 20px;">Administration</h2>
            
            <?php if ($error): ?>
                <div class="error"><?php echo $error; ?></div>
            <?php endif; ?>
            
            <form method="POST">
                <div class="form-group">
                    <label>Nom d'utilisateur</label>
                    <input type="text" name="username" required autofocus>
                </div>
                <div class="form-group">
                    <label>Mot de passe</label>
                    <input type="password" name="password" required>
                </div>
                <button type="submit" class="btn-login">Se connecter</button>
            </form>
            
            <div class="back-link">
                <a href="../index.html">← Retour au site</a>
            </div>
            

        </div>
    </div>
    <script>
        function toggleTheme() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('admin-theme', newTheme);
            const btn = document.querySelector('.theme-toggle-login i');
            if (newTheme === 'dark') {
                btn.className = 'fas fa-sun';
            } else {
                btn.className = 'fas fa-moon';
            }
        }
        document.addEventListener('DOMContentLoaded', () => {
            const btn = document.querySelector('.theme-toggle-login i');
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                btn.className = 'fas fa-sun';
            }
        });
    </script>
</body>
</html>
