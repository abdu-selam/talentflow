<?php
class Clients
{
    private $con;
    private $table = "clients";

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

    public function get_client_by_id($id)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $id);

        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function get_client_by_userid($user_id)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE user_id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $user_id);

        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function get_clients()
    {

        $sql = "SELECT * FROM " . $this->table;
        $result = $this->con->query($sql);

        return $result->fetch_all(MYSQLI_ASSOC);
    }
}

?>