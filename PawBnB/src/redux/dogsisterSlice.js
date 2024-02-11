import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dogsisters: [],
    copyDogsisters: [],
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
            state.copyDogsisters = action.payload;
            state.dogsisters = action.payload;
        },

        setLocationFilter: (state, action) => {
        
            const copyDogsister = state.copyDogsisters;
        
            const filteredDogSisters = copyDogsister.filter((dogSister) => {
                
                if (dogSister.city) {
                    
                    return action.payload === 'all' || dogSister.city === action.payload;
                }
                return false; 
            });
            state.dogsisters = filteredDogSisters;
            
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