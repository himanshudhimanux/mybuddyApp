import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSessions, fetchAttendance } from '../../redux/features/sessionSlice';

const AttendanceScreen = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const dispatch = useDispatch();
    const { sessions, attendance, loading } = useSelector(state => state.sessions);

    useEffect(() => {
        dispatch(fetchSessions(selectedDate)); // ✅ Select hone par session fetch hoga
    }, [dispatch, selectedDate]);

    return (
        <View style={{ flex: 1, padding: 10 }}>
            {/* 📅 Calendar */}
            <Calendar
                onDayPress={(day) => setSelectedDate(day.dateString)}
                markedDates={{ [selectedDate]: { selected: true, selectedColor: '#4CAF50' } }}
            />

            {/* ⏳ Loading Indicator */}
            {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}

            {/* 📌 Date Wise Sessions */}
            {sessions.length === 0 ? (
                <Text style={{ textAlign: 'center', marginTop: 10 }}>No Sessions Available</Text>
            ) : (
                sessions.map((session) => (
                    <TouchableOpacity
                        key={session.id}
                        onPress={() => dispatch(fetchAttendance(session.id))}
                        style={{
                            padding: 10,
                            marginVertical: 5,
                            borderWidth: 2,
                            borderColor: attendance[session.id]?.attended ? 'green' : 'red',
                            borderRadius: 10
                        }}
                    >
                        <Text>🕒 {session.time} - {session.subject}</Text>
                        <Text>👨‍🏫 {session.teacher}</Text>
                    </TouchableOpacity>
                ))
            )}
        </View>
    );
};

export default AttendanceScreen;
