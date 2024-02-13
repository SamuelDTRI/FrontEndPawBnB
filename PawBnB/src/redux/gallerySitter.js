import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sitters: [],
    sittesBackUp: [],
}

export const gallerySitter = createSlice({
    name: 'gallerySitterL', //! checar el nombre
    initialState,
    reducers: {
        GET_SITTERS: (state, action) => {
            state.sitters = action.payload;
            state.sittesBackUp = action.payload;
        },

        GET_BY_ID: (state, action) => {
            state.sitters = action.payload
        },
    }
});

export const { 
    GET_SITTERS,
    GET_BY_ID
    } = gallerySitter.actions;
export default gallerySitter.reducer;