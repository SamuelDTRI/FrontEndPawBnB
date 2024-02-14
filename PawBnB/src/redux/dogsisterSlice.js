import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dogsisters: [],
    copyDogsisters: [],
    priceFilter: null,
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
        setPriceFilter: (state, action) => {
            state.priceFilter = action.payload;
        },
        filterSearchbar:(state,action)=>{
            const lowercasePayload = action.payload.toLowerCase();
            const newFilteredCopyDogSisters = state.copyDogsisters.filter((sisters) =>
             sisters.city.toLowerCase().startsWith(lowercasePayload))
             state.copyDogsisters = newFilteredCopyDogSisters;
        }

        }
    }
)

export const { 
    addDogsister,
    setLocationFilter,
    setPriceFilter
    } = dogsisterSlice.actions;
export default dogsisterSlice.reducer;