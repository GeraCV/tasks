<div class="container text-center">
    <div class="main-wrapper wrapper-task-list">
        <h1 class="my-3"> Lista de tareas </h1>
        <div class="text-end my-5">
            <button type="button" class="btn btn-primary">
                <a href="/tasks/task/add.php" class="text-white">
                    Agregar tarea
                </a>
            </button>
        </div>
        <div class="container-task-table">
            <table class="table table-striped task-table">
                <thead>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Fecha de creación</th>
                    <th>Fecha de actulización</th>
                    <th>Acciones</th>
                </thead>
                <tbody class="task-table-body">
                </tbody>
            </table>
        </div>
    </div>
</div>

<div class="modal fade" id="delete-task-modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Eliminar tarea</h5>
            </div>
            <div class="modal-body my-3 text-center">
                <i class="fa-solid fa-xmark h1 text-danger"></i>
                <p class="mb-0">
                    ¿Estás seguro que deseas eliminar la tarea <span class="task-number"></span>?
                </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" id="delete-task-btn">Eliminar</button>
            </div>
        </div>
    </div>
</div>