import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import dogsisterReducer from './dogsisterSlice';

export const store = configureStore({
    reducer:{
        auth: authSlice,
        dogsister:dogsisterReducer,
    }
})