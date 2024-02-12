import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Navigate } from "react-router-dom";

const signUpSlice =  createSlice({
    name: 'signup',
    initialState:{
        success:false,
        
        
    },
    /*reducers: {

    }*/

});


export const signUpOwner = async (data, role, navigate) => {
    console.log(role)
    

    try {
        if (role==="Owner"){
            console.log("llegue")
            const endpoint= "http://localhost:3000/owners"
            const response = await axios.post(endpoint,data);
            console.log(response.data)
            if(response.data.id){
                navigate("/Login")
            }
            
            
        }else if (role === "DogSitter"){
            console.log("Llegue a DogSitters")
            const endpoint= "http://localhost:3000/sitters"
            const response = await axios.post(endpoint,data);
            if(response.data.id){
                navigate("/Login")
            }
           
            

        }

        
    } catch (error) {
        console.log(error)
    }
}