import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/tabs/HomeScreen";
import FeeScreen from "../screens/tabs/FeeScreen";
import AttendanceScreen from "../screens/tabs/AttendanceScreen";
import TestMarksScreen from "../screens/tabs/TestScoreScreen";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from "../screens/ProfileScreen";
import { COLORS } from "../../theme";
import NoticeBoard from "../screens/NoticeBoard";
import TestScoreScreen from "../screens/tabs/TestScoreScreen";
import { useSelector } from "react-redux";
import PaymentScreen from "../screens/PaymentScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {

   const isParentMode = useSelector((state) => state.settings.isParentMode);

   return (
      <Tab.Navigator
         screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
               let iconName;

               // Assign different icons based on the route name
               if (route.name === "Home") {
                  iconName = "home";
               } else if (route.name === "Fee") {
                  iconName = "currency-inr";
               } else if (route.name === "Attendance") {
                  iconName = "calendar";
               } else if (route.name === "Tests") {
                  iconName = "file-document";
               } else if (route.name === "Profile") {
                  iconName = "account";
               }

               // Return the icon component
               return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarStyle: {
              backgroundColor: "#f8f9fa", // Tab bar background color
              borderTopWidth: 2, // Remove border
              elevation: 5, // Add shadow (for Android)
           },
            tabBarActiveTintColor: COLORS.primaryOrange, // Active tab color
            tabBarInactiveTintColor: "gray", // Inactive tab color
         })}
      >
         <Tab.Screen name="Home" component={HomeScreen} />
         {isParentMode && <Tab.Screen name="Fee" component={FeeScreen} />}
         <Tab.Screen name="Attendance" component={AttendanceScreen} />
         <Tab.Screen name="Tests" component={TestScoreScreen} />
         <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
   );
};

export default TabNavigator;
