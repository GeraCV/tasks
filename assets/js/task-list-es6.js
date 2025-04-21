const taskTableBody = document.querySelector('.task-table-body')
const taskNumber = document.querySelector('.task-number')
const deleteTaskBtn = document.getElementById('delete-task-btn')
const deleteTaskModal = new bootstrap.Modal(document.getElementById('delete-task-modal'), {
    keyboard: false
})
const resultModal = new bootstrap.Modal(document.getElementById('result-modal'), {
    keyboard: false
})

/**
 * Gets all tasks and shows them in table, also adds a actions columns
 * for editing and removing own tasks.
 */

const getAllTasks = async () => {

    const request = await fetch('task/tasks')
    const status = request.status
    const response = await request.json()
    taskTableBody.innerHTML = ''
    if(status === 200) {
        const data = response.data
        data.map(({id, task_name, created_at, updated_at}) => {
            taskTableBody.insertAdjacentHTML('beforeend', `
                <tr>
                    <td>${id}</td>
                    <td style="max-width: 150px;">${task_name}</td>
                    <td>${created_at}</td>
                    <td>${updated_at}</td>
                    <td>
                        <button type="button" class="btn btn-sm py-0 px-1 m-1 update btn-outline-primary">
                            <a href="/tasks/task/edit.php?id=${id}">
                                Editar
                            </a>
                        </button>
                        <button type="button" data-id="${id}" class="btn btn-sm py-0 px-1 m-1 remove btn-outline-secondary">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `)
        })
    }else if(status === 400) {
        taskTableBody.insertAdjacentHTML('beforeend', `
            <tr>
                <td colspan="5">No se encontraron resultados.</td>
            </tr>
        `)
    } else {
        return
    }
}
getAllTasks()

/**
 * Gets the action button clicked from the table and calls the required function.
 */
document.querySelector('.task-table').addEventListener('click', (e) => {
    const currentElement = e.target
    if (currentElement.classList.contains('remove')) showDeleteTaskModal(currentElement)
    else return

})

/**
 * Shows modal to delete the selected information. After clicking 'Eliminar',
 * performs the delete action and showing result message.
 * @param {HTMLElement} element Table button clicked.
 */
const showDeleteTaskModal = async (element) => {

    const taskId = element.dataset.id ?? 0
    taskNumber.textContent = taskId
    deleteTaskModal.show()

    deleteTaskBtn.addEventListener('click', async () => {

        const form = new FormData()
        form.append('taskId', taskId)
        const request = await fetch('task/deleteTask', {
            method: 'POST',
            body: form
        })

        const status = request.status
        const response = await request.json()
        const message = response.message

        if(status === 200) {
            getAllTasks()
        }

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

        deleteTaskModal.hide()
        resultModal.show()
    })
}