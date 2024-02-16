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
};

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
    updateOwner: async (state, action) => {
      console.log(action.payload.updatedOwner)
      try {
        const { data } = await axios.put(
          `http://localhost:3000/owners`,
          action.payload.updatedOwner
        );
        
      } catch (error) {
        console.error("Error al actualizar el cuidador:", error);
        throw error;
      }
    },
  },
});

export const { infoOwner, updateOwner } = ownerSlice.actions;
export default ownerSlice.reducer;
