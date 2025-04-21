const taskTableBody = document.querySelector('.task-table-body')

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
