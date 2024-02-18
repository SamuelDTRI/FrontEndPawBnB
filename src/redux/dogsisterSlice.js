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
          if (dogsister.rates) {
            let rates = parseInt(dogsister.rates);
            return rates >= minRates && rates <= maxRates;
          }
          return false;
        });
      }
    
      state.dogsisters = filteredDogSisters;
    },

    setOrder: (state, action) => {
      let orderDogsister = state.dogsisters;

      switch(action.payload){
        case 'orderNameA':
              orderDogsister = orderDogsister.sort((a, b) => a.name.localeCompare(b.name));
              state.dogsisters = orderDogsister;
          break;

        case 'orderNameD':
              orderDogsister = orderDogsister.sort((a, b) => b.name.localeCompare(a.name));
              state.dogsisters = orderDogsister;
          break;

        case 'orderRatesA':
              orderDogsister = orderDogsister.sort((a, b) => a.rates - b.rates);
              state.dogsisters = orderDogsister;
          break;

        case 'orderRatesD':
          orderDogsister = orderDogsister.sort((a, b) => b.rates - a.rates);
          state.dogsisters = orderDogsister;
        break;

        default: state.dogsisters = state.dogsisters;

      }
    },
  },
});

export const { addDogsister, setFilters, setOrder } = dogsisterSlice.actions;
export default dogsisterSlice.reducer;
