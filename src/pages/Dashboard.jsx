import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRoleBasedOnToken } from '../services/api';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || token === 'null') {
            console.log("Debes logearte primero");
            navigate("/auth/login");
        } else {
            
            const role = getRoleBasedOnToken();

            if (role === 'client') {
                console.log("Eres cliente")
                navigate("/clientdashboard");
            } else if (role === 'Admin') {
                console.log("Eres administrador");
                navigate("/admindashboard");
            } else {
                console.log("Rol desconocido, te enviamos al dashboard de cliente por defecto");
                navigate("/clientdashboard");
            }
        }
    }, [navigate]);

    // Función auxiliar para decodificar el token JWT (simplificada)
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return {};
        }
    };

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Dashboard</h1>
        </div>
    );
};

export default Dashboard;
