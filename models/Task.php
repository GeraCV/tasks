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

    /**
     * Gets all task from the database.
     */
    public function tasks ()
    {
        $queryResult = $this->database->query("
            SELECT
                id,
                task_name,
                created_at,
                if(updated_at is null, 'Sin actualización', updated_at) as updated_at
            FROM
                tasks.task;
        ");

        return $queryResult;
    }
}
