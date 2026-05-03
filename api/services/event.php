<?php
require_once "../db/db.php";
require_once "../models/messages.php";
require_once "./event_controller.php";

$db = new Database();
$con = $db->connect();

$messages = new Messages($con);

function msg_constructor()
{
    global $messages;
    $msg = $messages->get_messages_newest_first();
    $msg_data = $msg[0];

    return "[\"" . $msg_data["rname"] . "\",\"" . $msg_data["sname"] . "\"]";
}

function read_constructor()
{
    global $messages;
    $msg = $messages->get_readed_newest_first();
    $msg_data = $msg[0];


    return "[\"" . $msg_data["id"] . "\",\"" . $msg_data["sender_id"] . "\"]";
}

header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$message_list = read_event_count();
$message_list_read = read_event_read();

while (true) {
    $event_msg = read_event_count();
    if ($event_msg > $message_list) {
        $msg = msg_constructor();
        $message_list = read_event_count();
        
        echo "event: message\n";
        echo "data: $msg\n\n";
        
        ob_flush();
        flush();
    }

    $event_msg_read = read_event_read();
    if ($event_msg_read > $message_list_read) {
        $msg = read_constructor();
        $message_list_read = read_event_read();
        
        echo "event: read\n";
        echo "data: $msg\n\n";
        
        ob_flush();
        flush();
    }
    sleep(1);
}

?>