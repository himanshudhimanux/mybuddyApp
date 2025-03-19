import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen';
import TabNavigator from './TabNavigator';
import NoticeBoard from '../screens/NoticeBoard';
import TestDetailsScreen from '../screens/TestDetailsScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ActiveFeeScreen from '../screens/ActiveFeeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    };

    checkAuth();
  }, []);

  if (isLoggedIn === null) {
    return null; // Prevents flicker before determining login state
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'HomeScreen' : 'SplashScreen'}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="NoticeBoard" component={NoticeBoard} options={{ headerShown: true }} />
        <Stack.Screen name="TestDetails" component={TestDetailsScreen} options={{ headerShown: true }} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Active Courses" component={ActiveFeeScreen} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
