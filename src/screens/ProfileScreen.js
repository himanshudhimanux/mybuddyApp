import React, { useEffect, useState } from "react";
import { 
  View, Text, Image, TouchableOpacity, StyleSheet, FlatList 
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, switchProfile } from "../redux/features/studentSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../theme";
import moment from "moment";
import { Switch } from "react-native-paper";
import { setParentMode } from "../redux/features/settingsSlice";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { students, primaryStudent } = useSelector((state) => state.students);
  const isParentMode = useSelector((state) => state.settings.isParentMode);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const loadFatherPhone = async () => {
      const phone = await AsyncStorage.getItem("fatherPhone");
      if (phone) {
        dispatch(fetchStudents());
      }
    };
    loadFatherPhone();
  }, [dispatch]);

  const handleSwitchProfile = (studentId) => {
    console.log("student id swtich", studentId)
    dispatch(switchProfile(studentId));

    setShowDropdown(false); // Close dropdown after selecting a profile
  };

  

  // Toggle Parent Mode
  const toggleParentMode = async () => {
    const newMode = !isParentMode;
    dispatch(setParentMode(newMode));
    await AsyncStorage.setItem("isParentMode", JSON.stringify(newMode));
  };

  if (!primaryStudent) {
    return (
      <View style={styles.centered}>
        <Text>No student data available</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={showDropdown ? students : []} // FlatList will only show when dropdown is active
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity 
          style={styles.dropdownItem} 
          onPress={() => handleSwitchProfile(item._id)}
        >
          <Text style={styles.dropdownText}>{item.name}</Text>
        </TouchableOpacity>
      )}
      ListHeaderComponent={
        <>
          <LinearGradient 
            colors={[COLORS.lightOrange2, COLORS.primaryOrange]} 
            style={styles.header}
          >
            <Icon name="arrow-back" size={24} color="white" style={styles.backIcon} />
            <Image
              style={styles.profileImage}
              source={{ 
                uri: primaryStudent?.photo 
                  ? `https://mybuddy-backend.onrender.com/api/uploads/${primaryStudent?.photo}` 
                  : "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?semt=ais_hybrid"
              }}
            />
            <Text style={styles.name}>{primaryStudent.name}</Text>
            <Text style={styles.classText}>{primaryStudent.className}</Text>
          </LinearGradient>

          {/* Parent Mode Toggle */}
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>Student</Text>
            <Switch 
              value={isParentMode} 
              onValueChange={toggleParentMode} 
              trackColor={{ false: "#ddd", true: "#4CAF50" }} 
              thumbColor={isParentMode ? "#fff" : "#f4f3f4"} 
            />
            <Text style={styles.toggleLabel}>Parent</Text>
          </View>

          {/* Student Info Section */}
          <View style={styles.infoContainer}>
            <InfoItem label="Reg No." value={primaryStudent.registrationNumber} />
            <InfoItem label="Father's Name" value={primaryStudent.fatherName} />
            <InfoItem label="Mother's Name" value={primaryStudent.motherName} />
            <InfoItem label="Date of Birth" value={moment(primaryStudent.dob).format("DD MMM YYYY")} />
          </View>

          {/* Switch Profile Button */}
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={styles.buttonText}>Switch Profile</Text>
          </TouchableOpacity>
        </>
      }
    />
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
  label: { fontSize: 16, color: "#333" },
  value: { fontSize: 16, fontWeight: "bold", color: "gray" },
  button: {
    backgroundColor: "#f9f9f9",
    borderColor: '#333',
    borderWidth: 1,
    color: '#333',
    borderRadius: 25,
    padding: 15,
    margin: 15,
    alignItems: "center",
  },
  buttonText: { color: "#333", fontSize: 16, fontWeight: "bold" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },

  // Dropdown Styles
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "white",
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

    // Toggle Styles
    toggleContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 10 },
    toggleLabel: { fontSize: 16, fontWeight: "bold", marginHorizontal: 10 },

});

export default ProfileScreen;
