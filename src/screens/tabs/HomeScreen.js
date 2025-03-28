import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudentBatches } from '../../redux/features/batchSlice';
import { COLORS } from '../../../theme';
import NoticeComponent from '../../components/NoticeComponent';
import UpcomingClassess from '../../components/UpcomingClassess';
// import AttendanceWMScreen from '../../components/attendance/AttendanceWMScreen';
import PunchCard from '../../components/attendance/PunchCard';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AttendanceWMScreen from '../../components/attendance/AttendanceWMScreen';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const primaryStudent = useSelector(state => state.students.primaryStudent);
  const { batches, loading } = useSelector(state => state.studentBatches);


  useEffect(() => {
    if (primaryStudent?._id) {
      dispatch(fetchStudentBatches(primaryStudent._id));
    }
  }, [dispatch, primaryStudent]);

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        {/* Left Side - Welcome Text */}
        <View>
          <Text style={styles.profileClass}>Welcome,</Text>
          <Text style={styles.profileName}>
            {primaryStudent?.name || "Student Name"}
          </Text>
        </View>

        {/* Right Side - Profile Photo */}
        <Image
          source={{ uri: 'https://avatar.iran.liara.run/public/boy' }}
          style={styles.profileImage}
        />
      </View>

      <PunchCard />


      {/* Notice Board */}
      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>Notice Board</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NoticeBoard')}>
          <Text style={styles.viewAllLink}>View All</Text>
        </TouchableOpacity>
      </View>
      <NoticeComponent />

      {/* Upcoming Classes */}
      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>Upcoming Classes</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Attendance')}>
          <Text style={styles.viewAllLink}>View All</Text>
        </TouchableOpacity>
      </View>

      <UpcomingClassess />


      {/* Upcoming Test */}
      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>Upcoming Tests</Text>
        <TouchableOpacity onPress={() => navigation.navigate('TestScoreScreen')}>
          <Text style={styles.viewAllLink}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Monthly Attendance */}
      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>Attendance</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Attendance')}>
          <Text style={styles.viewAllLink}>View All</Text>
        </TouchableOpacity>
      </View>
      <AttendanceWMScreen />

      {/* Enrolled Batches - Horizontal Slider */}

      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>Enrolled Batches</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Active Courses')}>
          <Text style={styles.viewAllLink}>View All</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <FlatList
          data={batches}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Card style={styles.batchCard}>
              <Card.Content>
                <Text style={styles.batchName}>{item.name}</Text>
                <Text style={styles.batchDetail}>Course: {item.courseIds.name}</Text>
              </Card.Content>
            </Card>
          )}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.primaryOrange
  },
  profileName: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  profileClass: { fontSize: 14, color: '#fff', opacity: 0.8 },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#efefef'
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', },
  infoCard: { margin: 10, backgroundColor: '#fff', borderRadius: 10, elevation: 2, padding: 15 },
  batchCard: { marginRight: 15, marginLeft: 15, marginBottom: 20, backgroundColor: '#fff', borderRadius: 10, elevation: 2, padding: 5, width: wp('90%') },
  batchName: { fontSize: 18, textTransform: 'capitalize', fontWeight: 'bold' },
  batchDetail: { fontSize: 14, color: '#666', marginTop: 5 },
  sectionHead: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#ddd",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#fff'
  },
});

export default HomeScreen;
