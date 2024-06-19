import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import DateTimePicker from "@react-native-community/datetimepicker";

//new things to install
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { StatusBar } from "expo-status-bar";

const loadDatabase = async () => {
  const dbName = "allEventsDB.db";
  const dbAsset = require("../../../assets/allEventsDB.db");
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

export const EventCreation = ({ navigation }) => {
  const [text, onChangeText] = React.useState("");
  const [text2, onChangeText2] = React.useState("");

  //State for the date picker
  const [date, setDate] = useState(new Date());

  //State for the Start Time
  const [startTime, setStartTime] = useState(new Date());

  //State for End Time
  const [endTime, setEndTime] = useState(new Date());

  //State for database
  const db = SQLite.useSQLiteContext();
  const [dbLoaded, setDbLoaded] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setDate(selectedDate);
    setShowDate(false);
  };

  useEffect(() => {
    loadDatabase()
      .then(() => setDbLoaded(true))
      .catch((error) => console.log(error));
  }, []);

  if (!dbLoaded) {
    return <Text>Loading...</Text>;
  }

  async function getData() {
    const result = await db.getAllAsync(`SELECT * FROM Events`);
    return result;
  }

  //handles adding events into the database
  async function addEvent() {
    //input date
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    //startTime
    const startHours = startTime.getHours();
    const startMinutes = startTime.getMinutes();
    const startSeconds = startTime.getSeconds();
    const startMilliseconds = startTime.getMilliseconds();

    //startTime
    const endHours = endTime.getHours();
    const endMinutes = endTime.getMinutes();
    const endSeconds = endTime.getSeconds();
    const endMilliseconds = endTime.getMilliseconds();

    //Correcting the data before sending into database
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
    db.withTransactionAsync(async () => {
      await db.runAsync(
        `INSERT INTO Events (startTime, endTime, title, description) VALUES (?, ?, ?, ?);`,
        [correctedStartTime.getTime(), correctedEndTime.getTime(), text, text2]
      );
      await getData();
    });
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <ThemedText type="subtitle" style={styles.title}>
          Event
        </ThemedText>
        <TextInput
          style={styles.titleInput}
          onChangeText={onChangeText}
          value={text}
          placeholder="Math Class"
          placeholderTextColor={"grey"}
        />
      </View>
      <View style={styles.container}>
        <ThemedText type="subtitle" style={styles.title}>
          Description
        </ThemedText>
        <TextInput
          style={styles.titleInputDesc}
          onChangeText={onChangeText2}
          value={text2}
          multiline={true}
          placeholder="Lorem ipsum dolor sit amet"
          placeholderTextColor={"grey"}
        />
      </View>
      <View style={styles.container2}>
        <View style={styles.dateTime}>
          <Text style={styles.choose}>Choose Date:</Text>
          <DateTimePicker
            value={date}
            mode={"date"}
            is24Hour={true}
            onChange={(event, date) => setDate(date)}
            style={styles.picker}
          />
        </View>
        <View style={styles.dateTime}>
          <Text style={styles.choose}>Choose Start Time:</Text>
          <DateTimePicker
            value={startTime}
            mode={"time"}
            is24Hour={true}
            onChange={(event, time) => setStartTime(time)}
            style={styles.picker}
          />
        </View>
        <View style={styles.dateTime}>
          <Text style={styles.choose}>Choose End Time:</Text>
          <DateTimePicker
            value={endTime}
            mode={"time"}
            is24Hour={true}
            onChange={(event, time) => setEndTime(time)}
            style={styles.picker}
          />
        </View>
      </View>
      <View style={styles.createEvent}>
        <Button
          onPress={(event) => {
            addEvent();
          }}
          title="Create event"
          color="#841584"
          style={styles.create}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dateTime: {
    flex: 2,
    marginTop: 20,
    alignContent: "center",
  },
  container: {
    marginTop: 40,
  },
  container2: {
    flexDirection: "row",
    flex: 1,
    alignContent: "space-evenly",
    textAlign: "center",
    alignItems: "center",
  },
  titleInput: {
    flex: 3,
    height: 40,
    margin: 25,
    borderWidth: 1,
    padding: 10,
    flexDirection: "row",
  },
  titleInputDesc: {
    flex: 3,
    height: 100,
    margin: 25,
    borderWidth: 1,
    padding: 10,
    flexDirection: "row",
  },
  title: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    fontSize: 20,
    color: "black",
  },
  createEvent: {
    marginTop: 40,
    alignSelf: "center",
    borderWidth: 2,
  },
  picker: {
    flex: 1,
    alignSelf: "left",
    marginTop: 5,
  },
  choose: {
    flex: 1,
    marginLeft: 5,
    fontSize: 20,
  },
});
