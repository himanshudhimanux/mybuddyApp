import React, { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, switchProfile } from "../redux/features/studentSlice"; // Import actions
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { students, primaryStudent, loading, error } = useSelector((state) => state.students);
  const [fatherPhone] = useState("9876543210"); // Test phone number


  const checkAuthData = async () => {
    try {
      const phoneNumber = await AsyncStorage.getItem('fatherPhone');
      const authToken = await AsyncStorage.getItem('authToken');
  
      if (phoneNumber && authToken) {

        return true; // Data exists
      } else {
        console.log("❌ Phone number or token missing!");
        return false; // Data is missing
      }
    } catch (error) {
      console.log("Error checking AsyncStorage:", error);
      return false;
    }
  };
  
  // Function call
  checkAuthData();
  

  useEffect(() => {
    dispatch(fetchStudents(fatherPhone)); // API call on screen load
  }, [dispatch, fatherPhone]);

  const handleProfileSwitch = (studentId) => {
    dispatch(switchProfile(studentId));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  if (error) {
    return <Text style={{ color: "red" }}>{error}</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {primaryStudent ? (
        <>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Primary Student:</Text>
          <Text>Name: {primaryStudent.name}</Text>
          <Text>Registration No: {primaryStudent.registrationNumber}</Text>
          <Text>Gender: {primaryStudent.gender}</Text>

          {/* Profile Switch Button */}
          <Text style={{ fontSize: 18, marginTop: 20 }}>Switch Profile:</Text>
          <FlatList
            data={students}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleProfileSwitch(item._id)}
                style={{
                  padding: 10,
                  backgroundColor: primaryStudent._id === item._id ? "gray" : "lightblue",
                  marginVertical: 5,
                }}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <Text>No student data available</Text>
      )}
    </View>
  );
};

export default ProfileScreen;
