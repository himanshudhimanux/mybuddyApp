import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import otpReducer from './features/otpSlice';
import studentReducer from './features/studentSlice';
import attendanceReducer from './features/attendance/attendanceSlice';
import noticeReducer from './features/noticeSlice';
import sessionsReducer from './features/sessionSlice';
import studentBatchesReducer from './features/batchSlice';
import settingsReducer from './features/settingsSlice'
import feeReducer from './features/feeSlice';
import studentFeeReducer from './features/studentFeeSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    otp: otpReducer,
    students: studentReducer,
    attendance: attendanceReducer,
    notices: noticeReducer,
    sessions: sessionsReducer,
    studentBatches: studentBatchesReducer,
    settings: settingsReducer,
    fees: feeReducer,
    studentFees: studentFeeReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
