import React, { useState, Fragment, useCallback, useMemo, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Calendar, CalendarUtils } from "react-native-calendars";
import { StatsPortion } from "./stats";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export const CalendarPortion = ({navigation}) => {
  const [selected, setSelected] = useState('');;

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
        navigation.navigate("Agenda", {selectedDay: day})
      }}
      // Mark specific dates as marked
      markedDates={{
        [selected] : {selected: true, marked: true, selectedColor: 'red'}
      }}
    />
  );
};
