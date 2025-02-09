import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ClassDetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biology</Text>
      <Text style={styles.detail}>Date: Saturday, 04th Jan'25</Text>
      <Text style={styles.detail}>Time: 09:00 AM - 10:00 AM</Text>
      <Text style={styles.detail}>Faculty: Deepak</Text>
      <Text style={styles.detail}>Room: Room-08</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  detail: { fontSize: 16, marginVertical: 5 },
});


export default ClassDetailScreen;