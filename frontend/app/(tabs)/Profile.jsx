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
import { ProfilePortion } from "./ProfileScreen";

const Stack = createNativeStackNavigator();

export default function Profile() {

  return (
  <NavigationContainer independent={true}>
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfilePortion}
        options={{title: 'Your Profile'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
  )
}


