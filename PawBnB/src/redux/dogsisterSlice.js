import { createSlice } from "@reduxjs/toolkit";

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
    reducers: {
        addDogsister: (state, action) => {
            state.dogsisters = action.payload;
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