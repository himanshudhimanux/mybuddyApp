import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";
import axios from "axios";

// ✅ Fetch Students After OTP Verification
export const verifyOtp = createAsyncThunk(
  'otp/verifyOtp',
  async ({ fatherPhone, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://mybuddy-backend.onrender.com/api/auth/verify-otp', { fatherPhone, otp });

      // Save token in AsyncStorage
      await AsyncStorage.setItem('authToken', response.data.token);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'OTP verification failed');
    }
  }
);

const otpSlice = createSlice({
  name: "otp",
  initialState: {
    loading: false,
    success: false,
    error: null,
    token: null,
    students: null, // ✅ Store students here
  },
  reducers: {
    resetOtpState: (state) => {
      state.error = null;
      state.success = false;
      state.token = null;
      state.students = null; // Reset students
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.token = action.payload.token;
        state.students = action.payload.students; // ✅ Store students in Redux
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOtpState } = otpSlice.actions;
export default otpSlice.reducer;
