import React, { useState } from 'react'
import PriorityDropdown from '../components/PriorityDropdown'
import StatusDropDown from '../components/StatusDropDown';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../api/tasks';


function CreateNewTask() {

    const [task, setTask] = useState({
        title: '',
        description: '',
        status: '',
        priority: '',
        estimated_time: '',
        logged_time: '',
        due_date: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (field, value) => {
        setTask((prevTask) => ({
            ...prevTask,
            [field]: value,
        }));
    };

    const createTaskInfo = async (event) => {
        event.preventDefault()
        try {
            const payload = {};
            if ((task.title !== undefined)) payload.title = task.title;
            if ((task.description !== undefined) && (task.description !== '')) payload.description = task.description;
            if ((task.status !== undefined) && (task.status !== '')) payload.status = task.status;
            if ((task.priority !== undefined) && (task.priority !== '')) payload.priority = task.priority;
            if ((task.due_date !== undefined) && (task.due_date !== '')) {
                payload.due_date = new Date(task.due_date).toISOString();
            }
            if ((task.logged_time !== undefined) && (task.logged_time !== '')) payload.logged_time = task.logged_time;
            if ((task.estimated_time !== undefined) && (task.estimated_time !== '')) payload.estimated_time = task.estimated_time;
            console.log(payload)
            await createTask(payload);
            alert('Task Created Successfully!');
            navigate('/tasks');
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Failed to create task');
        }
    };



    if (error) {
        return <div className="text-danger text-center mt-5">Error: {error}</div>;
    }

    return (

        <div className='tasks-page-container d-flex justify-content-center w-100 min-vh-100 bg-task'>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-12 col-md-10 col-lg-8 p-4 pb-1 rounded bg-white shadow-lg min-vh-100 mt-5 mb-5 w-75 d-flex flex-column'>

                        <div className="d-flex justify-content-between align-items-center mb-4 mt-1">

                            <form className="row g-3" onSubmit={createTaskInfo}>
                                <div className="col-12">
                                    <label className='form-label' htmlFor='title'>Task Title</label>
                                    <input required type='text' id='title' className='form-control' value={task.title || ''} onChange={(e) => handleInputChange("title", e.target.value)} />
                                </div>
                                <div className="col-12">
                                    <label htmlFor='description' className="form-label">Description</label>
                                    <textarea
                                        id='description'
                                        type="text"
                                        className="form-control"
                                        value={task.description || ''}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor='status' className="form-label">Status</label>
                                    <StatusDropDown id='status' value={task.status || 'toDo'} onChange={(e) => handleInputChange("status", e.target.value)} />

                                </div>
                                <div className="col-md-6">
                                    <label htmlFor='priority' className="form-label">Priority</label>
                                    <PriorityDropdown id='priority' value={task.priority || 'low'} onChange={(e) => handleInputChange("priority", e.target.value)} />

                                </div>
                                <div className="col-12">
                                    <label htmlFor='due_date' className="form-label">Due Date</label>
                                    <input id='due_date' type="datetime-local" className="form-control" value={task.due_date || ''} onChange={(e) => handleInputChange("due_date", e.target.value)} />

                                </div>
                                <div className="col-md-6">
                                    <label htmlFor='estimated_time' className="form-label">Estimated Time</label>

                                    <input type="number" className="form-control" id="estimated_time" value={task.estimated_time || ''} onChange={(e) => handleInputChange("estimated_time", e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor='logged_time' className="form-label">Logged Time</label>
                                    <input type="number" className="form-control" id="logged_time" value={task.logged_time || ''} onChange={(e) => handleInputChange("logged_time", e.target.value)} />
                                </div>



                                <div className="col-12 d-flex justify-content-end mt-4">
                                    <button type="button" className="btn btn-secondary me-2" onClick={() => navigate('/tasks')}>Close</button>
                                    <button type="submit" className="btn btn-primary" >Add Task</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CreateNewTask
