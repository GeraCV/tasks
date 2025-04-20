<?php

namespace tasks\controllers;

use tasks\models\Task as TaskModel;

class Task
{
    private $model;
    public $response;
    protected static $data;

    public function __construct()
    {
        $this->model = new TaskModel();
        $this->response = [];
    }

    public function index()
    {
        @include str_replace('\\', '/', APPLICATION_PATH . '/views/index.php');
    }

    public function add()
    {
        @include str_replace('\\', '/', APPLICATION_PATH . '/views/add.php');
    }

    public function edit()
    {
        @include str_replace('\\', '/', APPLICATION_PATH . '/views/edit.php');
    }

}
