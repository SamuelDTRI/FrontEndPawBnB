import { configureStore } from '@reduxjs/toolkit';

import countReducer from './countSlice';
import authSlice from './authSlice';

export const store = configureStore({
    reducer:{
        count:countReducer,
        auth: authSlice,
    }
})