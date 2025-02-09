import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const FeeScreen = () => {
  const [expanded, setExpanded] = useState({
    january: true,
    december: false,
    november: false,
    october: false,
    september: false,
  });

  const toggleExpand = (month) => {
    setExpanded((prevState) => ({
      ...prevState,
      [month]: !prevState[month],
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Fee Details</Text>

      {/* January Fee Card */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => toggleExpand('january')}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>School Fee for January</Text>
          <Text style={styles.cardAmount}>₹16,600</Text>
        </View>
        <View style={styles.cardDate}>
          <Text style={styles.cardDateText}>06 May</Text>
        </View>
        {expanded.january && (
          <View style={styles.cardDetails}>
            <View style={styles.detailRow}>
              <Text>Total Fee</Text>
              <Text style={styles.bold}>₹14,500</Text>
            </View>
            <View style={styles.detailRow}>
              <Text>Extra Fee</Text>
              <Text style={styles.bold}>₹2,000</Text>
            </View>
            <View style={styles.detailRow}>
              <Text>Late Charges</Text>
              <Text style={styles.bold}>₹600</Text>
            </View>
            <View style={styles.detailRow}>
              <Text>Discount (20%)</Text>
              <Text style={styles.bold}>-₹500</Text>
            </View>
            <View style={styles.detailRow}>
              <Text>Paid Fee</Text>
              <Text style={styles.bold}>₹16,600</Text>
            </View>
            <View style={styles.paidBadge}>
              <Text style={styles.paidText}>Paid</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>

      {/* December Fee Card */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => toggleExpand('december')}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>School Fee for December</Text>
          <Text style={styles.cardAmount}>₹14,500</Text>
        </View>
        <View style={styles.cardDate}>
          <Text style={styles.cardDateText}>06 May</Text>
        </View>
        {expanded.december && (
          <View style={styles.cardDetails}>
            {/* Add details for December if needed */}
          </View>
        )}
        <View style={styles.paidBadge}>
          <Text style={styles.paidText}>Paid</Text>
        </View>
      </TouchableOpacity>

      {/* Repeat similar structure for November, October, and September */}
      {['november', 'october', 'september'].map((month) => (
        <TouchableOpacity
          key={month}
          style={styles.card}
          onPress={() => toggleExpand(month)}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>School Fee for {month.charAt(0).toUpperCase() + month.slice(1)}</Text>
            <Text style={styles.cardAmount}>₹14,500</Text>
          </View>
          <View style={styles.cardDate}>
            <Text style={styles.cardDateText}>06 May</Text>
          </View>
          {expanded[month] && (
            <View style={styles.cardDetails}>
              {/* Add details for each month */}
            </View>
          )}
          <View style={styles.paidBadge}>
            <Text style={styles.paidText}>Paid</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#dbeafe',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  cardAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardDate: {
    alignItems: 'flex-end',
  },
  cardDateText: {
    fontSize: 14,
    color: '#6b7280',
  },
  cardDetails: {
    marginTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  paidBadge: {
    marginTop: 16,
    backgroundColor: '#10b981',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  paidText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default FeeScreen;
