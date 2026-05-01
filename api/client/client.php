<?php
require_once "../index.php";
require_once "../utils/responce.php";
require_once "../services/client_services.php";

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

if (!$user || $user["roll"] != "client") {
    $data = [
        "status" => "error",
        "message" => "Un Authenticated"
    ];

    response($data, 401);
    exit;
}

$client = $clients->get_client_by_userid($user["id"]);

$data = [
    "status" => "error",
    "message" => [
        "proposal_stat" => proposal_stat($client["id"]),
        "active_proposals" => array_slice(active_proposals($client["id"]), 0, 4),
        "jobs_stat" => jobs_stat($client["id"]),
        "active_jobs" => array_slice(active_jobs($client["id"]), 0, 4)
    ]
];

response($data, 200);
exit;

?>