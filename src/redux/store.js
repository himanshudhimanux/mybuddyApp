import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import otpReducer from './features/otpSlice';
import studentReducer from './features/studentSlice';
import attendanceReducer from './features/attendance/attendanceSlice';
import noticeReducer from './features/noticeSlice';
import sessionsReducer from './features/sessionSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    otp: otpReducer,
    students: studentReducer,
    attendance: attendanceReducer,
    notices: noticeReducer,
    sessions: sessionsReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
