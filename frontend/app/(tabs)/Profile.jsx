//updated: remove imports that were redundant

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfilePortion } from "./ProfileScreen";

const Stack = createNativeStackNavigator();

export default function Profile() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="ProfileScreen"
          component={ProfilePortion}
          options={{ title: "Your Profile" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
