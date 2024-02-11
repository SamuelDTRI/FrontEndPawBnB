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

const sitterSlice = createSlice({
  name: "sitter",
  initialState: {
    currentSitter: null,
  },
});

export default sitterSlice.reducer;          