<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ . "/../utils/env.php";

class Mail
{
    private $mail;

    public function __construct()
    {
        global $env;
        $this->mail = new PHPMailer(true);

        $this->mail->isSMTP();
        $this->mail->Host = 'smtp.gmail.com';
        $this->mail->SMTPAuth = true;
        $this->mail->Username = $env["EMAIL_USER_NAME"];
        $this->mail->Password = $env["EMAIL_PASSWORD"];
        $this->mail->Port = 465;
        $this->mail->SMTPDebug = 0;
        $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;

        $this->mail->setFrom($env["EMAIL_USER_NAME"], 'TalentFlow');
    }

    public function send($to, $subject, $html, $text)
    {
        try {
            $this->mail->addAddress($to);

            $this->mail->isHTML(true);
            $this->mail->Subject = $subject;
            $this->mail->Body = $html;
            $this->mail->AltBody = $text;

            $this->mail->send();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

}

?>