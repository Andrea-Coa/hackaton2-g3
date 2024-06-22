import React, { useState } from 'react'
import { fetchLogin } from '../service/api';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const [data, setdata] = useState({
        username:'',
        password: ''
    });

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetchLogin(data)
        navigate('/dashboard')
        console.log(response)
    }


    const handleInput = (e)=>{
        setdata({...data,
            [e.target.name]: e.target.value}
        )
    };


  return (
    <>
    <form onSubmit={handleSubmit}>
        <p>
        <label htmlFor="username">Username</label>
        <input type="username" name="username" id="username"  value={data.username} onChange={handleInput} required/>
        </p>
        <p>
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" value={data.password} onChange={handleInput} required/>
        </p>

        <button type="submit">Sign In</button>
    </form>
    <button onClick={()=> {navigate('/auth/register')}}>Sign Up</button>
    </>
  )
}

export default Login
