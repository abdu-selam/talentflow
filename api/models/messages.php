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
        $sql = "INSERT INTO " . $this->table . " (id, sender_id, reciever_id, message, date) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->con->prepare($sql);
        $now = date("Y-m-d H:i:s", time());
        $stmt->bind_param("sssss", $id, $sender_id, $reciever_id, $message, $now);

        return $stmt->execute();
    }

    public function make_proposal($id)
    {
        $sql = "UPDATE " . $this->table . " SET type = 'proposal' WHERE id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $id);

        return $stmt->execute();
    }

    public function mark_read($id)
    {
        $sql = "UPDATE " . $this->table . " SET status = 'read' WHERE id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $id);

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

    public function get_message_by_userid($id)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE sender_id = ? OR reciever_id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("ss", $id, $id);

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

    public function get_message_btwn_two($user_one, $user_two)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE (sender_id = ? AND reciever_id = ?) OR (sender_id = ? AND reciever_id = ?)";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("ssss", $user_one, $user_two, $user_two, $user_one);

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

    public function get_messages_newest_first()
    {

        $sql = "SELECT s.user_name AS sname, r.user_name AS rname
            FROM messages m 
            JOIN users s ON m.sender_id = s.id
            JOIN users r ON m.reciever_id = r.id 
            ORDER BY m.date DESC";
        $result = $this->con->query($sql);

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_readed_newest_first()
    {

        $sql = "SELECT m.id, m.sender_id
            FROM messages m 
            WHERE m.status = 'read'
            ORDER BY m.date DESC";
        $result = $this->con->query($sql);

        return $result->fetch_all(MYSQLI_ASSOC);
    }
}

?>
