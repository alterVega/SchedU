// FontPicker.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const FontPicker = ({ selectedFont, setSelectedFont, fontColor }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: `rgb(${fontColor.r}, ${fontColor.g}, ${fontColor.b})` }]}>
        Select Font:
      </Text>
      <Picker
        selectedValue={selectedFont}
        onValueChange={(itemValue) => setSelectedFont(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Default" value="default" />
        <Picker.Item label="OpenSans-Semibold" value="OpenSans-Semibold" />
        <Picker.Item label="Roboto-Regular" value="Roboto-Regular" />
        <Picker.Item label="SpaceMono-Regular" value="SpaceMono-Regular" />
        <Picker.Item label="Lato-Bold" value="Lato-Bold" />
        <Picker.Item label="Harmond-Condensed" value="Harmond-SemiBoldCondensed" />
        <Picker.Item label="Harmond-Bold" value="Harmond-ExtraBoldExpanded" />
        <Picker.Item label="NeueMetana-Bold" value="NeueMetana-Bold" />
        <Picker.Item label="NeueMetana-Regular" value="NeueMetana-Regular" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center"
  },
  picker: {
    width: 300, // Adjust this if needed
  },
});

export default FontPicker;
