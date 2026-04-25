<?php
require_once "../utils/responce.php";
require_once "../index.php";

$method = $_SERVER["REQUEST_METHOD"];
if ($method === "GET") {

    if (!isset($_SESSION["user"])) {
        $data = [
            "status" => "error",
            "message" => "Un Authenticated"
        ];

        response($data, 401);
        exit;
    }

    $user_name = $_SESSION["user"];
    $user = $users->get_user_by_username($user_name);
    if (!$user) {
        $data = [
            "status" => "error",
            "message" => "User not found"
        ];

        response($data, 401);
        exit;
    }

    $data = [
        "status" => "success",
        "message" => [
            "roll" => $user["roll"]
        ]
    ];

    response($data, 200);
    exit;
}

?>