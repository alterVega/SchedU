import React from "react";
import { StyleSheet, View, Text } from "react-native";

export function StatsPortion() {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.text}>*put something below*</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  text: {
    fontSize: 30,
    textAlign: "center",
  },
});
