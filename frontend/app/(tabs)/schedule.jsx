import React, { Suspense } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { AgendaPortion } from "./schedule_components/agenda";
import { CalendarPortion } from "./schedule_components/calendar";
import { EventCreation } from "./schedule_components/EventCreation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SQLiteProvider } from "expo-sqlite";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

export default function ScheduleScreen() {

  return (
    <NavigationContainer independent={true}>
          <Stack.Navigator>
            <Stack.Screen
              name="Calendar"
              component={CalendarPortion}
              options={{ title: "Your calendar" }}
            />
            <Stack.Screen
              name="Agenda"
              component={AgendaPortion}
              options={{ title: "Your Agenda" }}
            />
            <Stack.Screen
              name="EventCreation"
              component={EventCreation}
              options={{ title: "Create an Event" }}
            />
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
