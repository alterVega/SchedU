import React, { useState } from "react";
import { View, Button } from "react-native";
import { Calendar, CalendarUtils } from "react-native-calendars";

export const CalendarPortion = ({ navigation }) => {
  const [selected, setSelected] = useState("");

  return (
    <View>
      <Button
        onPress={(event) => {
          navigation.navigate("EventCreation", { selectedDay: event });
        }}
        title="Create event"
        color="#841584"
      />
      <Calendar
        style={{
          borderWidth: 1,
          borderColor: "red",
          height: 700,
        }}
        // Selection of date by the user
        onDayPress={(day) => {
          console.log("selected day", day);
          setSelected(day.dateString);
          navigation.navigate("Agenda", { selectedDay: day });
        }}
        // Mark specific dates as marked
        markedDates={{
          [selected]: { selected: true, marked: true, selectedColor: "red" },
        }}
      />
    </View>
  );
};
