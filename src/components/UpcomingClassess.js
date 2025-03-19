import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, FlatList, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpcomingSessions } from "../redux/features/sessionSlice";
import Icon from 'react-native-vector-icons/FontAwesome6';

const { width } = Dimensions.get("window");

const UpcomingClasses = () => {
  const dispatch = useDispatch();
  const { upcomingSessions, loading } = useSelector((state) => state.sessions);

  useEffect(() => {
    dispatch(fetchUpcomingSessions());
  }, [dispatch]);

  console.log("Upcoming Classes:", upcomingSessions);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.subject}>{item.subjectId?.name || "No Subject"}</Text>
      <View style={styles.date_teacher}>
        <Text style={styles.date}><Icon name="calendar-days" /> {new Date(item.batchDate).toDateString()}</Text>
        <Text style={styles.teacher}><Icon name="user" /> {item.teacherId?.name || "No Teacher"}</Text>
      </View>
      <Text style={styles.time}>
        <Icon name="clock" /> {item.scheduleDetails?.startTime || "N/A"} - {item.scheduleDetails?.endTime || "N/A"}
      </Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />;
  }

  if (!upcomingSessions || upcomingSessions.length === 0) {
    return <Text style={styles.noSessions}>No upcoming sessions</Text>;
  }

  return (
    <FlatList
      data={upcomingSessions}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  loader: {
    marginTop: 20,
  },
  noSessions: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    width: width * 0.9,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
  },
  subject: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "grey",
    marginVertical: 5,
  },
  time: {
    fontSize: 14,
    color: "gray",
    fontWeight: "bold",
  },
  teacher: {
    fontSize: 14,
    color: "#555",
  },
  date_teacher: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
});

export default UpcomingClasses;
