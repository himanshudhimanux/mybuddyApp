import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verifyOtp, resetOtpState } from '../redux/features/otpSlice';
import { COLORS } from '../../theme';

const OtpScreen = ({ route }) => {
  const { fatherPhone } = route.params;
  const [otp, setOtp] = useState(['', '', '', '']);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading, success, error, token } = useSelector((state) => state.otp);

  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 4) {
      ToastAndroid.show('Please enter a 4-digit OTP', ToastAndroid.SHORT);
      return;
    }

    dispatch(verifyOtp({ fatherPhone, otp: otpCode }));
  };

  

  useEffect(() => {
    if (success && token) {
      ToastAndroid.show('OTP Verified Successfully!', ToastAndroid.SHORT);
      
      AsyncStorage.multiSet([
        ['token', token],
        ['fatherPhone', fatherPhone] // Store fatherPhone
      ]);
  
      dispatch(resetOtpState());
      navigation.navigate('HomeScreen'); // Navigate after storing
    }
  
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
      dispatch(resetOtpState());
    }
  }, [success, error, token, fatherPhone, dispatch, navigation]);
  
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.replace('LoginScreen')}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Phone Verification</Text>
      <Text style={styles.subtitle}>Enter 4 digit verification code sent to your phone number</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            maxLength={1}
            keyboardType="numeric"
            ref={(el) => (inputs.current[index] = el)}
          />
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FF6600" />
      ) : (
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
          <Text style={styles.verifyButtonText}>Verify OTP</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default OtpScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  backText: {
    fontSize: 36,
    color: '#000',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#444',
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 24,
    marginHorizontal: 8,
    marginBottom: 30,
    fontWeight: 'bold',
  },

  verifyButton: {
    backgroundColor: '#FF6600',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 10,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
