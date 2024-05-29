import React, { useState, Fragment, useCallback, useMemo, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Calendar, CalendarUtils } from "react-native-calendars";
import { StatsPortion } from "./stats";

export function CalendarPortion() {
  const INITIAL_DATE = new Date();

  const getDate = (count) => {
    const date = new Date(INITIAL_DATE);
    const newDate = date.setDate(date.getDate() + count);
    return CalendarUtils.getCalendarDateString(newDate);
  };

  return (
    <View showsVerticalScrollIndicator={false} style={styles.container}>
      <Fragment>
        <Text style={styles.text}>Calendar with multi-period marking</Text>
        <Calendar
          style={styles.calendar}
          current={INITIAL_DATE.toString()}
          markingType={"multi-period"}
          markedDates={{
            [INITIAL_DATE]: {
              periods: [
                { startingDay: true, endingDay: false, color: "green" },
                { startingDay: true, endingDay: false, color: "orange" },
              ],
            },
            [getDate(1)]: {
              periods: [
                { startingDay: false, endingDay: true, color: "green" },
                { startingDay: false, endingDay: true, color: "orange" },
                { startingDay: true, endingDay: false, color: "pink" },
              ],
            },
            [getDate(3)]: {
              periods: [
                { startingDay: true, endingDay: true, color: "orange" },
                { color: "transparent" },
                { startingDay: false, endingDay: false, color: "pink" },
              ],
            },
          }}
        />
      </Fragment>
      <View style={styles.statsContainer}>
        <StatsPortion />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
  calendar: {
    marginBottom: 0,
    marginTop: 3,
    flexDirection: "column",
  },
  statsContainer: {
    flex: 1,
  },
});
