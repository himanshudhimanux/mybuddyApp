import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




// Async thunk to fetch notices from API
export const fetchNotices = createAsyncThunk("notices/fetchNotices", async () => {

  const token = await AsyncStorage.getItem("token");

  const response = await axios.get("https://mybuddy-backend.onrender.com/api/notices", 
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
});

const noticeSlice = createSlice({
  name: "notices",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchNotices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default noticeSlice.reducer;
