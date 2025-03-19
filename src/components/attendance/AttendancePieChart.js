import React from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";

const AttendancePieChart = ({ title, data = [] }) => {
  // ✅ Ensure `data` is always an array before `map()`
  if (!Array.isArray(data) || data.length === 0) {
    return <Text style={{ textAlign: "center", fontSize: 16 }}>Loading...</Text>;
  }

  const chartData = data.map(item => ({
    name: item.label || "Unknown",
    population: item.value || 0,
    color: item.color || "#ccc",
    legendFontColor: "#7F7F7F",
    legendFontSize: 14
  }));

  return (
    <View>
      <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
        {title}
      </Text>
      <PieChart
        data={chartData}
        width={300}
        height={150}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

export default AttendancePieChart;
