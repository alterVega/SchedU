import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { AgendaPortion } from "./schedule_components/agenda";
import { CalendarPortion } from "./schedule_components/calendar";
import { StatsPortion } from "./schedule_components/stats";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Agenda, Calendar } from "react-native-calendars";

const Stack = createNativeStackNavigator();

export default function ScheduleScreen() {
  return (
      <NavigationContainer independent = {true}>
        <Stack.Navigator>
        <Stack.Screen
          name="Calendar"
          component={CalendarPortion}
          options={{title: 'Your calendar'}}
        />
        <Stack.Screen name="Agenda" component={AgendaPortion}
        options={{title: "Your Agenda"}} />
    </Stack.Navigator>
      </NavigationContainer>
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
