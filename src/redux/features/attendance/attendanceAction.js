// src/redux/actions/attendanceActions.js
import axios from "axios";
import {
  fetchAttendanceStart,
  fetchAttendanceSuccess,
  fetchAttendanceFailure,
  setSelectedDateSessions,
  markAttendance,
} from "../slices/attendanceSlice";

// ✅ Fetch student sessions and attendance
export const fetchStudentSessionsAndAttendance = (studentId) => async (dispatch) => {
  try {
    dispatch(fetchAttendanceStart());
    const response = await axios.get(
      `https://mybuddy-backend.onrender.com/api/getStudentSessionsAndAttendance/${studentId}`
    );
    dispatch(fetchAttendanceSuccess(response.data.data));
  } catch (error) {
    dispatch(fetchAttendanceFailure(error.message));
  }
};

// ✅ Filter sessions by selected date
export const filterSessionsByDate = (date) => (dispatch, getState) => {
  const { sessions } = getState().attendance;
  const filteredSessions = sessions.filter(
    (session) => session.batchDate.split("T")[0] === date
  );
  dispatch(setSelectedDateSessions(filteredSessions));
};

// ✅ Mark student attendance
export const markStudentAttendance = (sessionId, studentId, status) => async (dispatch) => {
  try {
    await axios.post("https://your-api.com/api/mark-attendance", {
      sessionId,
      studentId,
      attendanceType: status,
    });
    dispatch(markAttendance({ sessionId, studentId, status }));
  } catch (error) {
    console.error("Error marking attendance:", error);
  }
};
