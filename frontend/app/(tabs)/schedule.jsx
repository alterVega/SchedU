import React, { Suspense } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { AgendaPortion } from "./schedule_components/agenda";
import { CalendarPortion } from "./schedule_components/calendar";
import { EventCreation } from "./schedule_components/EventCreation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SQLiteProvider } from "expo-sqlite";

const Stack = createNativeStackNavigator();

export default function ScheduleScreen() {
  return (
    <Suspense
      fallback={
        <View style={{ flex: 1 }}>
          <ActivityIndicator size={"large"} />
          <Text>Loading Database...</Text>
        </View>
      }
    >
      <SQLiteProvider databaseName="allEventsDB.db" useSuspense={true}>
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
      </SQLiteProvider>
    </Suspense>
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
