import axios from "axios";
import { jwtDecode } from 'jwt-decode';


const URL = "https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/";

export const getRoleBasedOnToken = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  return decodedToken.role;
}

// buscar producto por ID
export const getProductById = async(id) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${URL}/items/${id}`, {
    headers: {'Authorization':`Bearer ${token}`,},
  });
  return response.data;  
}

// eliminar producto por ID
export const deleteProductId = async(id) => {
  const token = localStorage.getItem('token');
  await axios.delete(`${URL}/items/${id}`, 
  {headers: {'Authorization':`Bearer ${token}`,},});
}

export const putItem = async (body) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${URL}/items/${body.itemId}`, body, {
    headers: {'Authorization':`Bearer ${token}`,},
  });
};

export const addToCart = async (body) => {
    const token = localStorage.getItem('token');
    await axios.put(`${URL}/cart`, body, 
    {headers: {'Authorization':`Bearer ${token}`,},});
}


// OBTENER EL CARRTIO DE UN USUARIO
export const fetchCart = async () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const response = await axios.get(`${URL}/cart/${userId}`, {
    headers: {'Authorization':`Bearer ${token}`,},
  });
  return response.data;

}

export const fetchLogin = async (body) => {
  try {
    const response = await axios.post(`${URL}/auth/login`, body);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      console.log(token);
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const fetchRegister = async (username, password, role) => {
  try {
    const response = await axios.post(`${URL}/auth/register`, body);
    if (response.status == 200) {
      localStorage.setItem("token", response.data.token);
      console.log(token);

    }
    return response;
  } catch (error) {
    console.error(error);
  }
};



export const postProduct = async (body) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(`${URL}/api/products`, body, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error; // Optionally rethrow the error to handle it in components
  }
};


export const fetchGetRides = async (page, size) => {
  try {
    const response = await axios.get(
      `${URL}/ride/user?page=${page}&size=${size}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const putRide = async(id,body)=>{
  try{
    const response= await axios.put(`${URL}/ride/${id}/status`, body,
    {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    }
  )
  return response;
  }catch(error){
    console.error(error);
  }
}


export const deleteRide = async(id)=>{
    try{
        const response= await axios.delete(`${URL}/ride/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        return response;

    }catch(error){
        console.error(error);
    }
}

