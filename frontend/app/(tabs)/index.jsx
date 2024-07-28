import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { AgendaPortion } from "./schedule_components/agenda";
import { CalendarPortion } from "./schedule_components/calendar";
import { EventCreation } from "./schedule_components/EventCreation";
import { EventDetails } from "./schedule_components/EventDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalStyleContext } from "../globalStyle";

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
        <Stack.Screen
          name="EventDetails"
          component={EventDetails}
          options={{title: "Edit Event"}}
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
});

