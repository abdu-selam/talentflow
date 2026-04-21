<?php
require_once "./db/db.php";
require_once "./models/applications.php";
require_once "./models/client.php";
require_once "./models/freelancers.php";
require_once "./models/jobs.php";
require_once "./models/messages.php";
require_once "./models/portfolios.php";
require_once "./models/ratings.php";
require_once "./models/skills.php";
require_once "./models/users.php";

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