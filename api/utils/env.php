<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . "/../");
$dotenv->load();

$env = [
    "DB_HOST_NAME" => $_ENV["DB_HOST_NAME"],
    "DB_NAME" => $_ENV["DB_NAME"],
    "DB_USER_NAME" => $_ENV["DB_USER_NAME"],
    "DB_PASSWORD" => $_ENV["DB_PASSWORD"],
    "DEV_ENV" => $_ENV["DEV_ENV"]
];
?>