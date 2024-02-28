import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    neighborhoods: [],
    sitterCount: {},
    status: "idle",
    error: null,
};

export const fetchNeighborhood = createAsyncThunk(
    "neighborhoods/fetchSitters",
    async () => {
        try {
            const { data } = await axios.get(`https://backendpawbnb-production.up.railway.app/sitters`);
            console.log("Datos cargados correctamente:", data);
            return data;
        } catch (error) {
            console.error("Error al obtener la información de los cuidadores:", error);
            throw error;
        }
    }
);

export const localidadesSlice = createSlice({
    name: 'neighborhoodSitter',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchNeighborhood.fulfilled, (state, action) => {
            state.status = 'succeeded';
            const allNeighborhoods = action.payload.map((cuidador) => cuidador.neighborhood);
            state.neighborhoods = [...new Set(allNeighborhoods)]; 
            // Set es para obtener elementos únicos

            state.sitterCount = {};
            action.payload.forEach((cuidador) => {
                state.sitterCount[cuidador.neighborhood] = (state.sitterCount[cuidador.neighborhood] || 0) + 1;
            });
        })
        .addCase(fetchNeighborhood.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            console.error("Error al cargar las localidades:", action.error.message);
        });
    },
});

export const selectNeighborhoods = (state) => state.neighborhoodSitter.neighborhoods;
export const selectSittersCount = (state) => state.neighborhoodSitter.caregiversCount;

export default localidadesSlice.reducer;
