import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import axios from "axios";


// Obtenemos la lista de sitters
export const fetchSitters = createAsyncThunk("adminUsers/fetchSitters", async () => {
  const response = await axios.get("http://localhost:3000/sitters");
  return response.data;
});

// Obtenemos la lista de owners
export const fetchOwners = createAsyncThunk("adminUsers/fetchOwners", async () => {
  const response = await axios.get("http://localhost:3000/owners");
  return response.data;
});

//Definimos  la lista combinada de owner and sitters
const selectSitters = (state) => state.adminUsers.sitters;
const selectOwners = (state) => state.adminUsers.owners;

export const selectUsersList = createSelector(
  selectSitters,
  selectOwners,
  (sitters, owners) => [...sitters, ...owners]
);
const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState: {
    sitters: [],
    owners: [],
    usersList: [],
    status: "idle",
    error: null,
    filteredUsers: [],
  },
  reducers: {
    initialList : (state) => {
      (state.filteredUsers = selectUsersList(state));
        (state.usersList = selectUsersList(state));
    },
    sortUsersByName: (state, action) => {
      const sortedUser = [...state.filteredUsers];
      if (action.payload === "asc") {
        sortedUser.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      } else if (action.payload === "desc") {
        sortedUser.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
      }
      state.filteredUsers = sortedUser;
    },
    sortUsersByLastName: (state, action) => {
      const sortedUser = [...state.filteredUsers];
      if (action.payload === "asc") {
        sortedUser.sort((a, b) =>
          (a.surName || "").localeCompare(b.surName || "")
        );
      } else if (action.payload === "desc") {
        sortedUser.sort((a, b) =>
          (b.surName || "").localeCompare(a.surName || "")
        );
      }
      state.filteredUsers = sortedUser;
    },
    filterUsersByRole: (state, action) => {
      const role = action.payload;
      console.log(state.usersList)
      if (action.payload === 'all') {
        state.filteredUsers = state.usersList;
      } else {
        state.filteredUsers = state.filteredUsers.filter(user => user.role === role);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSitters.fulfilled, (state, action) => {
        state.sitters = action.payload;
      })
      .addCase(fetchOwners.fulfilled, (state, action) => {
        state.owners = action.payload;
      })
      .addMatcher(
        (action) =>
          [fetchSitters.pending, fetchOwners.pending].includes(action.type),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) =>
          [fetchSitters.rejected, fetchOwners.rejected].includes(action.type),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export const { sortUsersByName, sortUsersByLastName, initialList, filterUsersByRole} = adminUsersSlice.actions;

export default adminUsersSlice.reducer;
