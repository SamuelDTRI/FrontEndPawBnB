import {configureStore} from '@reduxjs/toolkit';
import dogsisterReducer from './dogsisterSlice';

export const store = configureStore({
    reducer:{
        dogsister:dogsisterReducer,
    }
})