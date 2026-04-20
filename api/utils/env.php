<?php
require_once '../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable("../");
$dotenv->load();

$env = [
    "DATA_TRY" => $_ENV["DATA_TRY"],
];

?>