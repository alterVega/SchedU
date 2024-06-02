import React, { useState, Fragment, useCallback, useMemo, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Calendar, CalendarUtils } from "react-native-calendars";
import { StatsPortion } from "./stats";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export const CalendarPortion = ({navigation}) => {
  const [selected, setSelected] = useState('');
  const currentDate = '2024-01-01';

  const getDate = (count) => {
    const date = new Date(currentDate);
    const newDate = date.setDate(date.getDate() + count);
    return CalendarUtils.getCalendarDateString(newDate);
  }

  return (
    <Calendar
      style={{
        borderWidth: 1,
        borderColor: 'red',
        height: 700
      }}
      // Selection of date by the user
      onDayPress={day => {
        console.log('selected day', day);
        setSelected(day.dateString);
        navigation.navigate("Agenda")
      }}
      // Mark specific dates as marked
      markedDates={{
        [selected] : {selected: true, marked: true, selectedColor: 'red'}
      }}
    />
  );
};
