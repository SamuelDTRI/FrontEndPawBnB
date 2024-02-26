import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reservas:[] 
};

export const sitterReserveSlice = createSlice({
    name: "sitterReserve",
    initialState,
    reducers: {
     GuardarReservas: (state,action) =>{
        console.log(action.payload)
      state.reservas = action.payload
    }
    },
});

export const {GuardarReservas} = sitterReserveSlice.actions;
export default sitterReserveSlice.reducer;