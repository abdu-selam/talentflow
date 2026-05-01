<?php
require_once "../index.php";

function profileDataConstructorClient($user)
{
    global $clients;
    global $jobs;

    $client = $clients->get_client_by_userid($user["id"]);

    $jobs_list = $jobs->get_jobs_by_clientid($client['id']);
    $jobs_res = [];
    foreach ($jobs_list as $each) {
        $data = [
            "title" => $each["title"],
            "description" => $each["description"],
            "category" => $each["category"],
        ];
        array_push($jobs_res, $each);
        if (count($jobs_res) > 5) {
            break;
        }
    }


    $data = [
        "fname" => $user["first_name"],
        "lname" => $user["last_name"],
        "address" => $client["address"],
        "headline" => $client["headline"],
        "email" => $user["email"],
        "profile" => $user["profile"],
        "about" => json_decode($client["about"], true),
        "posted_jobs" => $jobs_res
    ];

    return $data;
}

?>