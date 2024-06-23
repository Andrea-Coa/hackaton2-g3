import React from 'react'
import { useState } from 'react';
import { fetchLogin } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        const res = await fetchLogin(username, password);
        localStorage.setItem('token', res.data.token);
        console.log(res.data.token);
        navigate("/dashboard");

    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" onChange={e => setUsername(e.target.value)} required/>
                <br />
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" onChange={e => setPassword(e.target.value)} required/>
                <br /> <br />
                <button type="submit" className='submit'>Submit</button>
            </form>
            <br /> <br /> <br /> <br />
            <button type="button" onClick={() => navigate("/auth/register")}>Register</button>
        </div>
    )
}

export default Login