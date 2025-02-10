import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"; // ✅ Using Axios instead of fetch
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
      // 🔹 Get phone number & token from AsyncStorage
      const fatherPhone = await AsyncStorage.getItem("fatherPhone");
      const token = await AsyncStorage.getItem("authToken");

      if (!fatherPhone) {
        throw new Error("Phone number is required");
      }


      // ✅ Using Axios for better error handling
      const response = await api.get(
        `/fetch-students?fatherPhone=${fatherPhone}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      return response.data; // ✅ Return response data directly

    } catch (error) {
      console.error("Fetch Students Error:", error);

      // ✅ Improved error handling
      if (error.response) {
        // Server error (4xx, 5xx)
        return rejectWithValue(error.response.data.message || "Server Error");
      } else if (error.request) {
        // No response received
        return rejectWithValue("No response from server");
      } else {
        // Other errors (e.g., CORS, network issues)
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
      AsyncStorage.setItem("fatherPhone", action.payload); // ✅ Save in AsyncStorage
    },
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    setPrimaryStudent: (state, action) => {
      state.primaryStudent = action.payload;
    },
    switchProfile: (state, action) => {
      const student = state.students.find((s) => s._id === action.payload);
      if (student) state.primaryStudent = student;
    },

    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.students; // Make sure this is the correct path
        if (action.payload.students && action.payload.students.length > 0) {
            state.primaryStudent = action.payload.students[0]; // ✅ Set first student as primary
        } else {
            state.primaryStudent = null; // ✅ Explicitly reset if no students found
        }
    })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load students"; // ✅ Fix error handling
      });
  },
});

// ✅ Export Actions & Reducer
export const { setFatherPhone, setStudents, setPrimaryStudent, switchProfile } = studentSlice.actions;
export default studentSlice.reducer;
