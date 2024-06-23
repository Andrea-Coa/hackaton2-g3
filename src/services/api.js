import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const BACKEND_URL = 'https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com';

export const getRoleBasedOnToken = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  console.log(decodedToken.role);
  return decodedToken.role;
}

export async function fetchLogin(username, password){
  const response = await axios.post(`${BACKEND_URL}/auth/login`, {username, password});
  return response;
}

export async function fetchRegister(username, password, role){
  const response = await axios.post(`${BACKEND_URL}/auth/register`, {username, password, role});
  return response;
}

export const createItem = async (body) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(BACKEND_URL + '/item', body, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

export const editItem = async (body) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(BACKEND_URL + '/item', body, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error editing item:', error);
    throw error;
  }
};

export const deleteItem = async (itemId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(BACKEND_URL + '/item/' + {itemId}, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

export const getItem = async (itemId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(BACKEND_URL + '/item/' + {itemId}, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting item:', error);
    throw error;
  }
};

export const getItems = async (limit, lastKey) => {
  try {
    const response = await axios.get(BACKEND_URL + '/items', {
      params: { limit, lastKey }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting items:', error);
    throw error;
  }
};

export const buyCart = async (body) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(BACKEND_URL + '/buy', body, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error buying cart:', error);
    throw error;
  }
};

export const addItemToCart = async (body) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(BACKEND_URL + '/cart', body, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};

export const removeItemFromCart = async (body) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(BACKEND_URL + '/cart', {
      headers: {
        Authorization: 'Bearer ' + token
      },
      data: body
    });
    return response.data;
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};

export const getUserCart = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(BACKEND_URL + '/cart/' + {userId}, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting user cart:', error);
    throw error;
  }
};
