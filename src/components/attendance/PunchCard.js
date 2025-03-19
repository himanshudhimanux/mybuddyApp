import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../../theme";

const PunchCard = () => {
//   const today = new Date().toLocaleDateString(); // Get Current Date

  // Get Current Date in MM-DD-YYYY Format
  const today = new Date();
  const formattedDate = `${String(today.getMonth() + 1).padStart(2, "0")}-${String(
    today.getDate()
  ).padStart(2, "0")}-${today.getFullYear()}`;

  return (
    <View style={styles.card}>
        <View style={styles.punchContainer}>
            <Text style={styles.label}>Today Date</Text>
            <Text style={styles.date}>{formattedDate}</Text>
        </View>
      
      <View style={styles.punchContainer}>
        <Text style={styles.label}>First Punch</Text>
        <Text style={styles.value}>-</Text>
      </View>
      <View style={styles.punchContainer}>
        <Text style={styles.label}>Last Punch</Text>
        <Text style={styles.value}>-</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: '#f9f9f9',
    borderRadius: 15, // Smooth rounded corners
    padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Android shadow
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  punchContainer: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    fontSize: 12, // Smaller font for labels
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    fontSize: 14,
    color: "#000",
  },
});

export default PunchCard;
