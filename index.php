<?php

define('HOST', $_SERVER['HTTP_HOST']);
define('REQUEST_SCHEME', $_SERVER['REQUEST_SCHEME']);
define('PROJECT_PATH', dirname(__DIR__));
define('PROJECT_FOLDER', basename(__DIR__));

const APPLICATION_PATH = PROJECT_PATH . '/' . PROJECT_FOLDER . '/';
const URL = REQUEST_SCHEME . '://' . HOST . '/' . PROJECT_FOLDER . '/';
const ASSETS_PATH = URL . 'assets/';

spl_autoload_register(function ($class) {
    $className = str_replace('\\', '/', PROJECT_PATH . '/' . $class . '.php');

    if (!is_readable($className)) {
        throw new \Exception (
            printf(
                "The file defining the <b>%s</b> class is not found in the specified path.",
                $class
            )
        );
    }
    include_once $className;
});


$url = explode('/', $_SERVER['REQUEST_URI']);
$controller = ucfirst($url[count($url) - 2]);
$view = explode('.', end($url))[0];
$arguments = [];
try {

    if (!file_exists(APPLICATION_PATH . 'controllers/' . $controller . '.php')) {
        echo '404 Page not found.';
        exit();
    }

    $namespaceController = PROJECT_FOLDER . '\controllers\\' . $controller;

    if (!class_exists($namespaceController)) {
        echo 'Class defined incorrectly';
        exit();
    }

    $controller = new $namespaceController;
    call_user_func_array([$controller, $view], $arguments);

} catch (\Exception $e) {
    throw new Exception($e->getMessage());
}