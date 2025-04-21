<div class="container text-center">
    <div class="main-wrapper">
        <div class="container-add-task-form text-start">
            <div class="title-form text-center">
                <h2 class="my-3"> Añadir tarea </h2>
            </div>
            <form id="add-task-form">
                <div class="my-5 content-add-task-form">
                    <label for="add-task-input" class="form-label">Nombre</label>
                    <textarea class="form-control" placeholder="Nombre y descripción de la tarea"
                        name="nameTask" id="add-task-input"></textarea>
                    <div class="form-text">Máximo 250 caracteres.</div>
                </div>
                <div class="container-submit-button text-end">
                    <button type="button" class="btn btn-secondary">
                        <a href="/tasks/task/index.php" class="text-white">
                            Regresar
                        </a>
                    </button>
                    <button type="submit" id="add-task-btn" class="btn btn-primary">Añadir</button>
                </div>
            </form>
        </div>
    </div>
</div>