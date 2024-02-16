import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dogsisters: [],
  copyDogsisters: [],
};

export const dogsisterSlice = createSlice({
  name: 'dogsister',
  initialState,
  reducers: {
    addDogsister: (state, action) => {
      state.copyDogsisters = action.payload;
      state.dogsisters = action.payload;
    },

    setFilters: (state, action) => {
      const { location, price } = action.payload;
      let filteredDogSisters = state.copyDogsisters;
    
      if (location) {
        filteredDogSisters = filteredDogSisters.filter(dogSister => {
          if (dogSister.neighborhood) {
            return location === 'all' || dogSister.neighborhood === location;
          }
          return false;
        });
      }
    
      if (price) {
        const { minRates, maxRates } = price;
        filteredDogSisters = filteredDogSisters.filter(dogsister => {
          if (dogsister.pay) {
            let pay = parseInt(dogsister.pay);
            return pay >= minRates && pay <= maxRates;
          }
          return false;
        });
      }
    
      state.dogsisters = filteredDogSisters;
    },

  },
});

export const { addDogsister, setFilters } = dogsisterSlice.actions;
export default dogsisterSlice.reducer;
