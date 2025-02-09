// src/redux/slices/attendanceSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessions: [],
  selectedDateSessions: [],
  loading: false,
  error: null,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    fetchAttendanceStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAttendanceSuccess: (state, action) => {
      state.sessions = action.payload;
      state.loading = false;
    },
    fetchAttendanceFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSelectedDateSessions: (state, action) => {
      state.selectedDateSessions = action.payload;
    },
    markAttendance: (state, action) => {
      const { sessionId, studentId, status } = action.payload;
      state.sessions = state.sessions.map((session) => {
        if (session.sessionId === sessionId) {
          return {
            ...session,
            attendanceStatus: status, // Update attendance status
          };
        }
        return session;
      });
    },
  },
});

export const {
  fetchAttendanceStart,
  fetchAttendanceSuccess,
  fetchAttendanceFailure,
  setSelectedDateSessions,
  markAttendance,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;
