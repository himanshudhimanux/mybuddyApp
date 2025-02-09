import React, { useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotices } from "../redux/features/noticeSlice"; // Import action
import { COLORS } from "../../theme";

const NoticeBoard = () => {
  const dispatch = useDispatch();
  const { data: notices, status, error } = useSelector((state) => state.notices);

  useEffect(() => {
    dispatch(fetchNotices());
  }, [dispatch]);

  return (
    <ScrollView style={styles.container}>
      {status === "loading" && <ActivityIndicator size="large" color="#6B21A8" />}
      {status === "failed" && <Text style={styles.error}>{error}</Text>}
      <View style={styles.contentContainer}>
        {notices.map((notice) => (
          <View key={notice._id} style={[styles.noticeCard, { backgroundColor: "#DBEAFE" }]}>
            {notice.notice_img && <Image source={{ uri: notice.notice_img }} style={styles.image} />}
            <Text style={styles.title}>{notice.title}</Text>
            <Text style={styles.n_description}>{notice.description}</Text>
            <Text style={styles.date}>{new Date(notice.createdAt).toDateString()}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 16,
  },
  noticeCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "900",
    color: COLORS.primaryOrange,
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

export default NoticeBoard;
