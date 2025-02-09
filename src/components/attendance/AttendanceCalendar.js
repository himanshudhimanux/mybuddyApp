import { Calendar } from "react-native-calendars";
import { useSelector } from "react-redux";
import { View, ActivityIndicator } from "react-native";

const AttendanceCalendar = () => {
  const { sessions, loading } = useSelector((state) => state.attendance);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const markedDates = sessions.reduce((acc, session) => {
    acc[session.date] = {
      marked: true,
      dotColor: session.attended ? "green" : "red",
    };
    return acc;
  }, {});

  return (
    <View>
      <Calendar markedDates={markedDates} markingType={"dot"} />
    </View>
  );
};

export default AttendanceCalendar;
