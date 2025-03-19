import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import { COLORS } from '../../../theme';

export default function TestsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('past'); // default to 'past' as in screenshot

  // Sample data for the "Past" tab
  const testsData = [
    {
      id: '1',
      title: 'Mock Test',
      date: "02 Feb'25",
      time: '12:00 PM',
      room: 'Room-08',
      description: 'Full Syllabus Test',
      status: 'Past',
    },
    {
      id: '2',
      title: 'Mock Test',
      date: "01 Feb'25",
      time: '12:00 PM',
      room: 'Room-08',
      description: 'Full Syllabus Test',
      status: 'Past',
    },
    {
      id: '3',
      title: 'AIATS',
      date: "12 Jan'25",
      time: '10:00 AM',
      room: 'Room-08',
      description: 'Physics, Chemistry, Mathematics, Biology & Mental Ability',
      status: 'Past',
    },
    {
      id: '4',
      title: 'Unit Test',
      date: "18 Dec'24 - 20 Dec'24",
      time: 'Online',
      room: '',
      description: 'Social Science, English & Mental Ability',
      status: 'Past',
    },
  ];

  // Render the three tabs (Live, Upcoming, Past)
  const renderTab = (tabKey) => {
    const isActive = activeTab === tabKey;
    return (
      <TouchableOpacity
        key={tabKey}
        style={[styles.tabItem, isActive && styles.tabItemActive]}
        onPress={() => setActiveTab(tabKey)}
      >
        <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
          {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {['live', 'upcoming', 'past'].map(renderTab)}
      </View>

      {/* You can conditionally render different lists for each tab */}
      {activeTab === 'past' && (
        <ScrollView style={styles.scrollContainer}>
          {testsData.map((test) => (
            <View key={test.id} style={styles.testCard}>
              <View style={styles.testCardHeader}>
                <Text style={styles.testTitle}>{test.title}</Text>
                <Text style={styles.testStatus}>{test.status}</Text>
              </View>

              <Text style={styles.testInfo}>
                {test.date} | {test.time}
              </Text>
              <Text style={styles.testInfo}>
                {test.room ? `${test.room} | ` : ''}
                {test.description}
              </Text>

              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigation.navigate('TestDetails', { test })}
              >
                <Text style={styles.detailsButtonText}>Test Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      {/* If you want to handle live/upcoming, just replicate a similar block */}
      {/* {activeTab === 'live' && ...} */}
      {/* {activeTab === 'upcoming' && ...} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F9F9F9',
    paddingVertical: 8,
    marginBottom: 4,
  },
  tabItem: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  tabItemActive: {
    backgroundColor: COLORS.primaryOrange, // approximate color from screenshot
  },
  tabText: {
    fontSize: 15,
    color: '#777',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
    marginTop: 4,
  },
  testCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
    elevation: 2, // shadow for Android
    shadowColor: '#000', // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  testCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  testTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  testStatus: {
    fontSize: 14,
    color: '#999',
  },
  testInfo: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  detailsButton: {
    alignSelf: 'flex-start',
    marginTop: 10,
    backgroundColor: COLORS.primaryOrange,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  detailsButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
});
