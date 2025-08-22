import React from 'react'
import TaskElement from './TaskElement'
import '../css/styles.css'
function TaskTable({ tasks }) {

    return (
        <>
            <table className='table text-center table-hover table-fixed'>
                <thead>
                    <tr>
                        <th className='w-25'>Title</th>
                        <th className='w-25'>Priority</th>
                        <th className='w-25'>Status</th>
                        <th className=' w-25 '>Due Date</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {tasks.map((task) => (
                        // <TaskElement key={task.task_id} task={task} onClick={() => handleRowClick(task)} />
                        <TaskElement task={task} />

                    ))}
                </tbody>
            </table>

        </>
    )
}

export default TaskTable