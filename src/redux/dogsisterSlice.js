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

    setLocationFilter: (state, action) => {
      const copyDogsister = state.dogsisters;

      const filteredDogSisters = copyDogsister.filter((dogSister) => {
        if (dogSister.neighborhood) {
          return action.payload === 'all' || dogSister.neighborhood === action.payload;
        }
        return false;
      });

      state.dogsisters = filteredDogSisters;
    },

    setPriceFilter: (state, action) => {
      const copyDogsister = state.dogsisters;

      const filteredDogSistersRates = copyDogsister.filter(dogsister => {

        if(dogsister.pay){
          let pay = parseInt(dogsister.pay);
          return pay >= action.payload.minRates && pay <= action.payload.maxRates;
        }
      });

      state.dogsisters = filteredDogSistersRates;
    },

  },
});

export const { addDogsister, setLocationFilter, setPriceFilter } = dogsisterSlice.actions;
export default dogsisterSlice.reducer;
