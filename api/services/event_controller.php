<?php

$file =  '../event_json/event_count.json';

function read_json()
{
    global $file;
    $open = fopen($file, 'r');
    $json = fread($open, filesize($file));
    fclose($open);

    $data = json_decode($json, true);
    return $data;
}

function read_event_count()
{
    $data = read_json();

    return $data['count'];
}

function write_event_count()
{
    global $file;
    $count = read_event_count();
    $data = read_json();

    $data['count'] = $count + 1;

    $open = fopen($file, 'w');
    fwrite($open, json_encode($data, JSON_PRETTY_PRINT));
    fclose($open);
}

function read_event_read()
{
    $data = read_json();

    return $data['read'];
}

function write_event_read()
{
    global $file;
    $count = read_event_read();
    $data = read_json();

    $data['read'] = $count + 1;

    $open = fopen($file, 'w');
    fwrite($open, json_encode($data, JSON_PRETTY_PRINT));
    fclose($open);
}
?>
