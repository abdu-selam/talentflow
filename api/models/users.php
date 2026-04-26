<?php
class Users
{
    private $con;
    private $table = "users";

    public function __construct($con)
    {
        $this->con = $con;
    }

    public function create($id, $fname, $lname, $uname, $email, $password, $roll)
    {
        $sql = "INSERT INTO " . $this->table . " (id, first_name, last_name, user_name, email, password, roll) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("sssssss", $id, $fname, $lname, $uname, $email, $password, $roll);

        return $stmt->execute();
    }

    public function update_profile($uid, $pname)
    {
        $sql = "UPDATE " . $this->table . " SET profile = ? WHERE id = ?";

        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("ss", $pname, $uid);

        return $stmt->execute();
    }

    public function update_names($uid, $fname, $lname)
    {
        $sql = "UPDATE " . $this->table . " SET first_name = ?, last_name = ? WHERE id = ?";

        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("sss", $fname, $lname, $uid);

        return $stmt->execute();
    }

    public function get_user_by_id($id)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $id);

        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function get_user_by_email($email)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE email = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $email);

        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function get_user_by_username($user_name)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE user_name = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $user_name);

        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function get_users()
    {

        $sql = "SELECT * FROM " . $this->table;
        $result = $this->con->query($sql);

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get_users_by_roll($roll)
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE roll = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $roll);

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }
}

?>