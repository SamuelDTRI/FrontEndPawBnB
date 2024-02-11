import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCurrentSitter = createAsyncThunk(
  "sitter/fetchCurrentSitter",
  async () => {
    const response = await axios.get("/api/sitters/current");
    return response.data;
  }
);

export const updateSitter = createAsyncThunk("sitter/update", async (data) => {
  const response = await axios.put("http://localhost:3000/sitters", data);
  return response.data;
});

export const fetchSitterById = createAsyncThunk(
  "sitter/fetchSitterById",
  async (sitterId) => {
    const response = await axios.get(`/api/sitters/${sitterId}`);
    return response.data;
  }
);

const sitterSlice = createSlice({
  name: "sitter",
  initialState: {
    currentSitter: null,
    sitterDetail: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSitterById.fulfilled, (state, action) => {
        state.sitterDetail = action.payload;
      })
      .addCase(fetchCurrentSitter.fulfilled, (state, action) => {
        state.currentSitter = action.payload;
      });
    builder
      .addCase(fetchSitterById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSitterById.fulfilled, (state, action) => {
        state.loading = false;
        state.sitterDetail = action.payload;
      })
      .addCase(fetchSitterById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default sitterSlice.reducer;          