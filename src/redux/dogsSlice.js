import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createDog = createAsyncThunk(
  "dogs/createDog",
  async (createdDog) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/dogs",
        createdDog
      );
      return data;
    } catch (error) {
      console.error("Error al cargar al perro:", error);
      throw error;
    }
  }
);

const dogsSlice = createSlice({
  name: "dogs",
  initialState: {
    dogsList: [],
    selectedDog: null,
    currentDog: null,
  },
  reducers: {
    setDogsList: (state, action) => {
      state.dogsList = action.payload;
    },
    setCurrentDog: (state, action) => {
      state.currentDog = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createDog.fulfilled, (state, action) => {
      // Agregar el perro recién creado a la lista
      state.dogsList = [...state.dogsList, action.payload];
    });
  },
});

export const { setDogsList, setCurrentDog, createdDog } = dogsSlice.actions;
export default dogsSlice.reducer;
