import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = () => async (dispatch) => {
  try {
    // Primera llamada a axios para obtener sitters
    const sittersResponse = await axios.get("http://localhost:3000/sitters");
    const sitters = sittersResponse.data;

    // Segunda llamada a axios para obtener owners
    const ownersResponse = await axios.get("http://localhost:3000/owners");
    const owners = ownersResponse.data;

    // Dispatch para inicializar tanto sitters como owners
    dispatch(initialList([...sitters,...owners]));
  } catch (error) {
    console.log(error.message);
  }
};
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
    initialList: (state, action) => {
      state.filteredUsers = action.payload;
      state.usersList = action.payload;
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
      if (role === "all") {
        state.filteredUsers = state.usersList;
      } else {
        state.filteredUsers = state.filteredUsers.filter(
          (user) => user.role === role
        );
      }
    },
    filterUsersByNeighborhood: (state, action) => {
      const barrio = action.payload;
      if (barrio === "all") {
        state.filteredUsers = state.usersList;
      } else {
        state.filteredUsers = state.filteredUsers.filter(
          (user) =>  user.neighborhood === barrio
        );
      }
    },
  },
});

export const {
  sortUsersByName,
  sortUsersByLastName,
  initialList,
  filterUsersByRole,
  filterUsersByNeighborhood,
} = adminUsersSlice.actions;

export default adminUsersSlice.reducer;
