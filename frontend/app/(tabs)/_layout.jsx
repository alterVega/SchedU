import { Tabs } from "expo-router";
import React, { Suspense } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SQLiteProvider } from "expo-sqlite";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { StatusBar } from "expo-status-bar";

const loadDatabase = async () => {
  const dbName = "eventsDB.db";
  const dbAsset = require("../../eventsDB.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  //if there is this database, we use it else we create a new one
  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [dbLoaded, setDbLoaded] = React.useState(false);

  React.useEffect(() => {
    loadDatabase()
      .then(() => setDbLoaded(true))
      .catch((error) => console.log(error));
  }, []);

  if (!dbLoaded) {
    return <Text>Loading...</Text>;
  }


  return (
    <Suspense
      fallback={
        <View style={{ flex: 1 }}>
          <ActivityIndicator size={"large"} />
          <Text>Loading Database...</Text>
        </View>
      }
    >
      <SQLiteProvider databaseName="eventsDB.db" useSuspense={true}>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={
                focused ? "calendar-number-sharp" : "calendar-number-outline"
              }
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person-outline" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
    </SQLiteProvider>
    </Suspense>
  );
}
