<?php
require_once "../utils/responce.php";
require_once "../index.php";
require_once "../utils/validation.php";

if (!isset($_SESSION["user"])) {
    if (!isset($_COOKIE["user"])) {


        $data = [
            "status" => "error",
            "message" => "Un Authenticated"
        ];

        response($data, 401);
        exit;
    }
}

$user = null;
if (isset($_SESSION["user"])) {
    $user = $users->get_user_by_username($_SESSION["user"]);
} else {
    $user = get_user_by_cookie($_COOKIE["user"]);
}

if (!$user) {
    $data = [
        "status" => "error",
        "message" => "User not found"
    ];

    response($data, 401);
    exit;
}

$json = file_get_contents("php://input");
$data = json_decode($json, true);

if (!password_verify($data["old"], $user["password"])) {
    $data = [
        "status" => "error",
        "message" => "Invalid Cridentials 1"
    ];

    response($data, 401);
    exit;
}

if ($data["new"] != $data["confirm"]) {
    $data = [
        "status" => "error",
        "message" => "Invalid Cridentials 2"
    ];

    response($data, 401);
    exit;
}

if (!passwordValidator($data["new"])) {
    $data = [
        "status" => "error",
        "message" => "Invalid Password Format"
    ];

    response($data, 409);
    exit;
}

$hashed = password_hash($data["new"], PASSWORD_DEFAULT);
$res = $users->update_password($user["id"], $hashed);
if ($res) {
    $data = [
        "status" => "success",
        "message" => "password updated"
    ];

    response($data, 200);
    exit;
}
$data = [
    "status" => "error",
    "message" => "Internal server error"
];

response($data, 500);
exit;

?>