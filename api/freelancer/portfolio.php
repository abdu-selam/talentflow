<?php
require_once "../utils/responce.php";
require_once "../index.php";

if (!isset($_SESSION["user"])) {
    $data = [
        "status" => "error",
        "message" => "Un Authenticated"
    ];

    response($data, 409);
    exit;
}

$method = $_SERVER["REQUEST_METHOD"];
if ($method == "GET") {
    $user = isset($_GET["user"]) ? $_GET["user"] : $_SESSION["user"];
    $user_data = $users->get_user_by_username($user);
    if (!$user_data) {
        $data = [
            "status" => "error",
            "message" => "Unknown user"
        ];

        response($data, 401);
        exit;
    }

    if ($user_data["roll"] != "freelancer") {
        $data = [
            "status" => "error",
            "message" => "Unknown user"
        ];

        response($data, 401);
        exit;
    }

    $freelancer = $freelancers->get_freelancer_by_userid($user_data["id"]);
    $portfolio = $portfolios->get_portfolios_by_freelancer_id($freelancer["id"]);

    $portfolio_data = array_map(function ($item) {
        $start_date = new DateTime($item["start_date"]);
        $end_date = new DateTime($item["end_date"]);

        return [
            "id" => $item["id"],
            "title" => $item["title"],
            "descriptions" => json_decode($item["descriptions"], true),
            "images" => json_decode($item["images"], true),
            "start_date" => [
                "content" => $start_date->format("Y, M d"),
                "elem" => $start_date->format("Y-m-d"),
            ],
            "end_date" => [
                "content" => $end_date->format("Y, M d"),
                "elem" => $end_date->format("Y-m-d"),
            ],
        ];
    }, $portfolio);

    $data = [
        "status" => "success",
        "message" => $portfolio_data
    ];

    response($data, 200);
    exit;
}

?>