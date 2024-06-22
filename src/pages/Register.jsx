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
            <label htmlFor="password">Contraseña:</label>
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
            <label htmlFor="role">Rol:</label>
            <select
                name="role"
                id="role"
                value={data.role}
                onChange={handleInput}
                required
            >
              <option value="Client">Cliente</option>
              <option value="Admin">Administrador</option>
            </select>
          </p>

          <button type="submit" id="registerSubmit">Registrarse</button>
        </form>
      </>
  );
};

export default Register;
