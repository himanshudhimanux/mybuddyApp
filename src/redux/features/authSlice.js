import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../services/api';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (fatherPhone, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://mybuddy-backend.onrender.com/api/auth/loginWithPhone', { fatherPhone });
      return response.data; // Ensure this part is valid
    } catch (error) {
      console.log('Error in loginUser thunk:', error); // Log the error
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to send OTP';
      return rejectWithValue(errorMessage);
    }
  }
);




const authSlice = createSlice({
  name: 'auth',
  initialState: { loading: false, error: null, user: null },
  reducers: {
    resetAuthState: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
