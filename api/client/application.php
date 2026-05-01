<?php
require_once "../index.php";
require_once "../utils/responce.php";

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
$active_proposals = $applications->get_applys_by_client_id($client["id"]);

$data = [
    "status" => "success",
    "message" => $active_proposals
];

response($data, 200);
exit;

?>

