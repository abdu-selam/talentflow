<?php
require_once __DIR__ . "/env.php";
require_once __DIR__ ."/../index.php";

function cookie_setter($value)
{
    global $env;
    global $users;

    setcookie("user", $value, [
        "expires" => time() + (60 * 60 * 24 * 15),
        "path" => "/",
        "secure" => $env["DEV_ENV"] == "production",
        "httponly" => true,
        "samesite" => "Strict"
    ]);

    $id = "user-" . explode("-", $value)[0];
    $users->set_cookie($id, $value);
}

function cookie_deleter($cookie_name)
{
    global $env;
    global $users;

    setcookie("user", "", [
        "expires" => time() - 100000,
        "path" => "/",
        "secure" => $env["DEV_ENV"] == "production",
        "httponly" => true,
        "samesite" => "Strict"
    ]);
    $id = "user-" . explode("-", $cookie_name)[0];
    $users->del_cookie($id);
}

function get_user_by_cookie($cookie_name){
    global $users;
    
    $id = "user-" . explode("-", $cookie_name)[0];
    $user = $users->get_user_by_id($id);
    return $user;
}

?>