import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, List } from 'react-native-paper';

const ActiveCourses = () => {

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Course Name</Title>
          <Paragraph style={styles.description}>Description</Paragraph>
        </Card.Content>
        <List.Section>
          <List.Item
            title="Course Fee"
            description={`₹ 6000`}
            left={() => <List.Icon icon="currency-inr" />}
          />
          <List.Item
            title="Duration"
            description="1 Year"
            left={() => <List.Icon icon="calendar" />}
          />
        </List.Section>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  card: {
    elevation: 4,
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    // marginVertical: 10,
    color: '#666',
  },
});

export default ActiveCourses;
