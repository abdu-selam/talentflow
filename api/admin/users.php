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

if (isset($_GET["delete"])) {
    $user = $users->get_user_by_username($_GET["delete"]);
    if (!$user) {

        $data = [
            "status" => "error",
            "message" => "User not found"
        ];

        response($data, 404);
        exit;
    }

    $res = $users->delete($user["id"]);
    if ($res) {
        $data = [
            "status" => "success",
            "message" => "user deleted"
        ];

        response($data, 200);
        exit;
    }

    $data = [
        "status" => "error",
        "message" => "Internal Server Error"
    ];

    response($data, 500);
    exit;
}

$res = [];
$all_users = newest_users();
$type = $_GET["type"] == "freelancer" ? "freelancer" : "client";

foreach ($all_users as $user) {
    if ($user["roll"] == $type) {
        $res[] = $user;
    }
}

$data = [
    "status" => "success",
    "message" => $res
];

response($data, 200);
exit;


?>