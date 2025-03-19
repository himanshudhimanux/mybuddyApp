import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchActiveFees = createAsyncThunk(
  "studentFees/fetchActiveFees",
  async (studentId) => {
    const response = await axios.get(`https://mybuddy-backend.onrender.com/api/fees/${studentId}`);
    return response.data;  // Ensure this returns correct data
  }
);

const studentFeeSlice = createSlice({
  name: "studentFees",
  initialState: {
    activeFees: [],  // ✅ Corrected from 'fees' to 'activeFees'
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveFees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchActiveFees.fulfilled, (state, action) => {
        console.log("API Response:", action.payload); // Debugging
        state.loading = false;
        
        if (action.payload && action.payload.success && Array.isArray(action.payload.fees)) {
            state.activeFees = action.payload.fees;  // Ensure 'fees' exists in API response
        } else {
            state.activeFees = [];  // Default to empty array if structure is unexpected
        }
    })
    
      .addCase(fetchActiveFees.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default studentFeeSlice.reducer;

