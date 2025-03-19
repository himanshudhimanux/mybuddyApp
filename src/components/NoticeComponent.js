import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotices } from "../redux/features/noticeSlice"; // Import action
import { COLORS } from "../../theme";
import { Image } from "react-native-svg";
import Icon from 'react-native-vector-icons/FontAwesome6';


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
                {item.notice_img && <Image source={{ uri: item.notice_img }} style={styles.image} />}
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.n_description}>{item.description}</Text>
                <Text style={styles.date}><Icon name="clock" /> {new Date(item.createdAt).toDateString()}</Text>
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
                    height={170}
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
    image: {
        width: "100%",
        height: 100,
        borderRadius: 8,
        marginBottom: 8,
      },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.black,
        marginBottom: 5,
    },
    n_description: {
        fontSize: 14,
        marginBottom: 5,
        color: "grey",
        lineHeight: 20
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
