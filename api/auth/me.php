<?php
require_once "../utils/responce.php";
require_once "../utils/cookie.php";
require_once "../index.php";
require_once "../utils/validation.php";

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

    if ($user["isVerified"] == 0) {
        $data = [
            "status" => "error",
            "message" => "User not found"
        ];

        response($data, 401);
        exit;
    }

    $_SESSION["user"] = $user["user_name"];
    if (isset($_COOKIE["user"])) {
        cookie_setter(cookieTokenGenerator($user["id"]));
    }

    $data = [
        "status" => "success",
        "message" => [
            "roll" => $user["roll"],
            "profile" => $user["profile"],
            "user_name" => $user["user_name"],
            "email" => $user["email"],
        ]
    ];

    response($data, 200);
    exit;
}

?>