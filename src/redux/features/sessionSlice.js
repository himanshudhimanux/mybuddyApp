import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../services/api';

// ✅ Session API Call
export const fetchSessions = createAsyncThunk('sessions/fetchSessions', async (date) => {
    const response = await api.get(`/sessions`);
    return response.data;
});

// ✅ Attendance API Call
export const fetchAttendance = createAsyncThunk('attendance/fetchAttendance', async (sessionId) => {
    const response = await axios.get(`https://mybuddy-backend.onrender.com/api/attendance?sessionId=${sessionId}`);
    return response.data;
});

// 🗂 Redux Slice
const sessionSlice = createSlice({
    name: 'sessions',
    initialState: { sessions: [], attendance: {}, loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSessions.pending, (state) => { state.loading = true; })
            .addCase(fetchSessions.fulfilled, (state, action) => {
                state.sessions = action.payload;
                state.loading = false;
            })
            .addCase(fetchAttendance.fulfilled, (state, action) => {
                state.attendance[action.meta.arg] = action.payload;
            });
    },
});

export default sessionSlice.reducer;
