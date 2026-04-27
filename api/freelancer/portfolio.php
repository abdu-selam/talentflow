<?php
require_once "../utils/responce.php";
require_once "../index.php";
require_once "../services/freelancer_profile_services.php";
require_once "../utils/validation.php";

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
} elseif ($method == "POST") {
    $user_data = $users->get_user_by_username($_SESSION["user"]);
    $freelancer = $freelancers->get_freelancer_by_userid($user_data["id"]);
    $date_pattern = "/^\d{1,2}-\d{1,2}-\d{4}$/";

    $title = $_POST["title"];

    $start_date = isset($_POST["startDate"]) ? $_POST["startDate"] : "";
    if (preg_match($date_pattern, $start_date)) {
        $date = DateTime::createFromFormat("d-m-Y", $_POST["startDate"]);
        $start_date = $date->getTimestamp();
    } else {
        $start_date = null;
    }

    $end_date = isset($_POST["startDate"]) ? $_POST["startDate"] : "";
    if (preg_match($date_pattern, $end_date)) {
        $date = DateTime::createFromFormat("d-m-Y", $_POST["startDate"]);
        $end_date = $date->getTimestamp();
    } else {
        $end_date = null;
    }

    if ($start_date > $end_date) {
        $start_date = null;
        $end_date = null;
    }

    $description = json_encode(json_decode($_POST["description"], true), JSON_UNESCAPED_UNICODE);

    $images = json_encode([], JSON_UNESCAPED_UNICODE);
    if (isset($_FILES["images"])) {
        $files = $_FILES["images"];
        $images = json_encode(portfolio_images_uploader($files, $user_data["id"]), JSON_UNESCAPED_UNICODE);
    }

    do {
        $id = idGenerator("user");
        $portfolio = $portfolios->get_portfolio_by_id($id);
    } while ($portfolio);

    $res = $portfolios->create($id, $freelancer["id"], $title, $description, $images, $start_date, $end_date);

    if ($res) {
        $data = [
            "status" => "success",
            "message" => "Portfolio created successfully"
        ];

        response($data, 200);
        exit;
    }

    $data = [
        "status" => "error",
        "message" => "Internal server error"
    ];

    response($data, 500);
    exit;

}

?>