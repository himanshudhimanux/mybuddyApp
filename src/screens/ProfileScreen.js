import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../redux/features/studentSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native-gesture-handler";
import { View } from "react-native";


const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { students, primaryStudent, loading, error } = useSelector((state) => state.students);

  useEffect(() => {
    const getDataAndFetchStudents = async () => {
      const fatherPhone = await AsyncStorage.getItem("fatherPhone");
      const token = await AsyncStorage.getItem("authToken");

      if (fatherPhone && token) {
        dispatch(fetchStudents()); // ✅ Call without parameters, thunk will fetch from AsyncStorage
      }
    };

    getDataAndFetchStudents();
  }, [dispatch]);

  useEffect(() => {
    console.log("Redux Students Data:", students);
  }, [students]);
  

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : students.length > 0 ? (
        students.map((student, index) => (
          <Text key={index}>{student.name} - {student.class}</Text>
        ))
      ) : (
        <Text>No students found.</Text>
      )}
    </View>
  );
  
};

export default ProfileScreen;
