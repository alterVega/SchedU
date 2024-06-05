import { Image, StyleSheet, FlatList, Text } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();
export default function HomeScreen() {
  const [data, setData] = useState([]);

  //retrieves the data from mySQL database and sends it here in the form of an array.
  //database name: schedu_db
  useEffect(() => {
    //use your own computer's ip address here. ensure ios device and current computer connected to same local network
    //kevin's laptop ip address is 192.168.0.243.
    //kevin's local port where the list information is stored at is 8001
    //replace both with your own and keep the rest the same
    fetch("http://192.168.0.243:8001/events/")
      .then((res) => res.json())
      .then((events) => setData(events))
      .catch((err) => console.log(err));
  }, []);

  //for testing purposes. it should print out pancakes in the console
  const testing = data[0].description;
  console.log(testing);

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
        <ThemedText type="subtitle">{testing}</ThemedText>
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
