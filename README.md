# Uso del proyecto

El proyecto es una "app" de tareas el cual permite hacer las funciones "CRUD". A continuación se describen los pasos para poder utilizarla:

1. Instalar un entorno de desarrollo local como **XAMPP**, **WAMP**, **AppServ**, **laragon**, etc.
1. Instalar una herramientas para gestión de bases de datos como **MySQL Workbench**, **HeidiSQL** o **phpMyAdmin** (incluido por defecto en entornos como *XAMPP* O *WAMP*).
1. Asegurarse de que el servidor se encuentre activo, en caso de no estarlo, iniciar el servicio y verifica abriendo una pestaña del navegador e ingresando: *localhost:80* o *192.168.XX.XXX:80* (eso dependerá de la manera en la que se configuró el hostname y el puerto al momento de la instalación, si es necesario, cámbialos),una vez activo, podrás visualizar un página con información del entorno descargado.
1. Descargar el proyecto o clonarlo en la carpeta correspondiente de tu entorno de desarrollo local, esta carpeta suele tener mayormente el nombre de *www*, *htdocs*, etc.
1. Cambia el nombre de la carpeta a *tasks* en caso de que tenga un nombre distinto.
1. Ejecutar el archivo `database.sql` en tu entorno de base de datos, este archivo se encuentra en la raíz del proyecto.
1. Acceder a la carpeta `config` en la raíz del proyecto y renombrar el archivo `Configuration.txt` a `Configuration.php`.
1. Una vez se haya renombrado el archivo, ábrelo en tu editor de código, e ingresar el valor de las variables `DB_HOST`, `DB_USER`, `DB_PASSWORD` con los valores correspondientes que hayas configurado al instalar tu ambiente de desarrollo. Estas variables son para realizar la conexión a la base de datos.
1. Una vez se haya ejecutado el archivo SQL, se haya cambiado la extensión del archivo *.txt* a *.php* y se hayan agregado las variables correspondientes, abre tu navegador e ingresa en la URL:
http://localhost/tasks/task/index.php.
<br>
   >[**NOTA**]
   >
   >Dependiendo de la configuración de tu entorno de desarrollo local, *localhost* puede cambiar a *192.168.XX.XXX*.
   >Puedes ingresar a tu archivo .ini para validar el nombre de tu hostname.
1. Podrás visualizar una lista de tareas, y los elementos correspondientes para sus operaciones CRUD. Puébalo!