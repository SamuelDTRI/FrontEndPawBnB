import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  surName: "",
  phone: "",
  address: "",
  neighborhood: "",
  city: "",
  description: "",
  rate: "",
};

export const sitterSlice = createSlice({
  name: "sitter",
  initialState,
  reducers: {
    sitterInfo: (state, action) => {
      const {
        name,
        surName,
        phone,
        address,
        neighborhood,
        city,
        description,
        rate,
      } = action.payload;

      state.name = name;
      state.surName = surName;
      state.phone = phone;
      state.address = address;
      state.neighborhood = neighborhood;
      state.city = city;
      state.description = description;
      state.rate = rate;
    },
  },
});

export const { sitterInfo } = sitterSlice.actions;
export default sitterSlice.reducer;
