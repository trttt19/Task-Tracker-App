import React from 'react'
import TaskElement from './TaskElement'
import { useNavigate } from 'react-router-dom'
import '../css/styles.css'
function TaskTable({ tasks }) {
    const navigate = useNavigate()
    const handleRowClick = (task) => {
        navigate(`/tasks/${task.task_id}`)
    };
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
                        <TaskElement key={task.task_id} task={task} onClick={() => handleRowClick(task)} />
                    ))}
                </tbody>
            </table>

        </>
    )
}

export default TaskTable