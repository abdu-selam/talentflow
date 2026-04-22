<?php
require_once __DIR__ . "/db/db.php";
require_once __DIR__ . "/models/applications.php";
require_once __DIR__ . "/models/client.php";
require_once __DIR__ . "/models/freelancers.php";
require_once __DIR__ . "/models/jobs.php";
require_once __DIR__ . "/models/messages.php";
require_once __DIR__ . "/models/portfolios.php";
require_once __DIR__ . "/models/ratings.php";
require_once __DIR__ . "/models/skills.php";
require_once __DIR__ . "/models/users.php";

$db = new Database();
$con = $db->connect();

$applications = new Applications($con);
$clients = new Clients($con);
$freelancers = new Freelancers($con);
$jobs = new Jobs($con);
$messages = new Messages($con);
$portfolios = new Portfolios($con);
$ratings = new Ratings($con);
$skills = new Skills($con);
$users = new Users($con);

?>