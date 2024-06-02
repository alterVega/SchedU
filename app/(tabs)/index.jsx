import { Image, StyleSheet, Platform } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function HomeScreen() {
  return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#FFFFFF", dark: "#f2dea7" }}
        headerImage={
          <Image
            source={require("@/assets/images/SchedU_logo.png")}
            style={styles.Logo}
          />
      }
      >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome USER_NAME!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Your next event:</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  Logo: {
    height: 230,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
