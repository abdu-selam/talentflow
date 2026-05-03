<?php
require_once "../index.php";
require_once "../utils/responce.php";
require_once "../utils/validation.php";
require_once "../utils/email.php";

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

if ($user["token_created"]) {
    $diff = (time() - strtotime($user["token_created"])) / 60;
    if ($diff < 2) {
        $data = [
            "status" => "error",
            "message" => 2 - $diff
        ];

        response($data, 409);
        exit;
    }
}

$token = create_token();
$users->crete_token($user["id"], $token);

send_email_verification($token, $user["email"], $user["first_name"], $user["last_name"]);

$data = [
    "status" => "success",
    "message" => "email verification token has been sent"
];

response($data, 200);
exit;

?>