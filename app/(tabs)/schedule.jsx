import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { AgendaPortion } from "./schedule_components/agenda";
import { CalendarPortion } from "./schedule_components/calendar";
import { StatsPortion } from "./schedule_components/stats";

export default function ScheduleScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <CalendarPortion />
      </View>
      <View style={styles.agendaContainer}>
        <AgendaPortion />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  agendaContainer: {
    flex: 3,
  },
  calendarContainer: {
    flex: 2,
  },
});
