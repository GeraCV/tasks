const addTaskForm = document.getElementById('add-task-form')
const contentAddTaskForm = document.querySelector('.content-add-task-form')
const addTaskBtn = document.getElementById('add-task-btn')
const resultModal = new bootstrap.Modal(document.getElementById('result-modal'), {
    keyboard: false
})

/**
 * Performs the request to add a new task.
 */
addTaskForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    addTaskBtn.textContent = 'Procesando ...'
    addTaskBtn.setAttribute('disabled', 'disabled')
    const elementForm = e.target
    const form = new FormData(elementForm)

    clearForm(elementForm)
    const request = await fetch('task/addTask', {
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

        addTaskBtn.textContent = 'Añadir'
        addTaskBtn.removeAttribute('disabled')

        resultModal.show()
        setTimeout(() => {
            location.href = '/tasks/task/index.php'
        }, 1000)

    } else if (status == 422) {
        addTaskBtn.textContent = 'Añadir'
        addTaskBtn.removeAttribute('disabled')
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