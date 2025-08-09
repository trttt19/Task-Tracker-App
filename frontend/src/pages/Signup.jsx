import React from 'react'
import { Link } from 'react-router-dom'
import { signupUser } from '../api/auth'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = { name, email, password }
            await signupUser(data)
            alert('Signup successful')
            navigate('/auth/login');
        } catch (error) {
            setError(error.message);
        }

    }
    return (
        <div className='signup template d-flex justify-content-center align-items-center w-100 vh-100 bg-task'>
            <div className='w-50 p-5 rounded bg-white-task '>
                <h2 className='text-center'>Sign up</h2>
                <form onSubmit={handleSubmit} >
                    <div className='mb-2'>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" placeholder='Enter Name' required className='form-control' onChange={(e) => setName(e.target.value)} />
                    </div>
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
                        <button type="submit" className='btn btn-primary'>Sign up</button>
                    </div>
                    <p className='text-right'>
                        Already a user <Link to="/auth/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup