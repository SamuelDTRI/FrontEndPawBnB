import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import dogsisterReducer from "./dogsisterSlice";
import sitterSlice from "./sitterSlice";
import ownerSlice from "./ownerSlice";
import dashboardsitterSlice from "./linksActives";
import adminUsersSlice from "./adminUsersSlice";
import dogsSlice from "./dogsSlice";
import reservationSlice from "./reservationSlice";
import localidadesSlice from "./localidadesSlice";
import sitterReserveSlice from "./sitterReserveSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    dogsister: dogsisterReducer,
    sitter: sitterSlice,
    owner: ownerSlice,
    dashboard: dashboardsitterSlice,
    adminUsers: adminUsersSlice,
    dogs: dogsSlice,
    reservation: reservationSlice,
    neighborhoodSitter: localidadesSlice,
    sitterReserve: sitterReserveSlice,
  },
});
