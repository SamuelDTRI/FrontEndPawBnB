import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  linkActive : "miInfo",
  linksActiveOwner : "miInfo"
};

export const dashboardsitterSlice = createSlice({
  name: "linksActive",
  initialState,
  reducers: {
    infoLink: (state, action) => {
      state.linkActive = action.payload;
    },
    infoLinkOwner: (state,action)=>{
      state.linksActiveOwner = action.payload
    }
  },

});

export const {infoLink, infoLinkOwner} = dashboardsitterSlice.actions;
export default dashboardsitterSlice.reducer;
