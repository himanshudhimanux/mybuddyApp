import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, switchProfile } from "../redux/features/studentSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../theme";
import moment from "moment"

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const primaryStudent = useSelector((state) => state.students.primaryStudent);

  const formatDate = (dateString) => moment(dateString).format("DD MMM YYYY");


    useEffect(() => {
      const loadFatherPhone = async () => {
          const phone = await AsyncStorage.getItem("fatherPhone");
          if (phone) {
              dispatch(fetchStudents());
          }
      };
      loadFatherPhone();
  }, [dispatch]);

  if (!primaryStudent) {
    return (
      <View style={styles.centered}>
        <Text>No student data available</Text>
      </View>
    );
  }

  return (

    
    <ScrollView style={styles.container}>
      <LinearGradient colors={[COLORS.lightOrange2, COLORS.primaryOrange]} style={styles.header}>
        <Icon name="arrow-back" size={24} color="white" style={styles.backIcon} />
        <Image
          source={{ 
            uri: primaryStudent?.photo 
              ? `https://mybuddy-backend.onrender.com/api/uploads/${primaryStudent?.photo}` 
              : "https://via.placeholder.com/100"
          }}
        />
        <Text style={styles.name}>{primaryStudent.name}</Text>
        <Text style={styles.classText}>{primaryStudent.className}</Text>
      </LinearGradient>
      <View style={styles.infoContainer}>
        <InfoItem label="Reg No." value={primaryStudent.registrationNumber} />
        <InfoItem label="Father's Name" value={primaryStudent.fatherName} />
        <InfoItem label="Mother's Name" value={primaryStudent.motherName} />
        <InfoItem label="Date of Birth" value={formatDate(primaryStudent?.dob)} />
        <InfoItem label="Blood Group" value={primaryStudent.bloodGroup} />
        <InfoItem label="Emergency Contact" value={primaryStudent.emergencyContact} />
        <InfoItem label="Position in Class" value={primaryStudent.position} />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => dispatch(switchProfile(primaryStudent._id))}>
        <Text style={styles.buttonText}>Switch Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const InfoItem = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backIcon: { position: "absolute", top: 50, left: 20 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
    marginTop: 20,
  },
  name: { color: "white", fontSize: 22, fontWeight: "bold", marginTop: 10 },
  classText: { color: "#ddd", fontSize: 16 },
  infoContainer: { backgroundColor: "white", borderRadius: 15, margin: 15, padding: 15 },
  infoItem: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 },
  label: { fontSize: 16, color: "#555" },
  value: { fontSize: 16, fontWeight: "bold", color: "#5A2E98" },
  button: {
    backgroundColor: "#f33",
    borderRadius: 25,
    padding: 15,
    margin: 15,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ProfileScreen;
