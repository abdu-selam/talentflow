<?php
require_once __DIR__ . "/../utils/env.php";

class Database
{
    private $host;
    private $dbname;
    private $username;
    private $password;
    public $con;

    public function __construct()
    {
        global $env;

        $this->host = $env["DB_HOST_NAME"];
        $this->dbname = $env["DB_NAME"];
        $this->username = $env["DB_USER_NAME"];
        $this->password = $env["DB_PASSWORD"];
    }

    public function connect()
    {
        $this->con = new mysqli(
            $this->host,
            $this->username,
            $this->password,
            $this->dbname
        );

        if ($this->con->connect_error) {
            die("connection failed" . $this->con->connect_error);
        }

        $this->con->set_charset("utf8mb4");

        return $this->con;
    }
}

?>