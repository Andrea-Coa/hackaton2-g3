import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRegister } from "../service/api";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
    role: "Client" // Valor predeterminado para el rol
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchRegister(data);
      alert(`Registro exitoso. Nombre de usuario: ${data.username}`);
      navigate("/login");
      console.log(response);
    } catch (error) {
      console.error(error);
      alert('Error en el registro');
    }
  };

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
      <>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="username">Nombre de usuario:</label>
            <input
                type="text"
                name="username"
                id="username"
                value={data.username}
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
