import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dogsisters: [],
}

export const dogsisterSlice = createSlice({
    name: 'dogsister',
    initialState,
    reducers:{
        addDogsister:(state, action) => {
            state.dogsisters = action.payload;
        }
    }
});

export const { addDogsister } = dogsisterSlice.actions;
export default dogsisterSlice.reducer;