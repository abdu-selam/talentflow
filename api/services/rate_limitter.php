<?php

$file =  '../rate_limitter/rate_limit.json';

function read_json()
{
    global $file;
    $open = fopen($file, 'r');
    $json = fread($open, filesize($file));
    fclose($open);

    $data = json_decode($json, true);
    return $data;
}


function write_limit($data)
{
    global $file;

    $open = fopen($file, 'w');
    fwrite($open, json_encode($data, JSON_PRETTY_PRINT));
    fclose($open);
}

function limitter($ip) {
    $data = read_json();
    if (!array_key_exists($ip, $data)) {
        $data = [
            $ip => []
        ];
        $data[$ip][] = time();
        write_limit($data);
        return true;
    }

    $diff = time() - $data[$ip][0];
    $limit = 60 * 5;
    if (count($data[$ip]) == 5) {
        if ($diff < $limit) {
            return false;
        }

        $newData = array_slice($data[$ip], 1);
        $data[$ip] = $newData;
        return true;
    }

    if ($diff > $limit) {
        $data[$ip] = [];
        $data[$ip][] = time();
        write_limit($data);
        return true;
    }

    $data[$ip][] = time();
    write_limit($data);
    return true;
}

?>