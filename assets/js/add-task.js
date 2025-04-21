
const addTaskForm = $('#add-task-form')
const contentAddTaskForm = $('.content-add-task-form')
const addTaskBtn = $('#add-task-btn')
const resultModal = new bootstrap.Modal($('#result-modal'), {
    keyboard: false
})

/**
 * Performs the request to add a new task.
 */
addTaskForm.on('submit', function (e) {
    e.preventDefault()

    const $form = $(this)
    addTaskBtn.text('Procesando ...').attr('disabled', 'disabled')

    const formData = new FormData(this)
    clearForm(this)

    $.ajax({
        url: 'task/addTask',
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        dataType: 'json',
        complete: function (xhr, textStatus) {
            const status = xhr.status
            const response = xhr.responseJSON

            addTaskBtn.text('Añadir').removeAttr('disabled')

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
                showFormErrors(errors, $form[0])
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

