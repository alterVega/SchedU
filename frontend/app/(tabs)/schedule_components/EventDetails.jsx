import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSQLiteContext } from "expo-sqlite/next";
import { GlobalStyleContext } from "../../globalStyle";

export const EventDetails = ({ navigation, route }) => {
  const selectedEvent = route.params.selectedItem;
  const [text, onChangeText] = useState(selectedEvent.name);
  const [text2, onChangeText2] = useState(selectedEvent.desc);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const db = useSQLiteContext();

  const { globalStyle } = useContext(GlobalStyleContext);

  const handleAddEvent = async () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const startHours = startTime.getHours();
    const startMinutes = startTime.getMinutes();
    const startSeconds = startTime.getSeconds();
    const startMilliseconds = startTime.getMilliseconds();
    const endHours = endTime.getHours();
    const endMinutes = endTime.getMinutes();
    const endSeconds = endTime.getSeconds();
    const endMilliseconds = endTime.getMilliseconds();

    const correctedStartTime = new Date(
      Date.UTC(
        year,
        month,
        day,
        startHours,
        startMinutes,
        startSeconds,
        startMilliseconds
      )
    );
    const correctedEndTime = new Date(
      Date.UTC(
        year,
        month,
        day,
        endHours,
        endMinutes,
        endSeconds,
        endMilliseconds
      )
    );
    await db.runAsync(
      `DELETE FROM Events
      WHERE id = ?;`, [selectedEvent.id]);

    await db.runAsync(
      `INSERT INTO Events (startTime, endTime, title, description, completed) VALUES (?, ?, ?, ?, ?);`,
      [correctedStartTime.getTime(), correctedEndTime.getTime(), text, text2,'FALSE'])

    navigation.navigate("Calendar");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <ThemedText
          type="subtitle"
          style={[
            styles.title,
            { fontFamily: globalStyle.fontFamily, color: globalStyle.color },
          ]}
        >
          Event
        </ThemedText>
        <TextInput
          style={styles.titleInput}
          onChangeText={onChangeText}
          value={text}
          placeholder={selectedEvent.name}
          placeholderTextColor={"grey"}
        />
      </View>
      <View style={styles.container}>
        <ThemedText
          type="subtitle"
          style={[
            styles.title,
            { fontFamily: globalStyle.fontFamily, color: globalStyle.color },
          ]}
        >
          Description
        </ThemedText>
        <TextInput
          style={styles.titleInputDesc}
          onChangeText={onChangeText2}
          value={text2}
          multiline={true}
          placeholder={selectedEvent.desc}
          placeholderTextColor={"grey"}
        />
      </View>
      <View style={styles.container2}>
        <View style={styles.dateTime}>
          <Text
            style={[
              styles.choose,
              { fontFamily: globalStyle.fontFamily, color: globalStyle.color },
            ]}
          >
            Choose Date:
          </Text>
          <DateTimePicker
            value={date}
            mode={"date"}
            is24Hour={true}
            onChange={(event, date) => setDate(date)}
            style={styles.picker}
          />
        </View>
        <View style={styles.dateTime}>
          <Text
            style={[
              styles.choose,
              { fontFamily: globalStyle.fontFamily, color: globalStyle.color },
            ]}
          >
            Choose Start Time:
          </Text>
          <DateTimePicker
            value={startTime}
            mode={"time"}
            is24Hour={true}
            onChange={(event, time) => setStartTime(time)}
            style={styles.picker}
          />
        </View>
        <View style={styles.dateTime}>
          <Text
            style={[
              styles.choose,
              { fontFamily: globalStyle.fontFamily, color: globalStyle.color },
            ]}
          >
            Choose End Time:
          </Text>
          <DateTimePicker
            value={endTime}
            mode={"time"}
            is24Hour={true}
            onChange={(event, time) => setEndTime(time)}
            style={styles.picker}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.createEventButton}
        onPress={handleAddEvent}
      >
        <Text
          style={[
            styles.buttonText,
            { fontFamily: globalStyle.fontFamily, color: globalStyle.color },
          ]}
        >
          Edit Event
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
  },
  dateTime: {
    flex: 1,
    margin: 10,
  },
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  container2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  titleInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  titleInputDesc: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
    color: "Black",
  },
  createEventButton: {
    backgroundColor: "#8ab2f2",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  picker: {
    width: "100%",
  },
  choose: {
    fontSize: 16,
    marginBottom: 5,
  },
});