import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStudentBatches = createAsyncThunk(
  'studentBatches/fetchStudentBatches',
  async (studentId, { rejectWithValue }) => {

    const token = await AsyncStorage.getItem("token");
    console.log("batch studentid", studentId)
    try {
      const response = await axios.get(`https://mybuddy-backend.onrender.com/api/student/batches/${studentId}`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.batches; // Returning batch data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const studentBatchSlice = createSlice({
  name: 'studentBatches',
  initialState: {
    batches: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentBatches.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudentBatches.fulfilled, (state, action) => {
        state.loading = false;
        state.batches = action.payload;
      })
      .addCase(fetchStudentBatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default studentBatchSlice.reducer;
