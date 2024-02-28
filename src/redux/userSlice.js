import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    userRole: null,
    userDeleted: null,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.userRole = action.payload.userRole;
      state.userDeleted = action.payload.userDeleted;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.userId = null;
      state.userRole = null;
      state.userDeleted = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
