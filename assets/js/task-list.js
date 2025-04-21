const taskTableBody = $('.task-table-body')
const taskNumber = $('.task-number')
const deleteTaskBtn = $('#delete-task-btn')
const deleteTaskModal = new bootstrap.Modal($('#delete-task-modal'), {
    keyboard: false
})
const resultModal = new bootstrap.Modal(('#result-modal'), {
    keyboard: false
})

/**
 * Gets all tasks and shows them in table, also adds a actions columns
 * for editing and removing own tasks.
 */
const getAllTasks = () => {
    $.ajax({
        url: 'task/tasks',
        method: 'GET',
        dataType: 'json',
        complete: function(xhr, response) {
            const status = xhr.status

            taskTableBody.empty()

            if (status === 200) {
                const data = xhr.responseJSON.data
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
                    `)
                })
            } else if (status === 400) {
                taskTableBody.append(`
                    <tr>
                        <td colspan="5">No se encontraron resultados.</td>
                    </tr>
                `)
            }
        }
    })
}

getAllTasks()

/**
 * Gets the action button clicked from the table and calls the required function.
 */
$('.task-table').on('click', '.remove', function() {
    const currentElement = $(this)
    showDeleteTaskModal(currentElement)
})

/**
 * Shows modal to delete the selected information. After clicking 'Eliminar',
 * performs the delete action and showing result message.
 * @param {HTMLElement} element Table button clicked.
 */
const showDeleteTaskModal = (element) => {
    const taskId = $(element).data('id')

    taskNumber.text(taskId)
    deleteTaskModal.show()

    deleteTaskBtn.off('click').on('click', function () {
        const form = new FormData()
        form.append('taskId', taskId)

        $.ajax({
            url: 'task/deleteTask',
            method: 'POST',
            data: form,
            processData: false,
            contentType: false,
            dataType: 'json',
            complete: function (xhr, textStatus) {

                const status = xhr.status
                const message = xhr.responseJSON.message

                if (status === 200) {
                    getAllTasks()
                }

                const icon = status === 200
                    ? '<i class="fa-solid fa-circle-check mb-3 h1 text-success mb-4"></i>'
                    : '<i class="fa-solid fa-triangle-exclamation mb-3 h1 text-warning"></i>'

                const modalBody = $('#result-modal .modal-body')
                modalBody.html(`
                    <div class="my-3 text-center">
                        ${icon}
                        <p class="mb-0">${message}</p>
                    </div>
                `);

                deleteTaskModal.hide()
                resultModal.show()
            }
        })
    })
}