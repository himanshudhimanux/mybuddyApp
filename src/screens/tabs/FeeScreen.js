import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeeHistory } from "../../redux/features/feeSlice";
import { useNavigation } from "@react-navigation/native";


const FeeScreen = ({ route }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { feeHistory = [], loading, error } = useSelector((state) => state.fees);
    
    // Get feeId dynamically from Redux or route params
    const feeId = useSelector((state) => state.auth.feeId) || route.params?.feeId;
    console.log("feeId from Redux:", feeId);

    useEffect(() => {
        if (feeId) {
            dispatch(fetchFeeHistory({ feeId }));
        }
    }, [dispatch, feeId]);

    const handleDownloadReceipt = (transactionNo) => {
        Alert.alert("Downloading Receipt", `Receipt for ${transactionNo} is being downloaded.`);
        // Actual download logic here
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity style={styles.inactiveTab}
                    onPress={() => navigation.navigate('Active Courses')}
                ><Text>Active Courses</Text></TouchableOpacity>
                <TouchableOpacity style={styles.activeTab}><Text style={styles.activeTabText}>Payment History</Text></TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : feeHistory.length > 0 ? (
                <ScrollView style={styles.paymentList}>
                    {feeHistory.map((payment, index) => (
                        <View key={index} style={styles.paymentCard}>
                            <Text style={styles.orderId}>Order ID: {payment.transaction_no}</Text>
                            <Text style={styles.paymentDetail}><Text style={styles.bold}>Date of payment:</Text> {new Date(payment.create_datetime).toDateString()}</Text>
                            <Text style={styles.paymentDetail}><Text style={styles.bold}>Mode of payment:</Text> {payment.mode_of_payment}</Text>
                            <Text style={styles.paymentAmount}>{`₹ ${payment.amount}`}</Text>
                            <View style={styles.statusContainer}>
                                <Text style={[styles.status, payment.status === "Paid" ? styles.success : styles.failed]}>
                                    {payment.status}
                                </Text>
                            </View>
                            {payment.status === "Paid" && (
                                <TouchableOpacity style={styles.downloadButton} onPress={() => handleDownloadReceipt(payment.transaction_no)}>
                                    <Icon name="download" size={16} color="#007AFF" />
                                    <Text style={styles.downloadText}> Download Receipt</Text>
                                </TouchableOpacity>
                            )}
                            {payment.status === "Failed" && (
                                <Text style={styles.refundNotice}>Any amount, if deducted, will be automatically refunded to your original mode of payment.</Text>
                            )}
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <Text style={{ textAlign: "center", marginTop: 20 }}>No fee history available.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F5F5F5" },
    tabContainer: { flexDirection: "row", justifyContent: "space-around", padding: 10, backgroundColor: "#fff" },
    activeTab: { padding: 10, backgroundColor: "#007AFF", borderRadius: 5 },
    activeTabText: { color: "#fff", fontWeight: "bold" },
    inactiveTab: { padding: 10 },
    loader: { marginTop: 20 },
    errorText: { textAlign: "center", color: "red", marginTop: 20 },
    paymentList: { padding: 10 },
    paymentCard: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 10 },
    orderId: { fontSize: 14, fontWeight: "bold" },
    paymentDetail: { fontSize: 14, marginTop: 5 },
    bold: { fontWeight: "bold" },
    paymentAmount: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
    statusContainer: { position: "absolute", top: 15, right: 15 },
    status: { padding: 5, borderRadius: 5, fontSize: 12 },
    success: { backgroundColor: "#E6F4EA", color: "#1B5E20" },
    failed: { backgroundColor: "#FFEBEE", color: "#B71C1C" },
    downloadButton: { flexDirection: "row", alignItems: "center", marginTop: 10 },
    downloadText: { color: "#007AFF", marginLeft: 5 },
    refundNotice: { fontSize: 12, color: "#B71C1C", marginTop: 5 }
});

export default FeeScreen;
