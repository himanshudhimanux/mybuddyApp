import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ Fetch All Sessions
export const fetchSessions = createAsyncThunk('sessions/fetchSessions', async () => {
    const response = await api.get(`/sessions`);
    return response.data;
});

// ✅ Fetch Attendance
export const fetchAttendance = createAsyncThunk('attendance/fetchAttendance', async (sessionId) => {
    const response = await axios.get(`https://mybuddy-backend.onrender.com/api/attendance?sessionId=${sessionId}`);
    return response.data;
});

// ✅ Fetch Upcoming Sessions (Next 7 Days)
export const fetchUpcomingSessions = createAsyncThunk('sessions/fetchUpcomingSessions', async (_, { rejectWithValue }) => {
    try {

        const token = await AsyncStorage.getItem("token");

        const today = new Date();
        const next7Days = new Date();
        next7Days.setDate(today.getDate() + 7);

        const formattedToday = today.toISOString().split('T')[0]; // YYYY-MM-DD
        const formattedNext7Days = next7Days.toISOString().split('T')[0];

        console.log("Fetching Sessions from:", formattedToday, "to", formattedNext7Days);

        const response = await axios.get(`https://mybuddy-backend.onrender.com/api/upcoming-classess?startDate=${formattedToday}&endDate=${formattedNext7Days}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        
        console.log("API Response:", response.data);

        // ✅ Check if the backend returns { success: true, data: [] }
        return response.data?.data || response.data;
    } catch (error) {
        console.error("Error fetching upcoming sessions:", error);
        return rejectWithValue(error.response?.data || "Failed to fetch data");
    }
});

const sessionSlice = createSlice({
    name: 'sessions',
    initialState: { 
        sessions: [], 
        upcomingSessions: [], 
        attendance: {}, 
        loading: false, 
        error: null 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSessions.pending, (state) => { 
                state.loading = true; 
                state.error = null;
            })
            .addCase(fetchSessions.fulfilled, (state, action) => {
                state.sessions = action.payload;
                state.loading = false;
            })
            .addCase(fetchSessions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching sessions";
            })
            .addCase(fetchAttendance.fulfilled, (state, action) => {
                state.attendance[action.meta.arg] = action.payload;
            })
            .addCase(fetchUpcomingSessions.pending, (state) => { 
                state.loading = true; 
                state.error = null;
            })
            .addCase(fetchUpcomingSessions.fulfilled, (state, action) => {
                console.log("Storing in Redux:", action.payload);
                state.upcomingSessions = action.payload;
                state.loading = false;
            })
            .addCase(fetchUpcomingSessions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching upcoming sessions";
            });
    },
});

export default sessionSlice.reducer;
