import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    dogsisters: [],
}

export const dogsisterSlice = createSlice({
    name: 'dogsister',
    initialState,
    reducers:{
        addDogsister:async(state) => {
            try {
                const { data } = await axios.get('http://localhost:3001/'); //falta definir ruta

                state.dogsisters = data;

            } catch (error) {
                throw Error(error.message);
            }
            
        }
    }
});

export const { addDogsister } = dogsisterSlice.actions;
export default dogsisterSlice.reducer;