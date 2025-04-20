<?php

namespace tasks\models;

use tasks\config\Database;

class Task
{
    private $database;

    public function __construct()
    {
        $this->database = new Database();
    }
}
