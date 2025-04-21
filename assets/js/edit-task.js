const editTaskForm = $('#edit-task-form')
const contentEditTaskForm = $('.content-edit-task-form')
const editTaskBtn = $('#edit-task-btn')
const editTaskInput = $('#edit-task-input')
const resultModal = new bootstrap.Modal($('#result-modal'), {
    keyboard: false
})


/**
 * Gets the data of the task for editing, to fill in form.
 */
const getTaskData = () => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id') || 0

    const formData = new FormData()
    formData.append('id', id)

    $.ajax({
        url: 'task/getTask',
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        dataType: 'json',
        complete: function (xhr, textStatus) {
            const status = xhr.status

            if (status === 400) {
                location.href = '/tasks/task/index.php'
            } else if (status === 200) {
                const data = xhr.responseJSON.data
                const taskId = data.id
                const taskName = data.task_name

                editTaskForm[0].dataset.id = taskId
                editTaskInput.val(taskName)
            }
        },
        error: function () {
            console.error('Hubo un error al obtener los datos de la tarea.')
        }
    })
}

getTaskData()

/**
 * Performs the request to edit a task.
 */
editTaskForm.on('submit', function (e) {
    e.preventDefault()

    const form = $(this)
    editTaskBtn.text('Procesando ...').attr('disabled', 'disabled')

    const id = form[0].dataset.id || 0

    const formData = new FormData(this)
    formData.append('id', id)

    clearForm(this)

    $.ajax({
        url: 'task/editTask',
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        dataType: 'json',
        complete: function (xhr, textStatus) {
            const status = xhr.status
            const response = xhr.responseJSON

            editTaskBtn.text('Añadir').removeAttr('disabled')

            if (status === 200 || status === 400) {
                const message = response.message

                const icon = status === 200
                    ? '<i class="fa-solid fa-circle-check mb-3 h1 text-success mb-4"></i>'
                    : '<i class="fa-solid fa-triangle-exclamation mb-3 h1 text-warning"></i>';

                $('#result-modal .modal-body').html(`
                    <div class="my-3 text-center">
                        ${icon}
                        <p class="mb-0">${message}</p>
                    </div>
                `);

                resultModal.show()

                setTimeout(() => {
                    location.href = '/tasks/task/index.php'
                }, 1000);

            } else if (status === 422) {
                const errors = response.errors.form
                showFormErrors(errors, form[0])
            } else {
                console.error('Hubo un error, comunícate con el administrador.')
            }
        }
    })
})

/**
 * Shows the errors in the form elements that were invalid.
 * @param {Object} errors Each element contains:
 *                          'name': attibute of the form element.
 *                          'message': error message for add to the form element.
 * @param {HTMLElement} form Form that was completed.
 */
const showFormErrors = (errors, form) => {
    errors.forEach(function(error) {
        const name = error.name
        const message = error.message

        const element = $(`#${form.id} [name='${name}']`);
        element.addClass('is-invalid')
        element.after(`
            <p class="error-message invalid-feedback"> ${message} </p>
        `)
    })
}

/**
 * Removes error messages, and the 'is-ivalid' class to the element.
 * @param {HTMLElement} form Form to be cleaned.
 */
const clearForm = (form) => {
    $(`#${form.id} .error-message`).remove()
    $(`#${form.id} textarea`).removeClass('is-invalid')
}