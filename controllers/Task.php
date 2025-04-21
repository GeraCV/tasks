<?php

namespace tasks\controllers;

use tasks\models\Task as TaskModel;

class Task
{
    private $model;
    public $response;
    protected static $data;
    private $viewPath;

    public function __construct()
    {
        $this->model = new TaskModel();
        $this->response = [];
        $this->viewPath = str_replace('\\', '/', APPLICATION_PATH . '/views/');
    }

    /**
     * Creates index view.
     */
    public function index()
    {
        $this->setVariables(['pageTitle' => 'Lista de tareas', 'jsFile' => 'task-list']);
        $this->buildHTML('index');
    }

    /**
     * Calls the model function for get all tasks.
     */
    public function tasks ()
    {
        [$tasks, $rows] = $this->model->tasks();

        if(!$rows) {
            http_response_code(400);
            $this->response['data'] = [];
        } else {
            $this->response['data'] = $tasks;
        }

        echo json_encode($this->response, JSON_PRETTY_PRINT);
    }

    /**
     * Creates add view.
     */
    public function add()
    {

    }

    /**
     * Creates edit view.
     */
    public function edit()
    {

    }

    /**
     * Builds the complete HTML view
     */
    private function buildHTML (string $viewName)
    {
        extract(self::$data, 0);
        include $this->viewPath . 'templates/header.php';
        include $this->viewPath . $viewName . '.php';
        include $this->viewPath . 'templates/footer.php';
    }

    /**
     * Creates array of variables for can use in the full page.
     */
    private static function setVariables (array $arrayVariables)
    {
        foreach ($arrayVariables as $key => $value) {
            self::$data[$key] = $value;
        }
    }

}
