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
    if (role === "Owner") {
      console.log("llegue");
      const endpoint = "http://localhost:3000/owners";
      const response = await axios.post(endpoint, data);

      const userId = response.data.id;
      const userRole = response.data.role;
      console.log(userRole)
      // if (response.data.id) {

      //   navigate("/Login");
      // }
      return { userId, userRole };

    } else if (role === "DogSitter") {
      console.log("Llegue a DogSitters");
      const endpoint = "http://localhost:3000/sitters";
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
