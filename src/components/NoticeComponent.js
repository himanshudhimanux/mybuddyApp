import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotices } from "../redux/features/noticeSlice"; // Import action
import { COLORS } from "../../theme";

const { width } = Dimensions.get("window");

const NoticeComponent = () => {
    const dispatch = useDispatch();
    const { data: notices = [], status, error } = useSelector((state) => state.notices);

    useEffect(() => {
        dispatch(fetchNotices());
    }, [dispatch]);

    const renderItem = ({ item }) => {
        if (!item) return null; // Prevent undefined errors

        return (
            <View style={styles.noticeCard}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.n_description}>{item.description}</Text>
                <Text style={styles.date}>{new Date(item.createdAt).toDateString()}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {status === "loading" && <ActivityIndicator size="large" color={COLORS.primaryOrange} />}
            {status === "failed" && <Text style={styles.error}>{error}</Text>}
            {status === "succeeded" && notices.length > 0 && (
                <Carousel
                    loop
                    width={width}
                    height={200}
                    autoPlay={true}
                    autoPlayInterval={5000}
                    data={notices}
                    scrollAnimationDuration={3000}
                    renderItem={({ item }) => renderItem({ item })}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgColor,
        justifyContent: "center",
        alignItems: "center",
    },
    noticeCard: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        width: width * 0.9,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        marginTop: 15,
        marginLeft: 15
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.primaryOrange,
        marginBottom: 15,
    },
    n_description: {
        fontSize: 14,
        color: "#333",
    },
    date: {
        fontSize: 14,
        color: "#6B7280",
    },
    error: {
        color: "red",
        textAlign: "center",
        marginTop: 20,
    },
});

export default NoticeComponent;
