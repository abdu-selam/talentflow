<?php
require_once "../utils/responce.php";
require_once "../index.php";

$method = $_SERVER["REQUEST_METHOD"];
if ($method === "GET") {

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

    $user_name = isset($_SESSION["user"]) ? $_SESSION["user"] : $_COOKIE["user"];
    $user = $users->get_user_by_username($user_name);
    if (!$user) {
        $data = [
            "status" => "error",
            "message" => "User not found"
        ];

        response($data, 401);
        exit;
    }

    $_SESSION["user"] = $user_name;

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