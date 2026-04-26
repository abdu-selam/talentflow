<?php
require_once "../index.php";
require_once "../utils/responce.php";
require_once "../services/freelancer_profile_services.php";
require_once "../utils/validation.php";

$method = $_SERVER["REQUEST_METHOD"];
if (!isset($_SESSION["user"])) {
    $data = [
        "status" => "error",
        "message" => "Un Authenticated"
    ];

    response($data, 409);
    exit;
}

if ($method == "GET") {
    $needed_user = "";
    if (isset($_GET["uname"])) {
        $needed_user = $users->get_user_by_username($_GET["uname"]);
        if (!$needed_user) {
            $needed_user = $users->get_user_by_username($_SESSION["user"]);
        } else if ($needed_user["roll"] == "client") {
            $needed_user = $users->get_user_by_username($_SESSION["user"]);
        }
    } else {
        $needed_user = $users->get_user_by_username($_SESSION["user"]);
        if ($needed_user["roll"] == "client") {
            $data = [
                "status" => "error",
                "message" => "Un Authorized"
            ];

            response($data, 401);
            exit;
        }
    }

    $data = [
        "status" => "success",
        "message" => profileDataConstructor($needed_user)
    ];

    response($data, 200);
    exit;
} else if ($method == "POST") {
    $user = $users->get_user_by_username($_SESSION["user"]);
    if ($user["roll"] == "client") {
        $data = [
            "status" => "error",
            "message" => "Un Authorized"
        ];

        response($data, 401);
        exit;
    }

    $type = isset($_GET["type"]) ? $_GET["type"] : "pp";
    if ($type == "pp") {
        if (!isset($_FILES["profile"])) {
            $data = [
                "status" => "error",
                "message" => "No file provided"
            ];

            response($data, 403);
            exit;
        }

        $file = $_FILES["profile"];
        $result = ppValidator($file);
        if (!$result["status"]) {
            response($result["message"], 403);
            exit;
        }

        $newName = $user["id"] . "-profile-" . time() . "." . $result['ext'];

        $uploadDir = "../../uploads/profiles";
        $destination = $uploadDir . "/" . $newName;

        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        if (move_uploaded_file($file["tmp_name"], $destination)) {

            $users->update_profile($user["id"], $newName);
            $data = [
                "status" => "success",
                "message" => $newName
            ];

            response($data, 200);
            exit;
        } else {
            $data = [
                "status" => "error",
                "message" => "Internal Server Error"
            ];

            response($data, 500);
            exit;
        }
    } else {
        $json = file_get_contents("php://input");
        $data = json_decode($json, true);
        if ($type == "about") {
            $texts = $data["texts"];
            if (count($texts) == 0) {
                $data = [
                    "status" => "success",
                    "message" => "No data provided"
                ];

                response($data, 100);
                exit;
            }

            $text_to_db = json_encode($texts, JSON_UNESCAPED_UNICODE);
            $res = $freelancers->update_about($user["id"], $text_to_db);
            if ($res) {
                $freelancer = $freelancers->get_freelancer_by_userid($user["id"]);
                $data = [
                    "status" => "success",
                    "message" => json_decode($freelancer["about"], true)
                ];

                response($data, 200);
                exit;
            }

            $data = [
                "status" => "error",
                "message" => "Internal Server Error"
            ];

            response($data, 500);
            exit;

        } else if ($type == "skill") {
            do {
                $id = idGenerator("user");
                $skill = $skills->get_skill_by_id($id);
            } while ($skill);
            $freelancer = $freelancers->get_freelancer_by_userid($user["id"]);

            $res = $skills->create($id, $freelancer["id"], $data["name"], $data["level"], $data["type"]);
            if ($res) {
                $data = [
                    "status" => "success",
                    "message" => $skills->get_skill_by_id($id)
                ];

                response($data, 200);
                exit;
            }

            $data = [
                "status" => "error",
                "message" => "Internal Server Error"
            ];

            response($data, 500);
            exit;

        } else if ($type == "resume") {

        }
    }
}

?>