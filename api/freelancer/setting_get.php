<?php
require_once "../utils/responce.php";
require_once "../index.php";
require_once "../utils/cookie.php";


if (!isset($_SESSION["user"])) {
    $data = [
        "status" => "error",
        "message" => "Un Authenticated"
    ];

    response($data, 409);
    exit;
}

if (isset($_GET["uname"])) {
    $user = $users->get_user_by_username($_GET["uname"]);

    $data = [
        "status" => "success",
        "message" => !!$user
    ];

    response($data, 200);
    exit;
}

if (isset($_GET["sname"])) {
    $user = $users->get_user_by_username($_SESSION["user"]);
    $res = $users->update_uname($user["id"], $_GET["sname"]);

    $user = $users->get_user_by_username($_GET["sname"]);
    $_SESSION["user"] = $user["user_name"];
    if (isset($_COOKIE["user"])) {
        cookie_setter($user["user_name"]);
    }
    $data = [
        "status" => "success",
        "message" => $user["user_name"]
    ];

    response($data, 200);
    exit;
}

$user = $users->get_user_by_username($_SESSION["user"]);

if (!$user) {
    $data = [
        "status" => "error",
        "message" => "User not found"
    ];

    response($data, 401);
    exit;
}

$roll_data = null;
if ($user["roll"] == "client") {
    $roll_data = $clients->get_client_by_userid($user["id"]);
} else {
    $roll_data = $freelancers->get_freelancer_by_userid($user["id"]);
}

$data = [
    "status" => "success",
    "message" => [
        "first_name" => $user["first_name"],
        "last_name" => $user["last_name"],
        "user_name" => $user["user_name"],
        "address" => $roll_data["address"],
        "headline" => $roll_data["headline"],
    ]
];

response($data, 200);
exit;

?>