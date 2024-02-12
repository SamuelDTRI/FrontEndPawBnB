import { createSlice } from "@reduxjs/toolkit";

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
    console.log(action.payload.sitter)
      const {
        name,
        surName,
        phone,
        address,
        neighborhood,
        // city (no me devuelve)
        description,
        rates,
        email,
      } = action.payload.sitter;
      state.name = name;
      state.surName = surName;
      state.phone = phone;
      state.address = address;
      state.neighborhood = neighborhood;
      // state.city = city;
      state.description = description;
      state.rates = rates;
      state.email = email
         
    },
  },
});

export const { sitterInfo } = sitterSlice.actions;
export default sitterSlice.reducer;
