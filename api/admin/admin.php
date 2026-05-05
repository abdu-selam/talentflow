<?php
require_once "../index.php";
require_once "../utils/responce.php";
require_once "../services/admin_services.php";

if (!isset($_SESSION["user"])) {
    $data = [
        "status" => "error",
        "message" => "Un Authenticated"
    ];

    response($data, 409);
    exit;
}

$uname = $_SESSION["user"];
$user = $users->get_user_by_username($uname);

if (!$user || $user["roll"] != "admin") {
    $data = [
        "status" => "error",
        "message" => "Un Authenticated"
    ];

    response($data, 401);
    exit;
}

$data = [
    "status" => "success",
    "message" => [
        "users_stat" => users_stat(),
        "latest_users" => array_slice(newest_users(), 0, 8),
        "jobs_stat" => jobs_stat(),
        "latest_jobs" => array_slice(newest_jobs(), 0, 4),
        "latest_feedbacks" => array_slice(newest_feedbacks(), 0, 4),
    ]
];

response($data, 200);
exit;


?>