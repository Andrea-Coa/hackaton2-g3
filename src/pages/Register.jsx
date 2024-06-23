import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchRegister } from '../services/api';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");


    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        console.log(username, password, role);
        const res = await fetchRegister(username, password, role);
        localStorage.setItem('token', res.data.token);
        console.log(res.data.token);
        navigate("/dashboard");

    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" onChange={e => setUsername(e.target.value)} required/>
                <br />
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" onChange={e => setPassword(e.target.value)} required/>
                <br />
                <label htmlFor="role">Role: </label>
                <input type="text" id="role" onChange={e => setRole(e.target.value)} required/>
                <br /> <br />
                <button type="submit" className='submit'>Submit</button>
            </form>
            <br />
            <button type="button" onClick={() => navigate("/auth/login")}>Login</button>
        </div>
    )
}

export default Register
