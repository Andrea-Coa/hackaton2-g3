import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRegister } from "../service/api";
const Register = () => {
  const navigate = useNavigate();

  const [data, setdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await fetchRegister(data);
        navigate("/dashboard");
        console.log(response);
    }catch(error){
        console.error(error);
    }
   
  };

  const handleInput = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="firstName">Name:</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={data.firstName}
          onInput={handleInput} 
          required
        />
      </p>

      <p>
        <label htmlFor="lastName: ">LastName:</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={data.lastName}
          onInput={handleInput} 
          required
        />
      </p>
      <p>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" value={data.email} onInput={handleInput} 
          required/>
      </p>

      <p>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={data.password}
          onInput={handleInput} 
          required
        />
      </p>

      <p>
        <label htmlFor="phone">Phone:</label>
        <input type="number" name="phone" id="phone" value={data.phone} onInput={handleInput} 
          required />
      </p>
      <button type="submit"  id="registerSubmit" >Registrarse</button>

    </form>
    </>
  );
};

export default Register;
