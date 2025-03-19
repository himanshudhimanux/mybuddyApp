import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TestDetailsScreen({ route }) {
  // The test object is passed from the TestsScreen
  const { test } = route.params || {};

  // Hard-code or dynamically load these fields as needed
  // For the screenshot, we have: 
  // - "Offline" status at top 
  // - Test date/time/room 
  // - Result date 
  // - Format (Subjective) 
  // - No. of questions, Max marks 
  // - Test content (Mathematics)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{test?.title || 'Mock Test'}</Text>
      {/* Status */}
      <Text style={styles.offlineStatus}>Offline</Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Test date</Text>
        <Text style={styles.value}>{test?.date || '02 Feb\'25'}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Test time</Text>
        <Text style={styles.value}>{test?.time || '12:00 PM'}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Room No.</Text>
        <Text style={styles.value}>{test?.room || 'Room-08'}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Result date</Text>
        <Text style={styles.value}>03 Feb'25</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Format</Text>
        <Text style={styles.value}>Subjective</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>No. of questions</Text>
        <Text style={styles.value}>-</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Max marks</Text>
        <Text style={styles.value}>-</Text>
      </View>

      <View style={styles.testContent}>
        <Text style={styles.contentLabel}>Test Content</Text>
        <Text style={styles.contentValue}>Mathematics</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  offlineStatus: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    color: '#555',
  },
  value: {
    fontSize: 15,
    color: '#333',
  },
  testContent: {
    marginTop: 16,
  },
  contentLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contentValue: {
    fontSize: 15,
    color: '#333',
  },
});
