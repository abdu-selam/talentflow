<?php
require_once "../index.php";
require_once "../utils/responce.php";
require_once "../utils/validation.php";
require_once "../utils/email.php";

if (!isset($_GET["email"])) {
    $data = [
        "status" => "error",
        "message" => "email required"
    ];

    response($data, 401);
    exit;
}

$user = $users->get_user_by_email($_GET["email"]);

if (!$user) {
    $data = [
        "status" => "error",
        "message" => "User not found"
    ];

    response($data, 401);
    exit;
}

if ($user["isVerified"] == 0) {
    $data = [
        "status" => "error",
        "message" => "Please verify your email first"
    ];

    response($data, 403);
    exit;
}

if ($user["password_token_created"]) {
    $diff = (time() - strtotime($user["password_token_created"])) / 60;
    if ($diff < 720) {
        $data = [
            "status" => "error",
            "message" => 720 - $diff
        ];

        response($data, 409);
        exit;
    }
}

$token = create_token();
$users->crete_passcode($user["id"], $token);

send_password_requist($token, $user["email"], $user["first_name"], $user["last_name"]);

$data = [
    "status" => "success",
    "message" => "password reset token has been sent"
];

response($data, 200);
exit;
?>