import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch attendance data
export const fetchAttendance = createAsyncThunk(
  "attendance/fetchAttendance",
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://your-api.com/attendance/${studentId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    sessions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default attendanceSlice.reducer;
