import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { COLORS } from '../../../theme';
import NoticeComponent from '../../components/NoticeComponent';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>

      <View style={styles.profileContainer}>
        <Text style={styles.profileName}>Fletch Skinner</Text>
        <Text style={styles.profileClass}>Class VIII A</Text>
      </View>
      <Text style={styles.sectionTitle}>Notice Board</Text>

      <NoticeComponent />

      <Text style={styles.sectionTitle}>Upcoming Classes</Text>
      <Card style={styles.infoCard}><Card.Content><Text>View upcoming class schedule</Text></Card.Content></Card>
      <Text style={styles.sectionTitle}>Monthly Attendance</Text>
      <Card style={styles.infoCard}><Card.Content><Text>Check monthly attendance details</Text></Card.Content></Card>
      <Text style={styles.sectionTitle}>Total Batches</Text>
      <Card style={styles.infoCard}><Card.Content><Text>View all batches you are enrolled in</Text></Card.Content></Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.lightOrange,
    padding: 15,
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  avatar: { backgroundColor: '#3A5A97' },
  profileContainer: { padding: 20, backgroundColor: COLORS.lightOrange },
  profileName: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  profileClass: { fontSize: 14, color: '#fff', opacity: 0.8 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, paddingHorizontal: 15 },
  noticeCard: { margin: 15, backgroundColor: '#E5E7EB', borderRadius: 10 },
  noticeText: { fontSize: 14, color: '#333' },
  noticeDate: { fontSize: 12, color: '#666', marginTop: 5 },
  infoCard: { margin: 10, backgroundColor: '#fff', borderRadius: 10, elevation: 2, padding: 15 },
});

export default HomeScreen;
