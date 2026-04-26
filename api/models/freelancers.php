<?php
class Freelancers
{
    private $con;
    private $table = "freelancers";

    public function __construct($con)
    {
        $this->con = $con;
    }

    public function create($id, $user_id)
    {
        $sql = "INSERT INTO " . $this->table . " (id, user_id) VALUES (?, ?)";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("ss", $id, $user_id);

        return $stmt->execute();
    }

    public function update_about($uid, $about)
    {
        $sql = "UPDATE " . $this->table . " SET about = ? WHERE user_id = ?";

        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("ss", $about, $uid);

        return $stmt->execute();
    }

    public function update_resume($uid, $resume)
    {
        $sql = "UPDATE " . $this->table . " SET resume = ? WHERE user_id = ?";

        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("ss", $resume, $uid);

        return $stmt->execute();
    }

    public function get_freelancer_by_id($id)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $id);

        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function get_freelancer_by_userid($user_id)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE user_id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $user_id);

        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function get_freelancers()
    {

        $sql = "SELECT * FROM " . $this->table;
        $result = $this->con->query($sql);

        return $result->fetch_all(MYSQLI_ASSOC);
    }
}

?>