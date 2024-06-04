import React, { useState, Fragment, useCallback, useMemo, useRef } from "react";
import { StyleSheet, View, Text, SafeAreaView, TextInput, Button} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export const EventCreation = ({navigation}) => {
    const [text, onChangeText] = React.useState('');
    const [number, onChangeNumber] = React.useState('');
    return (
    <SafeAreaView>
    <ThemedText type="subtitle">Title of event</ThemedText>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <ThemedText type="subtitle">Start-Time</ThemedText>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        keyboardType="numeric"
      />
      <ThemedText type="subtitle">End-Time</ThemedText>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        keyboardType="numeric"
      />
      <Button
      onPress={event => {navigation.navigate("Agenda", {selectedDay: event})}}
      title="Create event"
      color="#841584"
/>
    </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
      },
    input: {
      height: 70,
      margin: 25,
      borderWidth: 1,
      padding: 10,
      fontSize: 20
    },
  });
