import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const signUpSlice = createSlice({
  name: "signup",
  initialState: {
    success: false,
  }
});

export const signUpOwner = (data, role, navigate) => async (dispatch) =>{
  try {
    console.log(data)
    if (role === "Owner") {
      console.log("llegue");
      const endpoint = "https://backendpawbnb-production.up.railway.app/owners";
      const response = await axios.post(endpoint, data);

      const userId = response.data.id;
      const userRole = response.data.role;
      console.log({userRole})
      // if (response.data.id) {

      //   navigate("/Login");
      // }
      return { userId, userRole };

    } else if (role === "DogSitter") {
      console.log("Llegue a DogSitters");
      const endpoint = "https://backendpawbnb-production.up.railway.app/sitters";
      const response = await axios.post(endpoint, data);
  
      const  userId = response.data.id;
      const userRole = response.data.role;
      // if (response.data.id) {
      //   navigate("/Login");
      // }
      return { userId, userRole };
    }
  } catch (error) {
    console.log(error);
  }
};

export default signUpSlice.reducer;
