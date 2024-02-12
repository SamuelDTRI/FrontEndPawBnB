import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import dogsisterReducer from './dogsisterSlice';
import sitterSlice from "./sitterSlice";

export const store = configureStore({
    reducer:{
        auth: authSlice,
        dogsister:dogsisterReducer,
        sitter: sitterSlice
    }
})