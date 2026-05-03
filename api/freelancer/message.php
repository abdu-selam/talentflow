<?php
require_once "../index.php";
require_once "../utils/responce.php";
require_once "../services/message_services.php";
require_once "../utils/validation.php";
require_once "../services/event_controller.php";

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

    if (isset($_GET["mark"])) {
        $msg = $messages->get_message_by_id($_GET["mark"]);
        if (!$user) {
            $data = [
                "status" => "error",
                "message" => "Message id required"
            ];

            response($data, 409);
            exit;
        }

        $res = $messages->mark_read($msg["id"]);
        if ($res) {
            write_event_read();
            $data = [
                "status" => "success",
                "message" => $msg["sender_id"]
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

    $messages_list = $messages->get_message_by_userid($user["id"]);
    if (!isset($_GET["uname"])) {
        $data = [
            "status" => "success",
            "message" => messageUsers($messages_list, $user["id"])
        ];

        response($data, 200);
        exit;
    }

    $other = $users->get_user_by_username($_GET["uname"]);
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
        "message" => messageUsers($messages_list, $user["id"]),
        "single" => $message,
    ];

    response($data, 200);
    exit;

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
        $msg_btwn = $messages->get_message_by_recieverid($user["id"]);
        $count = count(
            array_filter($msg_btwn, function ($a) {
                return $a["status"] == "unread";
            })
        );
        write_event_count();

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