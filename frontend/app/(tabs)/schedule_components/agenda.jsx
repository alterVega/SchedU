import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Agenda } from "react-native-calendars";
import { Card, Avatar } from "react-native-paper";
import { useSQLiteContext } from "expo-sqlite/next";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

export const AgendaPortion = ({ route }) => {
  const [items, setItems] = useState({});
  const db = useSQLiteContext();

  async function getData() {
    const result = await db.getAllAsync(`SELECT * FROM Events`);
    return result;
  }

  async function reformatDbToDict() {
    const output = {};
    const dbList = await getData();
    for (let i = 0; i < dbList.length; i++) {
      const strDate = timeToString(dbList[i].startTime);
      if (!output[strDate]) {
        output[strDate] = [{ name: dbList[i].title, height: 50 }];
      } else {
        output[strDate].push({ name: dbList[i].title, height: 50 });
      }
    }
    return output;
  }

  useEffect(() => {
    loadItems();
  }, [db]);

  const loadItems = () => {
    reformatDbToDict().then((x) => setItems(x));
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{ marginRight: 10, marginTop: 17 }}
      >
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.text}>{item.name}</Text>
              <Avatar.Text label="J" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const selectedDayDate = route.params.selectedDay;

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={selectedDayDate.dateString}
        renderItem={renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
        showClosingKnob={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 15,
  },
});
