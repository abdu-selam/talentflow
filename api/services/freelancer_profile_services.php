<?php
require_once "../index.php";
require_once __DIR__ . "/freelancer_service.php";

function skillConstructor($type, $fid)
{
    global $skills;

    $skills_list = $skills->get_skills_by_skill_type_and_freelancer_id($type, $fid);

    $data = array_map(function ($skill) {
        return [
            "id" => $skill["id"],
            "name" => $skill["name"],
            "level" => $skill["level"],
            "skill_type" => $skill["skill_type"],
        ];
    }, $skills_list);

    return $data;
}

function profileDataConstructor($user)
{
    global $freelancers;

    $freelancer = $freelancers->get_freelancer_by_userid($user["id"]);

    $data = [
        "name" => $user["first_name"] . " " . $user["last_name"],
        "address" => $freelancer["address"],
        "headline" => $freelancer["headline"],
        "resume" => $freelancer["resume"],
        "email" => $user["email"],
        "profile" => $user["profile"],
        "about" => json_decode($freelancer["about"], true),
        "hard_skills" => skillConstructor("hard", $freelancer["id"]),
        "soft_skills" => skillConstructor("soft", $freelancer["id"]),
        "sample_portfolio" => array_slice(portfolio_constructor($freelancer["id"]), 0, 4),
    ];

    return $data;
}

?>