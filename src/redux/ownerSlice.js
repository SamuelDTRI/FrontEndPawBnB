import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Crear una acción asíncrona para actualizar el propietario
export const updateOwner = createAsyncThunk(
  "owner/updateOwner",
  async (updatedOwner, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/owners/${updatedOwner.id}`,
        updatedOwner
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const initialState = {
  address: "",
  deleted: null,
  email: "",
  id: "",
  name: "",
  neighborhood: "",
  password: "",
  phone: "",
  photoProfile: null,
  role: "",
  surName: "",
  Dogs: [],
};

export const ownerSlice = createSlice({
  name: "owner",
  initialState,
  reducers: {
    infoOwner: (state, action) => {
      const {
        address,
        deleted,
        email,
        id,
        name,
        neighborhood,
        password,
        phone,
        photo,
        role,
        surName,
      } = action.payload;

      state.address = address;
      state.deleted = deleted;
      state.email = email;
      state.id = id;
      state.name = name;
      state.neighborhood = neighborhood;
      state.password = password;
      state.phone = phone;
      state.photo = photo;
      state.role = role;
      state.surName = surName;
    },
    ownerIdState: (state, action) => {
      state.Dogs = action.payload;
      console.log(action.payload, "sadafdasd");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateOwner.fulfilled, (state, action) => {
        // Actualizar el estado con los datos del propietario actualizado
        return { ...state, ...action.payload };
      })
      .addCase(updateOwner.rejected, (state, action) => {
        // Manejar el error
        console.error(
          "Error al actualizar el propietario:",
          action.payload.error
        );
      });
  },
});

export const { infoOwner } = ownerSlice.actions;
export default ownerSlice.reducer;
