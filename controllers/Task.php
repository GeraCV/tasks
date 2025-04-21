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
     * Creates add view.
     */
    public function add()
    {
        $this->setVariables(['pageTitle' => 'Añadir tarea', 'jsFile' => 'add-task']);
        $this->buildHTML('add');
    }

    /**
     * Creates edit view.
     */
    public function edit()
    {
        $this->setVariables(['pageTitle' => 'Editar tarea', 'jsFile' => 'edit-task']);
        $this->buildHTML('edit');
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
     * Validates the task to be deleting.
     * Validations:
     * 1 - It is a positive number.
     * 2 - Id exists in the task table.
     *
     * If the validations are correct, it calls the model function to delete tasks.
     */
    public function deleteTask ()
    {
        $taskId = isset($_POST['taskId']) ? $_POST['taskId'] : null;

        if(!preg_match('/^[0-9]+$/', $taskId)) {
            $this->sendError('Asegúrate de ingresar in Id válido.');
            exit();
        }

        [$tasks, $rows] = $this->model->getTaskById($taskId);

        if(!$rows) {
            $this->sendError('Tarea no encontrada.');
            exit();
        }

        $result = $this->model->deleteTask($taskId);
        if(!$result) {
            $this->sendError('Hubo un error al eliminar la tarea, contacta al administrador.');
            exit();
        }

        $this->response['message'] = 'La tarea se eliminó correctamente.';

        echo json_encode($this->response, JSON_PRETTY_PRINT);
    }

    /**
     * Validates the task to be added.
     * Validations:
     * 1 - If exists expected data.
     * 2 - If the length expected data is valid.
     *
     * If the validations are correct, it calls the model function to add task.
     */
    public function addTask ()
    {
        if(!isset($_POST['nameTask'])) {
            $this->sendError('Asegúrate de enviar los campos requeridos.');
            exit();
        }

        $newTask = trim($_POST['nameTask']);

        if(!strlen($newTask) || strlen($newTask) > 250) {
            http_response_code(422);
            $this->response['errors']['form'][] = ['name' => 'nameTask',
                'message' => 'Asegúrate de ingresar al menos un caracter o no superar la cantidad máxima.'];
            echo json_encode($this->response, JSON_PRETTY_PRINT);
            exit();
        }

        $result = $this->model->addTask($newTask);

        if(!$result) {
            $this->sendError('Hubo un error al añadir la información');
            exit();
        }

        $this->response['message'] = 'La información se añadió correctamente.';

        echo json_encode($this->response,  JSON_PRETTY_PRINT);
    }

    /**
     * Calls the model function for get the task by Id.
     */
    public function getTask ()
    {
        try {
            $taskId = isset($_POST['id']) ? intval($_POST['id']) : 0;
            [$tasks, $rows] = $this->model->getTaskById($taskId);

            if(!$rows) {
                http_response_code(400);
                $this->response['message'] = 'Tarea no encontrada.';
            } else {
                $this->response['data'] = $tasks[0];
            }
            echo json_encode ($this->response, JSON_PRETTY_PRINT);
        } catch (\Exception $e) {
            http_response_code(400);
            $this->response['message'] = 'Hubo un error al solicitar la información.';
            echo json_encode ($this->response, JSON_PRETTY_PRINT);
        }
    }

    public function editTask ()
    {
        if(!isset($_POST['nameTask']) || !isset($_POST['id'])) {
            $this->sendError('Asegúrate de enviar los campos requeridos.');
            exit();
        }

        $editTask = trim($_POST['nameTask']);
        $taskId = trim($_POST['id']);

        [$tasks, $rows] = $this->model->getTaskById($taskId);

        if(!$rows) {
            $this->sendError('Asegúrate de ingresar un Id válido.');
            exit();
        }

        if(!strlen($editTask) || strlen($editTask) > 250) {
            http_response_code(422);
            $this->response['errors']['form'][] = ['name' => 'nameTask',
                'message' => 'Asegúrate de ingresar al menos un caracter o no superar la cantidad máxima.'];
            echo json_encode($this->response, JSON_PRETTY_PRINT);
            exit();
        }

        $result = $this->model->updateTask($taskId, $editTask);

        if(!$result) {
            $this->sendError('Hubo un error al actualizar la información');
            exit();
        }

        $this->response['message'] = 'La información se actualizó correctamente.';

        echo json_encode($this->response,  JSON_PRETTY_PRINT);
    }

    /**
     * It is called when there are error validations of the user.
     */
    public function sendError ($message = 'Hubo un error.')
    {
        http_response_code(400);
        $this->response['message'] = $message;
        echo json_encode($this->response, JSON_PRETTY_PRINT);
    }

    /**
     * Builds the complete HTML view
     */
    private function buildHTML (string $viewName)
    {
        extract(self::$data, 0);
        include $this->viewPath . 'templates/header.php';
        include $this->viewPath . $viewName . '.php';
        include $this->viewPath . 'templates/resultModal.php';
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
