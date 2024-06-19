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

  //reformat data structure to cater to Agenda in react-native-calendars using dictionaries in a specified format
  async function reformatDbToDict() {
    const output = {};
    const dbList = await getData();
    for (let i = 0; i < dbList.length; i++) {
      const strDate = timeToString(dbList[i].startTime);
      if (!output[strDate]) {
        output[strDate] = [
          {
            id: dbList[i].id,
            startTime: dbList[i].startTime,
            endTime: dbList[i].endTime,
            name: dbList[i].title,
            desc: dbList[i].description,
            height: 50,
          },
        ];
      } else {
        output[strDate].push({
          id: dbList[i].id,
          startTime: dbList[i].startTime,
          endTime: dbList[i].endTime,
          name: dbList[i].title,
          desc: dbList[i].description,
          height: 50,
        });
      }
    }
    return output;
  }

  //handles event deletion on Agenda Page
  //currently requires you to go back to calendar page then re-enter Agenda Page to see event is removed after long press. need to fix
  async function deleteEvent(id) {
    db.withTransactionAsync(async () => {
      await db.runAsync(`DELETE FROM Events WHERE id = ?;`, [id]);
      await getData();
    });
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
        onLongPress={() => deleteEvent(item.id)}
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

  const selectedDayDate = route.params.selectedDay;

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={selectedDayDate.dateString}
        renderItem={renderItem}
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
