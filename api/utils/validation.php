<?php
function nameValidator($name)
{
    $regEx = "/^[A-Za-z]{3,}$/";

    return !!preg_match($regEx, $name);
}

function emailValidator($email)
{
    $regEx = "/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/";

    return !!preg_match($regEx, $email);
}

function passwordValidator($password)
{
    $regEx = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}/";

    return !!preg_match($regEx, $password);
}

function idGenerator($type)
{
    $chars = "abcdefghijklmnopqrstuvwxyz1234567890";
    $len = strlen($chars);

    $id = $type . "-";
    for ($i=0; $i < 6; $i++) { 
        $id .= $chars[random_int(0, $len-1)];
    }

    return $id;
}

function unameGenerator()
{
    $chars = "abcdefghijklmnopqrstuvwxyz1234567890";
    $len = strlen($chars);

    $uname = "";
    for ($i=0; $i < 8; $i++) {
        $uname .= $chars[random_int(0, $len-1)];
    }

    return $uname;
}

?>