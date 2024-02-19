import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import dogsisterReducer from "./dogsisterSlice";
import sitterSlice from "./sitterSlice";
//import ownerSlice from "./ownerSlice";
import OwnerSlice from "./OwnerSlice";
import dashboardsitterSlice from "./linksActives";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    dogsister: dogsisterReducer,
    sitter: sitterSlice,
    owner: OwnerSlice,
    dashboard: dashboardsitterSlice
  },
});
