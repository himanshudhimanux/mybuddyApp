// src/screens/AttendanceScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentSessionsAndAttendance, filterSessionsByDate } from "../../redux/features/attendance/attendanceAction";
import { Calendar } from "react-native-calendars"; 
import { COLORS } from "../../../theme";
const AttendanceScreen = () => {
  const dispatch = useDispatch();
  const primaryStudent = useSelector((state) => state.students.primaryStudent); // ✅ Redux se student
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

  console.log("sessions", sessions)
  console.log("Primary student", primaryStudent)

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

      <Text style={styles.dateTitle}>Sessions on {selectedDate}</Text>

      {/* 📌 Session-wise Data */}
      <FlatList
        data={selectedDateSessions}
        keyExtractor={(item) => item.sessionId}
        renderItem={({ item }) => (
          <View style={[styles.sessionCard, item.attendanceStatus === "Present" ? styles.attended : styles.absent]}>
            <Text style={styles.subject}>{item.subject}</Text>
            <Text style={styles.teacher}>Teacher: {item.teacher}</Text>
            <Text>Status: {item.attendanceStatus === "Present" ? "✅ Present" : "❌ Absent"}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f5f5f5" },
  error: { color: "red", textAlign: "center", marginVertical: 10 },
  dateTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  sessionCard: { padding: 15, borderRadius: 10, marginVertical: 5 },
  attended: { backgroundColor: "#d4edda" },
  absent: { backgroundColor: "#f8d7da" },
  subject: { fontSize: 18, fontWeight: "bold" },
  teacher: { fontSize: 14, color: "#555" },
});

export default AttendanceScreen;
