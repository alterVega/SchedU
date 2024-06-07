import React, { useState, Fragment, useCallback, useMemo, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import DateTimePicker from '@react-native-community/datetimepicker';

export const EventCreation = ({ navigation }) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [date2, setDate2] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [mode2, setMode2] = useState('date');
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [text, onChangeText] = React.useState('');
  const [text2, onChangeText2] = React.useState('');
  const [number, onChangeNumber] = React.useState('');
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow2(false);
    setDate2(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showMode2 = (currentMode) => {
    setShow2(true);
    setMode2(currentMode);
  };
  
  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const showTimepicker2 = () => {
    showMode2('time');
  };

  return (
    <ScrollView>
    <View style={styles.container}>
    <ThemedText type="subtitle" style={styles.Eventtitle}>Event</ThemedText>
      <TextInput
        style={styles.titleInput}
        onChangeText={onChangeText}
        value={text}
      />
    </View>
    <View style={styles.container2}>
    <ThemedText type="subtitle" style={styles.title}>Description</ThemedText>
      <TextInput
        style={styles.titleInputDesc}
        onChangeText={onChangeText2}
        value={text2}
        multiline={true}
      />
    </View>
    <View>
      <Button onPress={showDatepicker} title="Select date" />
      <Button onPress={showTimepicker} title="Select start-time" />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
          style={styles.selectTime}
        />
      )}
    </View>
    <View style={styles.endTime}>
    <Button onPress={showTimepicker2} title="Select end-time" />
      {show2 && (
        <DateTimePicker
          testID="dateTimePicker2"
          value={date2}
          mode={mode2}
          is24Hour={true}
          onChange={onChange2}
          style={styles.selectTime}
        />
      )}
    </View>
    <View style={styles.createEvent}>
    <Button
      onPress={event => {navigation.navigate("Agenda", {selectedDate: date, selectedEndTime: date2 })}}
      title="Create event"
      color="#841584"
      style={styles.create}
    />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    gap: 30
  },
  container: {
    flex: 2,
    marginTop: 20,
    flexDirection: "row",
  },
  container2: {
    marginTop: 40
  },
  titleInput: {
    flex: 3,
    height: 40,
    margin: 25,
    borderWidth: 1,
    padding: 10,
    flexDirection: "row"
  },
  titleInputDesc: {
    flex: 3,
    height: 100,
    margin: 25,
    borderWidth: 1,
    padding: 10,
    flexDirection: "row"
  },
  title: {
    flex: 1,
    flexDirection: "row",
    fontSize: 20,
    alignSelf: "center"
  },
  Eventtitle: {
    flex: 1,
    flexDirection: "row",
    fontSize: 20,
    marginLeft: 20,
    marginTop: 30
  },
  selectTimeButton: {
    flex: 1,
    height: 40,
    margin: 25,
    padding: 10,
  },
  selectTime: {
    alignSelf: "center"
  },
  endTime: {
    marginTop: 40
  },
  createEvent: {
    marginTop: 40,
    alignSelf: 'center',
    borderWidth: 2
  }
});
