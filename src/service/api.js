import axios from "axios";

const URL = "https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com";

export const fetchLogin = async (body) => {
  try {
    const response = await axios.post(`${URL}/auth/login`, body);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      // console.log(token);
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const fetchRegister = async (data) => {
  try {
    const response = await axios.post(`${URL}/auth/register`, data);
    // if (response.status === 200) {
      // localStorage.setItem("token", response.data.token);
      // console.log(token);

    // }
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postProduct = async(body) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${URL}/api/products`, body,{
      headers: { Authorization: `Bearer ${token}`}
  });
  return response.data;
}



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