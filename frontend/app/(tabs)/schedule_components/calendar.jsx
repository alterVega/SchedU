import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { GlobalStyleContext } from "../../globalStyle";
import { useLoadFonts } from "../../useFonts";
import CustomButton from "../../customButton";
import { useSQLiteContext } from "expo-sqlite/next";

export const CalendarPortion = ({ navigation }) => {
  const [selected, setSelected] = useState("");
  const [markedDates, setMarkedDates] = useState({});
  const [renderKey, setRenderKey] = useState(0);
  const { globalStyle } = useContext(GlobalStyleContext);
  const db = useSQLiteContext();
  const fontsLoaded = useLoadFonts();

  const fetchEvents = async () => {
    const events = await db.getAllAsync("SELECT * FROM Events");
    const marks = {};
    events.forEach((event) => {
      const date = new Date(event.startTime).toISOString().split("T")[0];
      marks[date] = { marked: true, dotColor: globalStyle.color };
    });
    setMarkedDates(marks);
  };

  useEffect(() => {
    fetchEvents();
  }, [db]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchEvents);
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    // Force re-render by updating the key
    setRenderKey((prevKey) => prevKey + 1);
  }, [globalStyle]);

  if (!fontsLoaded) {
    return null; // Or a loading indicator
  }

  return (
    <View style={[styles.container]}>
      <CustomButton
        onPress={() => {
          navigation.navigate("EventCreation", { selectedDay: selected });
        }}
        title="Create event"
        style={{
          fontFamily: globalStyle.fontFamily,
          color: globalStyle.color,
          backgroundColor: "#8ab2f2",
          marginBottom: 5,
        }}
      />
      <Calendar
        key={renderKey}
        style={{
          borderWidth: 2,
          borderColor: "black",
          height: 400,
        }}
        theme={{
          textDayFontFamily: globalStyle.fontFamily,
          textMonthFontFamily: globalStyle.fontFamily,
          textDayHeaderFontFamily: globalStyle.fontFamily,
          textDayFontColor: globalStyle.color,
          monthTextColor: globalStyle.color,
          textSectionTitleColor: globalStyle.color,
          calendarBackground: globalStyle.backgroundColor,
        }}
        markedDates={markedDates}
        onDayPress={(day) => {
          console.log("selected day", day);
          setSelected(day.dateString);
          navigation.navigate("Agenda", { selectedDay: day });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
