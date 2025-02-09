import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";

const AttendanceList = () => {
  const { sessions, loading } = useSelector((state) => state.attendance);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={sessions}
      keyExtractor={(item) => item.sessionId}
      renderItem={({ item }) => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            backgroundColor: item.attended ? "#d4f5d4" : "#f8d7da",
            marginBottom: 5,
            borderRadius: 5,
          }}
        >
          <Text>{item.subject}</Text>
          <Text>{item.date}</Text>
          <Text>{item.attended ? "✅ Present" : "❌ Absent"}</Text>
        </View>
      )}
    />
  );
};

export default AttendanceList;
