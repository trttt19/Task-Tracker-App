import React from 'react'
import { useEffect, useState } from "react";
import TaskTable from "../components/TaskTable";
import { getAllTasks } from '../api/tasks';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

import Pagination from '../components/Pagination';
import "../css/styles.css"


function Tasks() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("")
    const [error, setError] = useState('');
    const [next, setHasNext] = useState(false);
    const [page, setPage] = useState(1);
    useEffect(() => {
        const storedName = localStorage.getItem("name");
        //
        if (storedName) setUserName(storedName);
        const fetchTasks = async () => {
            try {
                const response = await getAllTasks({ title: search, page: page })
                const newTaskArray = response.tasks || []
                setTasks(prevTasks => {
                    if (page === 1)
                        return newTaskArray
                    else
                        return [...prevTasks, ...newTaskArray];
                })
                if (newTaskArray.length >= 10) {
                    setHasNext(true);

                }
                else {

                    setHasNext(false);
                }
            } catch (error) {
                setHasNext(false);
                setError(error.message);
            }
        }
        const debounceTimer = setTimeout(fetchTasks, 500);
        return () => clearTimeout(debounceTimer);
    }, [page, search]);
    const handleLoadMore = () => {
        if (next) {
            setPage(prevPage => prevPage + 1);
        }
    };
    const handleLogout = () => {

        localStorage.removeItem('token');

        navigate('/auth/login');
    };
    return (

        <div className='tasks-page-container d-flex justify-content-center w-100 min-vh-100 bg-task'>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-12 col-md-10 col-lg-8 p-4 pb-1 rounded bg-white shadow-lg min-vh-100 mt-5 mb-5 w-75 d-flex flex-column'>
                        <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-center mb-4 mt-1">

                                <h1>Welcome back, {userName}</h1>
                                <button type="button" className="btn btn-primary" onClick={() => handleLogout()}>logout</button>
                            </div>
                            <div>
                                <NavBar value={search} onChange={setSearch}></NavBar>
                            </div>
                            <div>
                                <TaskTable tasks={tasks} />
                                {error && <p className='text-danger'>{error}</p>} {/* Show API error */}

                            </div>

                        </div>
                        <Pagination hasNext={next} onClick={handleLoadMore} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Tasks