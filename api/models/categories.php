<?php
class Categories
{
    private $con;
    private $table = "category";

    public function __construct($con)
    {
        $this->con = $con;
    }

    public function create($name)
    {
        $sql = "INSERT INTO " . $this->table . " (name) VALUE (?)";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $name);

        return $stmt->execute();
    }

    public function get_categories()
    {

        $sql = "SELECT * FROM " . $this->table;
        $result = $this->con->query($sql);

        return $result->fetch_all(MYSQLI_ASSOC);
    }
}

?>