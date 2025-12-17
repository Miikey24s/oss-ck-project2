<?php
// Minimal PHP API for Project 2 (compatible with PHP 5.6).
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch ($path) {
    case '/':
        respond(['message' => 'Project 2 PHP backend']);
        break;
    case '/api/health':
        respond(['status' => 'ok']);
        break;
    case '/api/greeting':
        respond(['message' => 'Hello from PHP backend!']);
        break;
    case '/api/db-check':
        handleDbCheck();
        break;
    default:
        respond(['error' => 'Not found'], 404);
}

function respond($data, $status = 200)
{
    http_response_code($status);
    echo json_encode($data);
}

function handleDbCheck()
{
    $host = getenv('DB_HOST') ?: 'localhost';
    $port = getenv('DB_PORT') ?: '3306';
    $user = getenv('DB_USER') ?: 'root';
    $password = getenv('DB_PASSWORD') ?: '';
    $dbName = getenv('DB_NAME') ?: 'project2';

    $dsn = "mysql:host={$host};port={$port};dbname={$dbName};charset=utf8mb4";

    try {
        $pdo = new PDO($dsn, $user, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);

        $stmt = $pdo->query('SELECT NOW() AS now');
        $row = $stmt ? $stmt->fetch() : null;

        $nowValue = isset($row['now']) ? $row['now'] : null;

        respond(array(
            'ok' => true,
            'now' => $nowValue,
        ));
    } catch (PDOException $e) {
        respond(array(
            'ok' => false,
            'error' => $e->getMessage(),
        ), 500);
    }
}
