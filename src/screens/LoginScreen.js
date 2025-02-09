import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetAuthState } from '../redux/features/authSlice';
import { COLORS } from '../../theme';

const LoginScreen = () => {
  const [fatherPhone, setFatherPhone] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = () => {
    if (fatherPhone.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
      return;
    }
  
    dispatch(loginUser(fatherPhone))
    .unwrap()
    .then(() => {
      navigation.replace('OtpScreen', { fatherPhone });
    })
    .catch((error) => {
      console.log('Login error:', error);  // Log the entire error
      const errorMessage = error?.message || 'Something went wrong';
      Alert.alert('Error', errorMessage);
    });
  
  };
  

  useEffect(() => {
    if (error) {
      Alert.alert('Login Failed', error);
      dispatch(resetAuthState());
    }
  }, [error, dispatch]);

  return (
    <View style={styles.container}>
      {/* Header Image */}
      <Image
        source={require('../assets/mybuddy.png')} // Add your own image in assets folder
        style={styles.headerImage}
      />

      {/* Title */}
      <Text style={styles.title}>Login to Your Account</Text>

      {/* Phone Number Input Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.countryCode}>+91</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number"
          placeholderTextColor="#BBB"
          keyboardType="phone-pad"
          maxLength={10}
          value={fatherPhone}
          onChangeText={setFatherPhone}
        />
      </View>

      {/* Send OTP Button */}
      {loading ? (
        <ActivityIndicator size="large" color="#FF6600" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      )}


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  headerImage: {
    width: 250,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#efefef',
    width: '90%',
    height: 50,
    marginBottom: 20,
  },
  countryCode: {
    color: '#333',
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#333',
    fontSize: 16,
    fontWeight: 600,
  },
  button: {
    backgroundColor: '#FF6600',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

});

export default LoginScreen;
