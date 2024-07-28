import React, { useState, useContext, useEffect } from "react";
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

  // Subtract 8 hours (28800000 milliseconds) from the start and end times
  const adjustedStartTime = new Date(
    new Date(selectedEvent.startTime).getTime() - 8 * 60 * 60 * 1000
  );
  const adjustedEndTime = new Date(
    new Date(selectedEvent.endTime).getTime() - 8 * 60 * 60 * 1000
  );

  const [text, onChangeText] = useState(selectedEvent.name);
  const [text2, onChangeText2] = useState(selectedEvent.desc);
  const [date, setDate] = useState(new Date(selectedEvent.startTime));
  const [startTime, setStartTime] = useState(adjustedStartTime);
  const [endTime, setEndTime] = useState(adjustedEndTime);
  const db = useSQLiteContext();
  const { globalStyle } = useContext(GlobalStyleContext);

  const handleEditEvent = async () => {
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

    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `UPDATE Events SET startTime = ?, endTime = ?, title = ?, description = ? WHERE id = ?;`,
        [
          correctedStartTime.getTime(),
          correctedEndTime.getTime(),
          text,
          text2,
          selectedEvent.id,
        ]
      );
    });

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
            onChange={(event, date) => setDate(date || new Date())}
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
            onChange={(event, time) => setStartTime(time || new Date())}
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
            onChange={(event, time) => setEndTime(time || new Date())}
            style={styles.picker}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.createEventButton}
        onPress={handleEditEvent}
      >
        <Text
          style={[
            styles.buttonText,
            {
              fontFamily: globalStyle.fontFamily,
              color: globalStyle.color,
            },
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
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    borderColor: "#ccc",
  },
  titleInputDesc: {
    height: 100,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    borderColor: "#ccc",
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
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
