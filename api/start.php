<?php
require_once __DIR__ . "/index.php";
require_once __DIR__ ."/utils/validation.php";

$usersData = [
    ["Abel", "abel", "abel@mail.com", "Abc@1234", "freelancer"],
    ["John", "john", "john@mail.com", "Abc@1234", "freelancer"],
    ["Mike", "mike", "mike@mail.com", "Abc@1234", "freelancer"],
    ["Noah", "noah", "noah@mail.com", "Abc@1234", "freelancer"],
    ["Sam", "sam", "sam@mail.com", "Abc@1234", "freelancer"],
    ["Alex", "alex", "alex@mail.com", "Abc@1234", "freelancer"],
    ["Dan", "dan", "dan@mail.com", "Abc@1234", "freelancer"],
    ["Chris", "chris", "chris@mail.com", "Abc@1234", "freelancer"],
    ["Ben", "ben", "ben@mail.com", "Abc@1234", "freelancer"],
    ["Tom", "tom", "tom@mail.com", "Abc@1234", "freelancer"],
    ["Leo", "leo", "leo@mail.com", "Abc@1234", "freelancer"],
    ["Max", "max", "max@mail.com", "Abc@1234", "freelancer"],

    ["Sara", "sara", "sara@mail.com", "Abc@1234", "client"],
    ["Liya", "liya", "liya@mail.com", "Abc@1234", "client"],
    ["Eden", "eden", "eden@mail.com", "Abc@1234", "client"],
    ["Ruth", "ruth", "ruth@mail.com", "Abc@1234", "client"],
    ["Zara", "zara", "zara@mail.com", "Abc@1234", "client"],

    ["Admin", "Root", "admin@mail.com", "Admin@123", "admin"]
];

foreach ($usersData as $u) {
    $first = $u[0];
    $last = $u[1];
    $email = $u[2];
    $roll = $u[4];

    $user = $users->get_user_by_email($email);
    if ($user) {
        continue;
    }

    $password = password_hash($u[3], PASSWORD_DEFAULT);

    do {
        $id = idGenerator("user");
        $user = $users->get_user_by_id($id);
    } while ($user);

    $prefix = ($roll === "freelancer") ? "free" : ($roll === "client" ? "clie" : "admn");

    do {
        $fid = idGenerator($prefix);
        $user_data = "";
        if ($roll === "freelancer") {
            $user_data = $freelancers->get_freelancer_by_id($fid);
        } else if ($roll === "client") {
            $user_data = $clients->get_client_by_id($fid);
        } else {
            break;
        }
    } while ($user_data);

    do {
        $uname = unameGenerator();
        $user = $users->get_user_by_username($uname);
    } while ($user);

    $users->create($id, $first, $last, $uname, $email, $password, $roll);
    if ($roll === "freelancer") {
        $freelancers->create($fid, $id);
    } else if ($roll === "client") {
        $clients->create($fid, $id);
    }
}
?>