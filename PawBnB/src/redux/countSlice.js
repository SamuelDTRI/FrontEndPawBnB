import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
}

export const countSlice = createSlice({
    name: 'count',
    initialState,
    reducers:{
        sumCount:(state) => {
            state.count = state.count + 1;
        },
        resCount:(state) => {
            state.count = state.count - 1;
        }
    }
});

export const { sumCount, resCount } = countSlice.actions;
export default countSlice.reducer;