<?php
require_once '../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable("../");
$dotenv->load();

$env = [
    "DB_HOST_NAME" => $_ENV["DB_HOST_NAME"],
    "DB_NAME" => $_ENV["DB_NAME"],
    "DB_USER_NAME" => $_ENV["DB_USER_NAME"],
    "DB_PASSWORD" => $_ENV["DB_PASSWORD"]
];
?>