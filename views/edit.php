<div class="container text-center">
    <div class="main-wrapper">
        <div class="container-edit-task-form p-5 text-start">
            <div class="title-form text-center">
                <h2 class="my-3"> Editar tarea </h2>
            </div>
            <form id="edit-task-form">
                <div class="my-5 content-edit-task-form">
                    <label for="edit-task-input" class="form-label">Nombre</label>
                    <textarea class="form-control" placeholder="Nombre y descripción de la tarea"
                        name="nameTask" id="edit-task-input"></textarea>
                    <div class="form-text">Máximo 250 caracteres.</div>
                </div>
                <div class="container-submit-button text-end">
                    <button type="button" class="btn btn-secondary">
                        <a href="/tasks/task/index.php" class="text-white">
                            Regresar
                        </a>
                    </button>
                    <button type="submit" id="edit-task-btn" class="btn btn-primary">Aceptar</button>
                </div>
            </form>
        </div>
    </div>
</div>