import React, { useEffect, useState } from "react";
import { deleteRide,fetchGetRides } from "../service/api";

const Dashboard = () => {
  const [data, setdata] = useState([]);
  const [render, setrender] = useState(0);


  useEffect(() => {
    const getRides = async () => {
      try {
        const response = await fetchGetRides(0, 2);
        setdata(response.data.content);
      } catch (error) {
        
        console.error(error);
      }
    };
    getRides();
  }, [render]);

  


  const handleDelete= async(id)=>{
    try{
        await deleteRide(id);
        setrender(render+1);
    }catch(error){
        console.error(error);
    }
   
  }



  return (
  <div>a
    {data.map((ride,index)=>(
        <div key={index} className="ride-item">
            <p>{ride.originName}</p>
            <p>{ride.destinationName}</p>
            <p>{ride.price}</p>
            <p>{ride.departureDate}</p>
            <button onClick={()=>{handleDelete(ride.id)}}>Eliminar</button>
            <button onClick={()=>{handleEdit(ride.id)}}>Editar</button>

        </div>
    ))}

  </div>

);
};

export default Dashboard;
