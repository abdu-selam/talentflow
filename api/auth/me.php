<?php
require_once "../utils/responce.php";
require_once "../index.php";

$method = $_SERVER["REQUEST_METHOD"];
if ($method === "GET") {
    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    $user_name = $_SESSION["user"];
    if (!isset($user_name)) {
        $data = [
            "status" => "error",
            "message" => "Un Authenticated"
        ];

        response($data, 409);
        exit;
    }

    $user = $users->get_user_by_username($user_name);
    if (!$user) {
        $data = [
            "status" => "error",
            "message" => "Un Authenticated"
        ];

        response($data, 409);
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