import React, { useEffect } from "react";
import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveFees } from "../redux/features/studentFeeSlice";

const ActiveFeeScreen = () => {
    const dispatch = useDispatch();
    const primaryStudent = useSelector(state => state.students.primaryStudent);
    const { activeFees, loading, error } = useSelector((state) => state.studentFees);

    console.log("Active Fee:", activeFees);

    useEffect(() => {
        if (primaryStudent?._id) {
            dispatch(fetchActiveFees(primaryStudent._id))
                .catch((err) => console.error("Fetch Active Fees Error:", err));
        }
    }, [dispatch, primaryStudent]);

    if (loading) return <ActivityIndicator size="large" color="blue" />;
    if (error) return <Text style={styles.error}>{error}</Text>;

    return (
        <View style={styles.container}>

<FlatList
      data={(activeFees || []).sort(
        (a, b) => new Date(b.enrollment_date) - new Date(a.enrollment_date)
      )}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.feeCard}>
          <View style={styles.row}>
            <Text style={styles.boldText}>Batch:</Text>
            <Text style={styles.dataText}>{item.batch_name ?? "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.boldText}>Total Fees:</Text>
            <Text style={styles.dataText}>₹{item.total_fees ?? 0}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.boldText}>Paid Fees:</Text>
            <Text style={styles.dataText}>₹{item.paid_fees ?? 0}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.boldText}>Outstanding Fees:</Text>
            <Text style={styles.dataText}>₹{item.outstanding_fees ?? 0}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.boldText}>Enrollment Date:</Text>
            <Text style={styles.dataText}>
              {item.enrollment_date
                ? new Date(item.enrollment_date).toLocaleDateString()
                : "N/A"}
            </Text>
          </View>

          {(item.outstanding_fees ?? 0) > 0 && (
            <View style={styles.buttonContainer}>
              <Button title="Pay Now" onPress={() => handlePayNow(item._id)} />
            </View>
          )}
        </View>
      )}
    />



        </View>
    );
};

const handlePayNow = (feeId) => {
    alert(`Redirecting to payment for fee ID: ${feeId}`);
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    error: { color: "red", textAlign: "center" },
    feeCard: {
        backgroundColor: "#fff",
        padding: 12,
        marginVertical: 6,
        marginHorizontal: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
      },
      row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 4,
      },
      boldText: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#333",
      },
      dataText: {
        fontSize: 16,
        color: "#555",
      },
      buttonContainer: {
        marginTop: 10,
        alignItems: "center",
      },
});

export default ActiveFeeScreen;
