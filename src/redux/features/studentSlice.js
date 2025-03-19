import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import api from "../../services/api";

const initialState = {
  students: [],
  primaryStudent: null,
  fatherPhone: "",  
  loading: false,
  error: null,
};

// ✅ Async Thunk for Fetching Students
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      const fatherPhone = await AsyncStorage.getItem("fatherPhone");
      const token = await AsyncStorage.getItem("authToken");

      if (!fatherPhone) {
        throw new Error("Phone number is required");
      }

      const response = await axios.get(
        `https://mybuddy-backend.onrender.com/api/fetch-students?fatherPhone=${fatherPhone}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Fetch Students Error:", error);
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Server Error");
      } else if (error.request) {
        return rejectWithValue("No response from server");
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// ✅ Async Thunk for Switching Student Profile
export const switchStudentProfile = createAsyncThunk(
  "students/switchProfile",
  async (studentId, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      if (!studentId) {
        throw new Error("Student ID is required");
      }

      const response = await axios.post(
        "https://mybuddy-backend.onrender.com/api/switch-profile",
        { studentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return response.data.student;
    } catch (error) {
      console.error("Switch Profile Error:", error);
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Server Error");
      } else if (error.request) {
        return rejectWithValue("No response from server");
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// ✅ Redux Slice
const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setFatherPhone: (state, action) => {
      state.fatherPhone = action.payload;
      AsyncStorage.setItem("fatherPhone", action.payload);
    },
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    setPrimaryStudent: (state, action) => {
      state.primaryStudent = action.payload;
    },
    switchProfile: (state, action) => {
      const studentId = action.payload;
      const newPrimary = state.students.find(student => student._id === studentId);
      if (newPrimary) {
        state.primaryStudent = newPrimary;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.students;
        state.primaryStudent = action.payload.students.length > 0 ? action.payload.students[0] : null;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load students";
      })
      
      // ✅ Handle Switch Profile
      .addCase(switchStudentProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(switchStudentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.primaryStudent = action.payload; // ✅ Update primary student from API response
      })
      .addCase(switchStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to switch profile";
      });
  },
});

// ✅ Export Actions & Reducer
export const { setFatherPhone, setStudents, setPrimaryStudent, switchProfile } = studentSlice.actions;
export default studentSlice.reducer;
