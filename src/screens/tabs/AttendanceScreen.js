import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentSessionsAndAttendance, filterSessionsByDate } from "../../redux/features/attendance/attendanceAction";
import { Calendar } from "react-native-calendars";
import { COLORS } from "../../../theme";
import Icon from 'react-native-vector-icons/FontAwesome6';

const AttendanceScreen = () => {
  const dispatch = useDispatch();
  const primaryStudent = useSelector((state) => state.students.primaryStudent);
  const { sessions, selectedDateSessions, loading, error } = useSelector((state) => state.attendance);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);


  useEffect(() => {
    if (primaryStudent) {
      dispatch(fetchStudentSessionsAndAttendance(primaryStudent._id));
    }
  }, [primaryStudent, dispatch]);

  useEffect(() => {
    dispatch(filterSessionsByDate(selectedDate));
  }, [selectedDate, sessions, dispatch]);

  // ✅ Marked Dates for Calendar (Green: Present, Red: Absent)
  const markedDates = sessions.reduce((acc, session) => {
    acc[session.date] = {
      marked: true,
      dotColor: session.attendanceStatus === "Present" ? "green" : "red",
    };
    return acc;
  }, {});

  if (loading) return <ActivityIndicator size="large" color={COLORS.primaryOrange} />;
  if (error) return <Text style={styles.error}>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      {/* 📅 React-Native-Calendars */}
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          ...markedDates,
          [selectedDate]: { selected: true, selectedColor: COLORS.primaryOrange },
        }}
      />

      <Text style={styles.dateTitle}>Classess on {selectedDate}</Text>

      {/* 📌 Session-wise Data */}
      <FlatList
        data={selectedDateSessions}
        keyExtractor={(item) => item.sessionId}
        renderItem={({ item }) => (
          <View style={[styles.sessionCard, item.attendanceStatus === "Present" ? styles.attended : styles.absent]}>
            <Text style={styles.subject}>{item.subject}</Text>
            <Text style={styles.teacher}><Icon name="user" /> {item.teacher}</Text>
            <Text style={styles.time}>
              <Icon name="clock" /> {item.scheduleDetails?.startTime || "N/A"} - {item.scheduleDetails?.endTime || "N/A"}
            </Text>

          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f9f9f9", },
  error: { color: "red", textAlign: "center", marginVertical: 10 },
  dateTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  sessionCard: { padding: 15, borderRadius: 0, marginVertical: 5, elevation: 2, backgroundColor: "#fff" },
  attended: { borderColor: "green", borderLeftWidth: 5, },
  absent: { borderColor: "red", borderLeftWidth: 5, },
  subject: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  teacher: { fontSize: 14, color: "#555", marginBottom: 5 },
});

export default AttendanceScreen;
