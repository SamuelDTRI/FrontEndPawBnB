import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  linkActive : "miInfo"
};

export const dashboardsitterSlice = createSlice({
  name: "linksActive",
  initialState,
  reducers: {
    infoLink: (state, action) => {
      state.linkActive = action.payload;
    },
  },
});

export const {infoLink} = dashboardsitterSlice.actions;
export default dashboardsitterSlice.reducer;
