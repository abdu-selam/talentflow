<?php
require_once "../index.php";

function messageUsers($messagesIn, $current)
{
    global $users;
    global $messages;

    $data = [];
    usort($messagesIn, function ($a, $b) {
        return strtotime($b["date"]) - strtotime($a["date"]);
    });

    $order = 1;
    foreach ($messagesIn as $message) {
        $other = null;
        if ($current == $message["sender_id"]) {
            $other = $users->get_user_by_id($message["reciever_id"]);
        } else {
            $other = $users->get_user_by_id($message["sender_id"]);
        }

        if (!array_key_exists($other["id"], $data)) {
            $msg_btwn = $messages->get_message_by_recieverid($current);

            $count = 0;
            for ($i=0; $i < count($msg_btwn); $i++) { 
                $curr = $msg_btwn[$i];
                if ($curr["sender_id"] == $other["id"] && $curr["status"] == "unread") {
                    $count++;
                }
            }

            $data[$other["id"]] = [
                "fname" => $other["first_name"],
                "lname" => $other["last_name"],
                "profile" => $other["profile"],
                "messages" => $message["message"],
                "sender" => $message["sender_id"] == $current,
                "order" => $order,
                "unread" => $count
            ];

            $order++;
        }
    }

    return $data;
}

function messageConstructor($current, $other)
{
    global $messages;
    global $users;

    $all_messages = $messages->get_message_btwn_two($current, $other);
    $curr_user = $users->get_user_by_id($current);
    $oth_user = $users->get_user_by_id($other);

    usort($all_messages, function ($a, $b) {
        return strtotime($a["date"]) - strtotime($b["date"]);
    });

    $data = [
        "other" => [
            "fname" => $oth_user["first_name"],
            "lname" => $oth_user["last_name"],
            "uname" => $oth_user["user_name"],
            "roll" => $oth_user["roll"],
            "profile" => $oth_user["profile"],
            "id" => $oth_user["id"],
        ],
        "messages" => []
    ];

    foreach ($all_messages as $msg) {
        $date = explode(" ", $msg["date"])[0];
        if (!array_key_exists($date, $data['messages'])) {
            $data['messages'][$date] = [];
        }

        $data['messages'][$date][] = [
            "id" => $msg["id"],
            "message" => json_decode($msg["message"], true),
            "status" => $msg["status"],
            "type" => $msg["type"],
            "date" => $msg["date"],
            "sender" => $msg["sender_id"] == $curr_user["id"],
        ];
    }

    return $data;


}

?>

