<?php
require_once "../index.php";
require_once "../utils/responce.php";
require_once "../utils/validation.php";

$json = file_get_contents("php://input");
$data = json_decode($json, true);

if (!$data["email"] || !$data["password"] || !$data["otp"]) {
    $data = [
        "status" => "error",
        "message" => "Invalid requiest"
    ];

    response($data, 401);
    exit;
}

if (!passwordValidator($data["password"])) {
    $data = [
        "status" => "error",
        "message" => "Invalid requiest"
    ];

    response($data, 401);
    exit;
}

$user = $users->get_user_by_email($data["email"]);

if (!$user) {
    $data = [
        "status" => "error",
        "message" => "User does not exist"
    ];

    response($data, 409);
    exit;
}

$diff = (time() - strtotime($user["password_token_created"])) / 60;
if ($diff > 30) {
    $data = [
        "status" => "error",
        "message" => "Timeout"
    ];

    response($data, 403);
    exit;
}

$code = $data["otp"];
if ($code != $user["password_token"]) {
    $data = [
        "status" => "error",
        "message" => "Invalid Cridentials"
    ];

    response($data, 401);
    exit;
}

$_SESSION["user"] = $user["user_name"];
if ($data["remember"]) {
    cookie_setter(cookieTokenGenerator($user["id"]));
}

$hashed = password_hash($data["password"], PASSWORD_DEFAULT);
$users->update_password($user["id"], $hashed);

$roll = $user["roll"];

$prefix = $roll === "freelancer" ? "free" : "clie";
$users->passcode_verify($user["id"]);

$data = [
    "status" => "success",
    "message" => [
        "roll" => $roll
    ]
];

response($data, 200);
exit;


?>