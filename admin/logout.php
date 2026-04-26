<?php
require_once __DIR__ . '/../models/Admin.php';

$admin = new Admin();
$admin->logout();

header('Location: login.php');
exit;
