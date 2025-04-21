const taskTableBody = $('.task-table-body')

/**
 * Gets all tasks and shows them in table, also adds a actions columns
 * for editing and removing own tasks.
 */
const getAllTasks = () => {
    $.ajax({
        url: 'task/tasks',
        method: 'GET',
        dataType: 'json',
        success: function(response, textStatus, xhr) {
            const status = xhr.status

            taskTableBody.empty()

            if (status === 200) {
                const data = response.data
                $.each(data, function(i, el) {
                    taskTableBody.append(`
                        <tr>
                            <td>${el.id}</td>
                            <td style="max-width: 150px;">${el.task_name}</td>
                            <td>${el.created_at}</td>
                            <td>${el.updated_at}</td>
                            <td>
                                <button type="button" class="btn btn-sm py-0 px-1 m-1 update btn-outline-primary">
                                    <a href="/tasks/task/edit.php?id=${el.id}">
                                        Editar
                                    </a>
                                </button>
                                <button type="button" data-id="${el.id}" class="btn btn-sm py-0 px-1 m-1 remove btn-outline-secondary">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    `);
                });
            } else if (status === 400) {
                taskTableBody.append(`
                    <tr>
                        <td colspan="5">No se encontraron resultados.</td>
                    </tr>
                `);
            }
        },
        error: function(xhr) {
            return
        }
    });
};
getAllTasks()