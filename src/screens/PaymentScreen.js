import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeeHistory, processPayment, resetPaymentStatus } from "../redux/features/feeSlice";
import RazorpayCheckout from "react-native-razorpay";

const PaymentScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { feeHistory, loading, paymentStatus, error } = useSelector((state) => state.fees);
  const studentId = useSelector((state) => state.auth.studentId) || route.params?.studentId;

  console.log("fee", feeHistory)

  useEffect(() => {
    if (studentId) {
      dispatch(fetchFeeHistory({ studentId }));
    }
  }, [dispatch, studentId]);

  useEffect(() => {
    if (paymentStatus === "success") {
      Alert.alert("Success", "Payment successful!");
      dispatch(fetchFeeHistory({ studentId })); // Reload Fee History
      dispatch(resetPaymentStatus());
    } else if (paymentStatus === "failed") {
      Alert.alert("Error", "Payment failed. Try again.");
      dispatch(resetPaymentStatus());
    }
  }, [paymentStatus, dispatch, studentId]);

  const handlePayment = async (amount) => {
    try {
      const response = await dispatch(processPayment({ studentId, amount })).unwrap();
      const options = {
        description: "Fee Payment",
        currency: "INR",
        key: "YOUR_RAZORPAY_KEY_ID",
        amount: amount * 100, // INR to paisa
        name: "Your School Name",
        order_id: response.id,
        prefill: { email: "student@example.com", contact: "9999999999", name: "Student Name" },
        theme: { color: "#3399cc" },
      };

      const paymentData = await RazorpayCheckout.open(options);
      Alert.alert("Success", `Payment ID: ${paymentData.razorpay_payment_id}`);
    } catch (error) {
      console.log("Payment Error:", error);
      Alert.alert("Error", "Payment failed. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Fee Payment</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        feeHistory.map((payment, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.text}>Order ID: {payment.transaction_no}</Text>
            <Text style={styles.text}>Amount: ₹{payment.amount}</Text>
            <Text style={styles.text}>Status: {payment.status}</Text>
            {payment.status !== "Paid" && (
              <TouchableOpacity style={styles.payButton} onPress={() => handlePayment(payment.amount)}>
                <Text style={styles.payButtonText}>Pay Now</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
  heading: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  error: { color: "red", textAlign: "center", marginTop: 10 },
  card: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 10 },
  text: { fontSize: 14, marginBottom: 5 },
  payButton: { backgroundColor: "#007AFF", padding: 10, borderRadius: 5, alignItems: "center", marginTop: 10 },
  payButtonText: { color: "#fff", fontWeight: "bold" },
});

export default PaymentScreen;
