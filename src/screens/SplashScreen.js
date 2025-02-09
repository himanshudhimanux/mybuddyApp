import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../../theme';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('LoginScreen');
    }, 2000); // Navigate to Login Screen after 2 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
        <Image
          source={require('../assets/mybuddy.png')}
          style={styles.headerImage}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.bgColor },
  headerImage: {
    width: 250,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  text: { fontSize: 48, fontWeight: 'bold', color: '#fff' },
});

export default SplashScreen;
