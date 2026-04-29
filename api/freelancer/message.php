<?php
require_once "../index.php";
require_once "../utils/responce.php";
require_once "../services/message_services.php";
require_once "../utils/validation.php";

$method = $_SERVER["REQUEST_METHOD"];
if ($method == "GET") {
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

        response($data, 409);
        exit;
    }

    if (isset($_GET["id"])) {
        $other = $users->get_user_by_id($_GET["id"]);
        if (!$user) {
            $data = [
                "status" => "error",
                "message" => "Un Authenticated"
            ];

            response($data, 409);
            exit;
        }

        $message = messageConstructor($user["id"], $other["id"]);
        $data = [
            "status" => "success",
            "message" => $message
        ];

        response($data, 200);
        exit;
    }

    if (!isset($_GET["uname"])) {
        $messages_list = $messages->get_message_by_userid($user["id"]);
        $data = [
            "status" => "success",
            "message" => messageUsers($messages_list, $user["id"])
        ];

        response($data, 200);
        exit;
    }

} elseif ($method == "POST") {
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

        response($data, 409);
        exit;
    }

    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    do {
        $id = idGenerator("msg");
        $msg = $messages->get_message_by_id($id);
    } while ($msg);

    $res = $messages->create($id, $user["id"], $data["reciever"], json_encode($data["message"]));
    if ($res) {
        $msg = $messages->get_message_by_id($id);
        $msg_btwn = $messages->get_message_by_sender_and_reciever_id($user["id"], $data["reciever"]);
        $count = count(
            array_filter($msg_btwn, function ($a) {
                return $a["status"] == "unread";
            })
        );

        $data = [
            "status" => "success",
            "message" => [
                "id" => $msg["id"],
                "message" => json_decode($msg["message"], true),
                "status" => $msg["status"],
                "type" => $msg["type"],
                "date" => $msg["date"],
                "sender" => $msg["sender_id"] == $user["id"],
                "count" => $count
            ]
        ];

        response($data, 200);
        exit;
    }

    $data = [
        "status" => "success",
        "message" => "Internal server error"
    ];

    response($data, 500);
    exit;
}

?>