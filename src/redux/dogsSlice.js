import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loadDogsByOwner = createAsyncThunk(
  "dogs/loadDogsByOwner",
  async (ownerId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/dogs?ownerId=${ownerId}`
      );
      return data;
    } catch (error) {
      console.error("Error al cargar los perros del dueño:", error);
      throw error;
    }
  }
);

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

export const updateDog = createAsyncThunk(
  "dogs/updateDog",
  async ({ dogId, updatedDogData }) => {
    try {
      const { data } = await axios.put(
        `https://localhost:3000/dogs/${dogId}`,
        updatedDogData
      );
      return data;
    } catch (error) {
      console.error("Error al actualizar el perro:", error);
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
    builder.addCase(loadDogsByOwner.fulfilled, (state, action) => {
      const ownerId = action.meta.arg;
      const dogsByOwner = action.payload.filter(
        (dog) => dog.ownerId === ownerId
      );
      console.log({dogsByOwner})
      state.dogsList = dogsByOwner;
    });
    builder.addCase(createDog.fulfilled, (state, action) => {
      state.dogsList = [...state.dogsList, action.payload];
    });
    builder.addCase(updateDog.fulfilled, (state, action) => {
      const updatedDog = action.payload;
      const index = state.dogsList.findIndex((dog) => dog.id === updatedDog.id);
      if (index !== -1) {
        state.dogsList[index] = updatedDog;
      }
    });
  },
});

export const { setDogsList, setCurrentDog } = dogsSlice.actions;
export default dogsSlice.reducer;
