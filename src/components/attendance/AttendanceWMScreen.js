import React from "react";
import { ScrollView } from "react-native";
import AttendancePieChart from "../attendance/AttendancePieChart";

const WeeklyData = [
  { label: "Present", value: 40, color: "lightgreen" },
  { label: "Absent", value: 30, color: "red" },
  { label: "Leave", value: 30, color: "orange" }
];

const MonthlyData = [
  { label: "Present", value: 40, color: "lightgreen" },
  { label: "Absent", value: 30, color: "red" },
  { label: "Leave", value: 30, color: "orange" }
];

const AttendanceWMScreen = () => {
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center", padding: 20 }}>
      <AttendancePieChart title="Weekly Attendance" data={WeeklyData} />
      <AttendancePieChart title="Monthly Attendance" data={MonthlyData} />
    </ScrollView>
  );
};

export default AttendanceWMScreen;
