import React from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../api/auth'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/tasks');
        }
    }, [navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = { email, password }
            const response = await loginUser(data)
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem("name", response.name);
            alert('Login successful ')
            navigate('/tasks');
        } catch (error) {
            setError(error.message); // shows backend message directly
        }

    }
    return (
        <div className='signup template d-flex justify-content-center align-items-center w-100 vh-100 bg-task'>
            <div className='w-50 p-5 rounded bg-white-task'>
                <h2 className='text-center'>Log in</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <label htmlFor="email">Email</label>
                        <input id='email' type="email" placeholder='Enter Email' required className='form-control' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="password">Password</label>
                        <input id='password' type="password" placeholder='min 6 char' required className='form-control' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <p className='text-danger'>{error}</p>} {/* Show API error */}

                    <div className='d-grid'>
                        <button className='btn btn-primary'>Log in</button>
                    </div>
                    <p className='text-right'>
                        Not a user <Link to="/auth/signup">Signup</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login