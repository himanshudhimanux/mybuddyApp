import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../services/api";

// ✅ Async thunk to fetch students based on stored fatherPhone
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (fatherPhone, { rejectWithValue }) => {
    console.log("📤 Sending Request with phone:", fatherPhone);
    try {
      const response = await api.get("/fetch-students", {
        params: { fatherPhone: fatherPhone.toString() } // Ensure it's a string
      });
      console.log("✅ API Response:", response.data);
    } catch (error) {
      console.log("❌ API Error:", error.response ? error.response.data : error.message);
    }
    
  }
);





// ✅ Async thunk to switch profile
export const switchProfile = createAsyncThunk(
  "students/switchProfile",
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/switch-profile`, { studentId });
      return response.data.student; // Updated student return hoga
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    primaryStudent: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch students cases
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.students;
        state.primaryStudent = action.payload.primaryStudent;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Switch profile cases
      .addCase(switchProfile.fulfilled, (state, action) => {
        state.primaryStudent = action.payload;
      })
      .addCase(switchProfile.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default studentSlice.reducer;
