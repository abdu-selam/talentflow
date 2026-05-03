<?php
require_once "../index.php";
require_once "../utils/responce.php";
require_once "../utils/validation.php";


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

if (!$user) {
    $data = [
        "status" => "error",
        "message" => "Un Authenticated"
    ];

    response($data, 401);
    exit;
}

$method = $_SERVER["REQUEST_METHOD"];
if ($method == "GET") {
    if (isset($_GET["type"])) {
        $message_list = $messages->get_message_by_userid($user["id"]);
        $data_send = [];
        $checked = [];
        foreach ($message_list as $item) {
            if ($item["sender_id"] == $user["id"]) {
                $user_curr = $users->get_user_by_id($item["reciever_id"]);
                if (in_array($user_curr["user_name"], $checked)) {
                    continue;
                }
                $data_send[] = [
                    "fname" => $user_curr["first_name"],
                    "lname" => $user_curr["last_name"],
                    "uname" => $user_curr["user_name"],
                    "proile" => $user_curr["profile"],
                ];

                $checked[] = $user_curr["user_name"];
            }
        }


        $data = [
            "status" => "success",
            "message" => $data_send,
        ];

        response($data, 200);
        exit;
    }

    $ratings_list = $ratings->get_ratings_by_giver_id($user["id"]);

    $data = [
        "status" => "success",
        "message" => $ratings_list,
        "system" => $ratings->get_system_ratings_by_giver_id($user["id"])
    ];

    response($data, 200);
    exit;
} elseif ($method == "POST") {
    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    if ($data["txt"] == "") {
        $data = [
            "status" => "error",
            "message" => "Text required"
        ];

        response($data, 401);
        exit;
    }

    if ($data["amount"] < 0 || $data["amount"] > 5) {
        $data = [
            "status" => "error",
            "message" => "Invalid amount"
        ];

        response($data, 401);
        exit;
    }

    $user_curr = "system";
    if ($data["uname"] != "system") {
        $user_curr = $users->get_user_by_username($data["uname"]);
    }

    if (!$user_curr) {
        $data = [
            "status" => "error",
            "message" => "Invalid User name"
        ];

        response($data, 401);
        exit;
    }

    if ($user["user_name"] == $data["uname"]) {
        $data = [
            "status" => "error",
            "message" => "You can't be the giver also reciever"
        ];

        response($data, 401);
        exit;
    }

    $reciever_id = $user_curr == "system" ? null : $user_curr["id"];
    $reciever_type = $user_curr == "system" ? "system" : $user_curr["roll"];

    do {
        $id = idGenerator("rate");
        $rate = $ratings->get_rating_by_id($id);
    } while ($rate);

    $res = $ratings->create($id, $user["id"], $reciever_id, $reciever_type, $data["amount"], $data["txt"]);

    if ($res) {
        $data = [
            "status" => "success",
            "message" => "rating has been added"
        ];

        response($data, 200);
        exit;
    }

    $data = [
        "status" => "error",
        "message" => "Internal server Error"
    ];

    response($data, 500);
    exit;
}

?>