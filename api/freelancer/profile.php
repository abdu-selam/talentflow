<?php
require_once "../index.php";
require_once "../utils/responce.php";
require_once "../services/freelancer_profile_services.php";

$method = $_SERVER["REQUEST_METHOD"];
if (!isset($_SESSION["user"])) {
    $data = [
        "status" => "error",
        "message" => "Un Authenticated"
    ];

    response($data, 409);
    exit;
}

if ($method == "GET") {
    $needed_user = "";
    if (isset($_GET["uname"])) {
        $needed_user = $users->get_user_by_username($_GET["uname"]);
        if (!$needed_user) {
            $needed_user = $users->get_user_by_username($_SESSION["user"]);
        } else if ($needed_user["roll"] == "client") {
            $needed_user = $users->get_user_by_username($_SESSION["user"]);
        }
    } else {
        $needed_user = $users->get_user_by_username($_SESSION["user"]);
        if ($needed_user["roll"] == "client") {
            $data = [
                "status" => "error",
                "message" => "Un Authorized"
            ];

            response($data, 401);
            exit;
        }
    }

    $data = [
        "status" => "success",
        "message" => profileDataConstructor($needed_user)
    ];

    response($data, 200);
    exit;
} else if ($method == "PUT") {
    $user = $users->get_user_by_username($_SESSION["user"]);
    if ($$user["roll"] == "client") {
        $data = [
            "status" => "error",
            "message" => "Un Authorized"
        ];

        response($data, 401);
        exit;
    }

    $type = isset($_GET["type"]) ? $_GET["type"] : "none";
    if ($type == "pp") {

    } else if ($type == "about") {

    } else if ($type == "skill") {

    } else if ($type == "resume") {

    }
}

?>