import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./authSlice";

export const fetchUsers = () => async (dispatch) => {
  try {
    // Primera llamada a axios para obtener sitters
    // const sittersResponse = await axios.get("https://backendpawbnb-production.up.railway.app/sitters");
    const sittersResponse = await axios.get("https://backendpawbnb-production.up.railway.app/sitters");
    const sitters = sittersResponse.data? sittersResponse.data : [];

    // Segunda llamada a axios para obtener owners
    // const ownersResponse = await axios.get("https://backendpawbnb-production.up.railway.app/owners");
    const ownersResponse = await axios.get("https://backendpawbnb-production.up.railway.app/owners");
    const owners = ownersResponse.data ?ownersResponse.data : [];

    // Dispatch para inicializar tanto sitters como owners
    dispatch(initialList([...sitters,...owners]));
    dispatch(setOwners(owners));
    dispatch(setSitters(sitters));
  } catch (error) {
    console.log(error.message);
  }
};

const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState: {
    sitters: [],
    owners: [],
    usersList: [],
    status: "idle",
    error: null,
    filteredUsers: [],
    isLoading: false,
    isLoggedIn: false,
    adminId: null,
    adminRole: null,
    adminDeleted: null,
    adminInfo:{},
    userInfo: {},
  },
  reducers: {
    initialList: (state, action) => {
      state.filteredUsers = action.payload;
      state.usersList = action.payload;
    },
    setOwners: (state, action) => {
      state.owners = action.payload;
    },
    setSitters: (state, action) => {
      state.sitters = action.payload;
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
          (user) => user.neighborhood === barrio
        );
      }
    },
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.adminId = action.payload.userId;
      state.adminRole = action.payload.userRole;
      state.adminDeleted = action.payload.userDeleted;
    },
    adminLoginFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userId = null;
      state.userRole = null;
    },
    setUserInfo(state, action){
      state.userInfo = action.payload;
    },
    setAdminInfo(state, action){
      state.adminInfo = action.payload;
    }
  },
});

export const loginAdmin = (formData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(
      `https://backendpawbnb-production.up.railway.app/admin/login`,
      formData
    );
    if(response.data){
      const { userId, userRole, userDeleted } = response.data;
      dispatch(loginSuccess(response.data));
      const requestedInfo = await axios.get(`https://backendpawbnb-production.up.railway.app/admin/${userId}`);
      if(requestedInfo) {
        dispatch(setAdminInfo(requestedInfo.data));
      }
      return {
        userId,
        userRole,
        userDeleted
      };
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.error;
      dispatch(adminLoginFailure(errorMessage));
    } else {
      dispatch(adminLoginFailure(error.message));
    }
  }
};

export const getUserInfo = ( id, role) => async (dispatch)=> {
  try {
    if( role === "Owner") {
      const response = await axios.get(`https://backendpawbnb-production.up.railway.app/owners/${id}`);
      console.log(response.data)
      dispatch(setUserInfo(response.data));
    }else {
      const response = await axios.get(`https://backendpawbnb-production.up.railway.app/sitters/${id}`);
      dispatch(setUserInfo(response.data));
    }
  } catch (error) {
    const errorMessage = error.response.data.error;
    dispatch(loginFailure(errorMessage));
  }
};

export const {
  sortUsersByName,
  sortUsersByLastName,
  initialList,
  setOwners,
  setSitters,
  filterUsersByRole,
  filterUsersByNeighborhood,
  setUserInfo,
  setAdminInfo,
  adminLoginFailure,
} = adminUsersSlice.actions;

export default adminUsersSlice.reducer;
