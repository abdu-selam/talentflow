<?php
require_once "../db/db.php";
require_once "../models/messages.php";

$db = new Database();
$con = $db->connect();

$messages = new Messages($con);

function msg_constructor($msg)
{
    $msg_data = $msg[0];

    return "[\"" . $msg_data["rname"] . "\",\"" . $msg_data["sname"] . "\"]";
}

header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$message_list = $messages->get_messages_newest_first();
while (true) {
    $event_msg = $messages->get_messages_newest_first();
    if (count($event_msg) > count($message_list)) {
        $msg = msg_constructor($event_msg);
        $message_list = $messages->get_messages_newest_first();
        
        echo "event: message\n";
        echo "data: $msg\n\n";
        
        ob_flush();
        flush();
    }
    sleep(1);
}

?>