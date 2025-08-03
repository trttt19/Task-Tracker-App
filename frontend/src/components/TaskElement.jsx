import React from 'react'
import { useNavigate } from "react-router-dom";


function TaskElement({ task }) {
    const priorities
        = {
        "low": "Low",
        "medium": "Medium",
        "high": "High",
    };

    const priorityClasses = {
        'high': 'text-danger',
        'medium': 'text-warning',
        'low': 'text-primary'
    };

    const statusClasses = {
        'done': 'text-success',
        'inProgress': 'text-warning',
        'toDo': 'text-primary'
    };
    const statuses = {
        "toDo": "To Do",
        "inProgress": "In Progress",
        "done": "Done"
    };
    const navigate = useNavigate();


    const handleRowClick = () => {
        navigate(`/tasks/${task.task_id}`);
    };

    return (

        <tr style={{ cursor: "pointer" }} onClick={handleRowClick} >
            <td>{task.title}</td>
            <td className={priorityClasses[task.priority]}>{priorities[task.priority]}</td>
            <td className={statusClasses[task.status]}>{statuses[task.status]}</td>

            <td>

                {task.due_date
                    ? new Date(task.due_date).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    })
                    : "No due date"}</td>

        </tr>
    )
}

export default TaskElement