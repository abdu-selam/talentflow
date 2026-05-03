<?php
require_once "../index.php";
require_once "../utils/responce.php";
require_once "../utils/validation.php";

if (!isset($_SESSION["user"])) {
    $data = [
        "status" => "error",
        "message" => "Un Authenticated"
    ];

    response($data, 401);
    exit;
}

$user = $users->get_user_by_username($_SESSION["user"]);

if (!$user) {
    $data = [
        "status" => "error",
        "message" => "Un Authenticated"
    ];

    response($data, 401);
    exit;
}

if ($user["isVerified"] == 1) {
    $data = [
        "status" => "success",
        "message" => [
            "roll" => $user["roll"]
        ]
    ];

    response($data, 200);
    exit;
}

$diff = (time() - strtotime($user["created_at"])) / 60;
if ($diff > 30) {
    $users->delete($user["id"]);
    $data = [
        "status" => "error",
        "message" => "Invalid Cridentials"
    ];

    response($data, 401);
    exit;
}

$json = file_get_contents("php://input");
$data = json_decode($json, true);

$code = $data["token"];
if ($code != $user["token"]) {
    $data = [
        "status" => "error",
        "message" => "Invalid Cridentials"
    ];

    response($data, 403);
    exit;
}

$roll = $user["roll"];

$prefix = $roll === "freelancer" ? "free" : "clie";
$users->verify($user["id"]);

do {
    $fid = idGenerator($prefix);
    $user_data = "";
    if ($roll === "freelancer") {
        $user_data = $freelancers->get_freelancer_by_id($fid);
    } else {
        $user_data = $clients->get_client_by_id($fid);
    }
} while ($user_data);

if ($roll == "freelancer") {
    $freelancers->create($fid, $user["id"]);
} else {
    $clients->create($fid, $user["id"]);
}

$data = [
    "status" => "success",
    "message" => [
        "roll" => $roll
    ]
];

response($data, 200);
exit;


?>