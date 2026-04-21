<?php
class Messages
{
    private $con;
    private $table = "messages";

    public function __construct($con)
    {
        $this->con = $con;
    }

    public function create($id, $sender_id, $reciever_id, $message)
    {
        $sql = "INSERT INTO " . $this->table . " (id, sender_id, reciever_id, message) VALUES (?, ?, ?, ?)";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("ssss", $id, $sender_id, $reciever_id, $message);

        return $stmt->execute();
    }

    public function get_message_by_id($id)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $id);

        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function get_message_by_recieverid($reciever_id)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE reciever_id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $reciever_id);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_message_by_senderid($sender_id)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE sender_id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $sender_id);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_message_by_sender_and_reciever_id($sender_id, $reciever_id)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE sender_id = ? AND reciever_id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("ss", $sender_id, $reciever_id);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_messages()
    {

        $sql = "SELECT * FROM " . $this->table;
        $result = $this->con->query($sql);

        return $result->fetch_all(MYSQLI_ASSOC);
    }
}

?>