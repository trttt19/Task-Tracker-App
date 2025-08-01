import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/signup'
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (

    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />
        </Routes>
      </div>
    </Router>



  )
}

export default App
