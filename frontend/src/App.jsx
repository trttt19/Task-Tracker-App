import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/signup'
import Tasks from './pages/Tasks'
import TaskDetails from './pages/TaskDetails'
import CreateNewTask from './pages/CreateNewTask'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
function App() {

  return (

    <Router>
      <div>
        <Routes >
          <Route path="/" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/:task_id" element={<TaskDetails />} />
          <Route path="/tasks/create" element={<CreateNewTask />} />
          {/* <Route path="*" element={<NoMatch/>}></Route> */}
        </Routes>

      </div>
    </Router>



  )
}

export default App
