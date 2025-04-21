const editTaskForm = document.getElementById('edit-task-form')
const contentEditTaskForm = document.querySelector('.content-edit-task-form')
const editTaskBtn = document.getElementById('edit-task-btn')
const editTaskInput = document.getElementById('edit-task-input')
const resultModal = new bootstrap.Modal(document.getElementById('result-modal'), {
    keyboard: false
})

/**
 * Gets the data of the task for editing, to fill in form.
 */
const getTaskData = async () => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id') ?? 0
    const form = new FormData()
    form.append('id', id)
    const request = await fetch(`task/getTask`, {
        method: 'POST',
        body: form
    })
    const status = request.status
    const response = await request.json()

    if(status == 400) {
        location.href = '/tasks/task/index.php'
    } else if (status == 200) {
        const data = response.data
        const id = data.id
        const task = data.task_name
        editTaskForm.dataset.id = id
        editTaskInput.value = task
    }
}

getTaskData()


/**
 * Performs the request to edit a task.
 */
editTaskForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    editTaskBtn.textContent = 'Procesando ...'
    editTaskBtn.setAttribute('disabled', 'disabled')
    const elementForm = e.target
    const id = elementForm.dataset.id ?? 0
    const form = new FormData(elementForm)
    form.append('id', id)

    clearForm(elementForm)
    const request = await fetch('task/editTask', {
        method: 'POST',
        body: form
    })
    const status = request.status
    const response = await request.json()
    if(status == 200 || status == 400 ) {

        const message = response.message

        const modalBody = document.querySelector('#result-modal .modal-body')
        modalBody.innerHTML = ''
        const icon = status == 200
            ? '<i class="fa-solid fa-circle-check mb-3 h1 text-success mb-4"></i>'
            : '<i class="fa-solid fa-triangle-exclamation mb-3 h1 text-warning"></i>'

        modalBody.insertAdjacentHTML('beforeend', `
            <div class="my-3 text-center">
                ${icon}
                <p class="mb-0"> ${message}</p>
            </div>
        `)

        editTaskBtn.textContent = 'Añadir'
        editTaskBtn.removeAttribute('disabled')

        resultModal.show()
        setTimeout(() => {
            location.href = '/tasks/task/index.php'
        }, 1000)

    } else if (status == 422) {
        editTaskBtn.textContent = 'Añadir'
        editTaskBtn.removeAttribute('disabled')
        let errors = response.errors.form
        showFormErrors(errors, elementForm)
    } else {
        console.error('Hubo un error, comunícate con el administrador.')
    }
})

/**
 * Shows the errors in the form elements that were invalid.
 * @param {Object} errors Each element contains:
 *                          'name': attibute of the form element.
 *                          'message': error message for add to the form element.
 * @param {HTMLElement} form Form that was completed.
 */
const showFormErrors = (errors, form) => {
    errors.map(({name, message}) => {
        let element = document.querySelector(`#${form.id} [name='${name}']`)
        element.classList.add('is-invalid')
        element.insertAdjacentHTML('afterend', `
            <p class="error-message invalid-feedback"> ${message} </p>
        `)
    })
}

/**
 * Removes error messages, and the 'is-ivalid' class to the element.
 * @param {HTMLElement} form Form to be cleaned.
 */
const clearForm = (form) => {
    document.querySelectorAll(`#${form.id} .error-message`).forEach( el => el.remove())
    document.querySelector(`#${form.id} textarea`).classList.remove('is-invalid')
}