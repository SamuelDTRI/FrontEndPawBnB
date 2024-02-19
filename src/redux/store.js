import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import dogsisterReducer from "./dogsisterSlice";
import sitterSlice from "./sitterSlice";
import ownerSlice from "./ownerSlice";
import dashboardsitterSlice from "./linksActives";
import adminUsersSlice from "./adminUsersSlice";
import dogsSlice from "./dogsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    dogsister: dogsisterReducer,
    sitter: sitterSlice,
    owner: ownerSlice,
    dashboard: dashboardsitterSlice,
    adminUsers: adminUsersSlice,
    dogs: dogsSlice,
  },
});
