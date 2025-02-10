// src/redux/actions/attendanceActions.js
import axios from "axios";
import {
  fetchAttendanceStart,
  fetchAttendanceSuccess,
  fetchAttendanceFailure,
  setSelectedDateSessions,
} from "../../features/attendance/attendanceSlice";

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

