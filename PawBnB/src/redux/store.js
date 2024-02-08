import {configureStore} from '@reduxjs/toolkit';
import countReducer from './countSlice';
import dogsisterReducer from './dogsisterSlice';

export const store = configureStore({
    reducer:{
        count:countReducer,
        dogsister:dogsisterReducer,
    }
})