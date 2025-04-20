<?php

namespace tasks\config;

use tasks\config\Configuration;

class Database extends Configuration
{

    protected $dbConnection;

    function __construct()
    {
        $this->dbConnection = $this->connection();
    }

    private function connection ()
    {
        try {
            $connection = new \mysqli($this->env['DB_HOST'], $this->env['DB_USER'], $this->env['DB_PASSWORD'], $this->env['DB_DATABASE']);
            if($connection->connect_error) {
                throw new \Exception('Connection failed: ' . $connection->connect_error);
            }
            return $connection;
        } catch (\Exception $e) {
            throw new \Exception('Error connecting the database: ' . $e->getMessage());
        }
    }

    public function escape($string)
    {
        return $this->dbConnection->real_escape_string($string);
    }

    public function query ($query)
    {
        $result = $this->dbConnection->query($query);
        if ($result instanceof \mysqli_result) {
            return [$result->fetch_all(MYSQLI_ASSOC), $result->num_rows];
        } else {
            return $this->dbConnection->affected_rows;
        }
    }
}