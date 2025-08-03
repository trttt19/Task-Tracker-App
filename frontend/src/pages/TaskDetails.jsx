import React, { useState, useEffect } from 'react'
import PriorityDropdown from '../components/PriorityDropdown'
import StatusDropDown from '../components/StatusDropDown';
import { useParams, useNavigate } from 'react-router-dom';
import { getTask, updateTask, deleteTask } from '../api/tasks';

function TaskDetails() {
    const { task_id } = useParams();
    const [task, setTask] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const deleteTaskFunction = async () => {
        try {
            console.log(`Deleting task with ID: ${task_id}`);

            await deleteTask(task_id)
            alert("Task Deleted")
            navigate('/tasks')
        } catch (error) {
            setError(error.message);
        }
    };
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const data = await getTask(task_id);
                setTask(data.task);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchTask();
    }, [task_id]);
    const updateTaskInfo = async () => {
        event.preventDefault();
        try {

            const payload = {};
            if ((task.title != null)) payload.title = task.title;
            if ((task.description != null) && (task.description !== '')) payload.description = task.description;
            if ((task.status != null) && (task.status !== '')) payload.status = task.status;
            if ((task.priority != null) && (task.priority !== '')) payload.priority = task.priority;
            if ((task.due_date != null) && (task.due_date !== '')) {
                payload.due_date = new Date(task.due_date).toISOString();
            }
            if ((task.logged_time != null) && (task.logged_time !== '')) payload.logged_time = task.logged_time;
            if ((task.estimated_time != null) && (task.estimated_time !== '')) payload.estimated_time = task.estimated_time;

            console.log(`Sending update payload:`, payload);
            const updatedTaskResponse = await updateTask(task.task_id, payload);

            setTask(updatedTaskResponse.task);
            alert('Task Updated Successfully!');
        } catch (error) {
            console.error("Failed to update task:", error);
            alert("Failed to update: " + (error.response?.data?.message || error.message || "Unknown error occurred."));
        }

    }
    const handleInputChange = (field, value) => {
        setTask(prevTask => ({
            ...prevTask,
            [field]: value
        }));
    };

    let progressPercentage = 0;
    if (task && task.estimated_time > 0) {
        progressPercentage = Math.round((task.logged_time / task.estimated_time) * 100);
    }
    if (progressPercentage > 100) {
        progressPercentage = 100;
    }

    if (error) {
        return <div className="text-danger text-center mt-5">Error: {error}</div>;
    }

    if (!task) {
        return <div className="text-center mt-5">Loading task details...</div>;
    }

    return (

        <div className='tasks-page-container d-flex justify-content-center w-100 min-vh-100 bg-task'>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-12 col-md-10 col-lg-8 p-4 pb-1 rounded bg-white shadow-lg min-vh-100 mt-5 mb-5 w-75 d-flex flex-column'>

                        <div className="d-flex justify-content-between align-items-center mb-4 mt-1">

                            <form className="row g-3" onSubmit={updateTaskInfo}>
                                <div className="col-12">
                                    <label className='form-label' htmlFor='title'>Task Title</label>
                                    <input type='text' id='title' className='form-control' value={task.title || ''} onChange={(e) => handleInputChange("title", e.target.value)} />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        value={task.description || ''}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Status</label>
                                    <StatusDropDown value={task.status || ''} onChange={(e) => handleInputChange("status", e.target.value)} />

                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Priority</label>
                                    <PriorityDropdown value={task.priority || ''} onChange={(e) => handleInputChange("priority", e.target.value)} />

                                </div>
                                <div className="col-12">
                                    <label className="form-label">Due Date</label>
                                    <input type="datetime-local" className="form-control" value={task.due_date || ''} onChange={(e) => handleInputChange("due_date", e.target.value)} />

                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Estimated Time</label>

                                    <input type="number" className="form-control" id="estimated_time" value={task.estimated_time || ''} onChange={(e) => handleInputChange("estimated_time", e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Logged Time</label>
                                    <input type="text" className="form-control" id="logged_time" value={task.logged_time || ''} onChange={(e) => handleInputChange("logged_time", e.target.value)} />
                                </div>
                                <div>
                                    <p>Spent {task.logged_time} hours on task {task.title}</p>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar " role="progressbar" style={{ width: `${progressPercentage}%` }} aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100">
                                        {progressPercentage}%
                                    </div>
                                </div>

                                <div className="col-12 d-flex justify-content-end mt-4">
                                    <button type="button" className="btn btn-secondary me-2" onClick={() => navigate('/tasks')}>Close</button>
                                    <button type="button" className="btn btn-danger me-2" onClick={() => deleteTaskFunction()}>Delete Task</button>

                                    <button type="button" className="btn btn-primary" onClick={() => updateTaskInfo()}>Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TaskDetails
