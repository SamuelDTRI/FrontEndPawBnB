import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const signUpSlice =  createSlice({
    name: 'signup',
    initialState:{
        loading: false,
        error: null,
        success:false,
        userInfo :null
        
    },
    /*reducers: {

    }*/

});


export const signUpOwner = async (data, role) => {
    console.log(role)
    

    try {
        if (role==="Owner"){
            const endpoint= "http://localhost:3000/owners"
            const response = await axios.post(endpoint,data);
            return response.data;
        }else if (role === "DogSitter"){
            const endpoint= "http://localhost:3000/sitters"
            const response = await axios.post(endpoint,data);
            return response.data;

        }

        
    } catch (error) {
        console.log(error)
    }
}