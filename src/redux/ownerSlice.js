import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  address: "",
  deleted: null,
  email: "",
  id: "",
  name: "",
  neighborhood: "",
  password: "",
  phone: "",
  photoProfile: null,
  role: "",
  surName: "",
  Dogs: [],
  
};

/*
export const ownerDogs = createAsyncThunk("owner/fetchDogs", async (id) => {
  const endpoint = `http://localhost:3000/owners/${id}`;
  try {
    const response = await axios.get(endpoint);
    return response.data.Dogs;
  } catch (error) {
    console.error("Error fetching owner's dogs:", error);
    throw error;
  }
});
 export const ownerId = (id) => async (dispatch) => {

  dispatch (infoOwner())
  const endpoint =  `http://localhost:3000/owners/${id}`;
  const response = await axios.get(endpoint);  
  const Dogs = response.data.Dogs

  try{
    console.log(response.data.Dogs)
    dispatch(ownerIdState(Dogs))
    return {Dogs};

  }catch(error){
    console.log(error)
  }
}; 
*/

// export const fetchOwner = createAsyncThunk(
//   "sitter/fetchSitter",
//   async (id) => {
//     try {
//       const { data } = await axios.get(`http://localhost:3000/sitters/${id}`);
//       return data;
//     } catch (error) {
//       console.error("Error al obtener la información del cuidador:", error);
//       throw error;
//     }
//   }
// );

export const ownerSlice = createSlice({
  name: "owner",
  initialState,
  reducers: {
    infoOwner: (state, action) => {
      const {
        address,
        deleted,
        email,
        id,
        name,
        neighborhood,
        password,
        phone,
        photo,
        role,
        surName,
      } = action.payload;

      state.address = address;
      state.deleted = deleted;
      state.email = email;
      state.id = id;
      state.name = name;
      state.neighborhood = neighborhood;
      state.password = password;
      state.phone = phone;
      state.photo = photo
      state.role = role;
      state.surName = surName;
    },
    ownerIdState: (state, action) => {
      state.Dogs= action.payload
      console.log(action.payload, "sadafdasd")
    },
    updateOwner: async (state, action) => {
      console.log(action.payload.updatedOwner)
      const ownerId = action.payload.updatedOwner.id;
      console.log(ownerId);
      try {
        const { data } = await axios.put(
          `http://localhost:3000/owners/${ownerId}`,
          action.payload.updatedOwner
        );
        
      } catch (error) {
        console.error("Error al actualizar el cuidador:", error);
        throw error;
      }
    },
  }
});



export const { infoOwner, updateOwner } = ownerSlice.actions;
export default ownerSlice.reducer;
