<?php
class Ratings
{
    private $con;
    private $table = "ratings";

    public function __construct($con)
    {
        $this->con = $con;
    }

    public function create($id, $giver_id, $reciever_id, $rating_type, $amount, $message)
    {
        $sql = "INSERT INTO " . $this->table . " (id, giver_id, reciever_id, rating_type, amount, message) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("ssssds", $id, $giver_id, $reciever_id, $rating_type, $amount, $message);

        return $stmt->execute();
    }

    public function get_rating_by_id($id)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $id);

        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function get_ratings_by_giver_id($giver_id)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE giver_id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $giver_id);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_ratings_by_reciever_id($reciever_id)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE reciever_id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $reciever_id);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_ratings_by_rating_type($rating_type)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE rating_type = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $rating_type);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_ratings()
    {

        $sql = "SELECT * FROM " . $this->table;
        $result = $this->con->query($sql);

        return $result->fetch_all(MYSQLI_ASSOC);
    }
}

?>