<?php
require_once __DIR__ ."/env.php";

function cookie_setter($value)
{
    global $env;

    setcookie("user", $value, [
        "expires" => time() + (60 * 60 * 24 * 15),
        "path" => "/",
        "secure" => $env["DEV_ENV"] == "production",
        "httponly" => true,
        "samesite" => "Strict"
    ]);
}

?>