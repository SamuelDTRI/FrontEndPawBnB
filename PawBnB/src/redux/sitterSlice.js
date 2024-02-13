import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  name: "",
  surName: "",
  phone: "",
  address: "",
  neighborhood: "",
  city: "",
  description: "",
  rates: "",
};

export const sitterSlice = createSlice({
  name: "sitter",
  initialState,
  reducers: {
    sitterInfo: (state, action) => {
      console.log(action.payload);
      const {
        name,
        surName,
        phone,
        address,
        dateOfBirth,
        neighborhood,
        // city (no me devuelve)
        description,
        rates,
        email,
      } = action.payload;

      state.name = name;
      state.surName = surName;
      state.phone = phone;
      state.address = address;
      state.dateOfBirth = dateOfBirth;
      state.neighborhood = neighborhood;
      // state.city = city;
      state.description = description;
      state.rates = rates;
      state.email = email;
    },
    updateSitter: async (state, action) => {
      try {
        const { data } = await axios.put(
          `http://localhost:3000/sitters/${action.payload.id}`,
          action.payload.updatedSitter
        );
        console.log(data);
        return data;
      } catch (error) {
        console.error("Error al actualizar el cuidador:", error);
        throw error;
      }
    },
  },
});

export const { sitterInfo, updateSitter } = sitterSlice.actions;
export default sitterSlice.reducer;
