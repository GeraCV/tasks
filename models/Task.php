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
     * @return array all tasks and number rows returned.
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

    /**
     * Gets task by Id.
     * @param int $tasksId Task Id.
     * @return array Only one task and number rows returned.
     */
    public function getTaskById ($taskId)
    {
        $queryResult = $this->database->query("
            SELECT
                *
            FROM
                tasks.task

            WHERE id = '$taskId';
        ");

        return $queryResult;
    }

    /**
     * Delete task by Id.
     * @param int $tasksId Task Id.
     * @return int Affected rows.
     */
    public function deleteTask ($taskId)
    {
        $queryResult = $this->database->query("
            DELETE FROM
                tasks.task
            WHERE
                id = '$taskId';
        ");

        return $queryResult;
    }

    /**
     * Add a new task to the task table.
     * @param int $newTask Task name/description.
     * @return int Affected rows.
     */
    public function addTask ($newTask)
    {
        $newTask = $this->database->escape($newTask);

        $queryResult = $this->database->query("
            INSERT INTO
                tasks.task (task_name)
            VALUES ('$newTask');
        ");

        return $queryResult;
    }

    /**
     * Updates a task by Id in the task table.
     * @param int $tasksId Task Id.
     * @param int $editTask Task name/description.
     * @return int Affected rows.
     */
    public function updateTask ($id, $editTask)
    {
        $editTask = $this->database->escape($editTask);

        $queryResult = $this->database->query("
            UPDATE
                tasks.task
            set task_name = '$editTask'
            WHERE
                id = '$id';
        ");

        return $queryResult;
    }

}
