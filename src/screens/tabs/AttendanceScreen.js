import { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { fetchAttendance } from "../../redux/features/attendanceSlice";
import AttendanceCalendar from "../../components/attendance/AttendanceCalendar";
import AttendanceList from "../../components/attendance/AttendanceList";

const AttendanceScreen = ({ studentId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAttendance(studentId));
  }, [dispatch, studentId]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
      </Text>
      <AttendanceCalendar />
      <Text style={{ fontSize: 16, marginTop: 20 }}>Session-wise Attendance</Text>
      <AttendanceList />
    </View>
  );
};

export default AttendanceScreen;
