import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dogsisters: [],
  copyDogsisters: [],
  locationFilter: 'all', // Agregamos un filtro de ubicación predeterminado
  priceFilter: null,
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
      const copyDogsister = state.copyDogsisters;

      const filteredDogSisters = copyDogsister.filter((dogSister) => {
        if (dogSister.city) {
          return action.payload === 'all' || dogSister.city === action.payload;
        }
        return false;
      });

      state.locationFilter = action.payload;
      state.dogsisters = filteredDogSisters;
    },

    setPriceFilter: (state, action) => {
      const copyDogsister = state.copyDogsisters;

      const filteredDogSisters = copyDogsister.filter((dogSister) => {
        // Agregamos lógica de filtrado por precio
        return (
          (state.locationFilter === 'all' || dogSister.city === state.locationFilter) &&
          (state.priceFilter === null || dogSister.price <= state.priceFilter)
        );
      });

      state.priceFilter = action.payload;
      state.dogsisters = filteredDogSisters;
    },
  },
});

export const { addDogsister, setLocationFilter, setPriceFilter } = dogsisterSlice.actions;
export default dogsisterSlice.reducer;
