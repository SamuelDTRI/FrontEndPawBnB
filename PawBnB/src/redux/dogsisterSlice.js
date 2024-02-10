import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    dogsisters: [],
    locationFilter: '',
    dateFilter: null,
    priceFilter: null,
    reviewFilter: null,
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
            
        },

        setLocationFilter: (state, action) => {
            state.locationFilter = action.payload;
          },
          setDateFilter: (state, action) => {
            state.dateFilter = action.payload;
          },
          setPriceFilter: (state, action) => {
            state.priceFilter = action.payload;
          },
          setReviewFilter: (state, action) => {
            state.reviewFilter = action.payload;
          },
      
    }
});

export const { 
    addDogsister,
    setLocationFilter, 
    setDateFilter, 
    setPriceFilter, 
    setReviewFilter
 } = dogsisterSlice.actions;
export default dogsisterSlice.reducer;