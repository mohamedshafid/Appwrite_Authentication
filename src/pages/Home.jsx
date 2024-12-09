import React, { useEffect, useState } from 'react';
import { getUser,LogoutUser } from '../lib/appwrite.config';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user,setUser]=useState(null);
  const navigate=useNavigate();

  useEffect(()=>{
    const getUserSession=async()=>{
      try {
        const response=await getUser();
        console.log("reponse is",response);
        setUser(response);
      } catch (error) {
        console.log(error);
      }
    }
    getUserSession();
  },[]);

  // logout action enabled

  
  return (
   <div
    style={{
      width:"100%",
      height:"100vh",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
    }}
   >
    <div>
      <h1>Mohamed Hafid</h1>
     <h1>{user?.email}</h1><br />
    </div>
   </div>
  )
}

export default Home