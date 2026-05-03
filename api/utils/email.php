<?php
require_once __DIR__ . "/../config/mail.php";
require_once __DIR__ . "/email_templates.php";

$mail = new Mail();

function send_email_verification($token, $email, $fname, $lname)
{
    global $mail;

    $template = prepare_token_template($token, $fname, $lname);
    $text = prepare_token_text($token, $fname, $lname);

    $res = $mail->send($email, "Email verification mail.", $template, $text);
    return $res;
}
?>