import React, { useEffect, useState, useContext } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Agenda } from "react-native-calendars";
import { Card } from "react-native-paper";
import { useSQLiteContext } from "expo-sqlite/next";
import { GlobalStyleContext } from "../../globalStyle";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const formatTime = (time) => {
  const date = new Date(time);
  // Convert from UTC to Singapore Time
  const singaporeTime = new Date(date.getTime() - 8 * 60 * 60 * 1000);
  return singaporeTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const AgendaPortion = ({ route, navigation }) => {
  const [items, setItems] = useState({});
  const [refresh, setRefresh] = useState(false); // State to trigger re-render
  const db = useSQLiteContext();
  const { globalStyle } = useContext(GlobalStyleContext); // Access globalStyle

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

  async function deleteEvent(id) {
    await db.withTransactionAsync(async () => {
      await db.runAsync(`DELETE FROM Events WHERE id = ?;`, [id]);
      const updatedItems = await reformatDbToDict();
      setItems(updatedItems); // Update state to reflect changes
    });
  }

  useEffect(() => {
    loadItems();
  }, [db, refresh]);

  const loadItems = () => {
    reformatDbToDict().then((x) => setItems(x));
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>You have no events for the day</Text>
        <TouchableOpacity onPress={() => navigation.navigate("EventCreation")}>
          <Text style={styles.createEventText}>Create a new event</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{ marginRight: 10, marginTop: 17 }}
        onLongPress={() => {
          deleteEvent(item.id);
          setRefresh(!refresh); // Trigger re-render
        }}
      >
        <Card
          style={[
            styles.card,
            { backgroundColor: globalStyle.backgroundColor },
          ]}
        >
          <Card.Content style={styles.cardContent}>
            <View style={styles.timeContainer}>
              <Text
                style={[
                  styles.time,
                  {
                    fontFamily: globalStyle.fontFamily,
                    color: globalStyle.color,
                  },
                ]}
              >
                {formatTime(item.startTime)}
              </Text>
              <Text
                style={[
                  styles.time,
                  {
                    fontFamily: globalStyle.fontFamily,
                    color: globalStyle.color,
                  },
                ]}
              >
                {formatTime(item.endTime)}
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text
                style={[
                  styles.text,
                  {
                    fontFamily: globalStyle.fontFamily,
                    color: globalStyle.color,
                  },
                ]}
              >
                {item.name}
              </Text>
              <Text
                style={[
                  styles.description,
                  {
                    fontFamily: globalStyle.fontFamily,
                    color: globalStyle.color,
                  },
                ]}
              >
                {item.desc}
              </Text>
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
        renderEmptyDate={renderEmptyDate}
        showClosingKnob={true}
        pastScrollRange={12}
        futureScrollRange={12}
        renderEmptyData={() => (
          <View style={styles.emptyDate}>
            <Text>You have no events for the day</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("EventCreation")}
            >
              <Text style={styles.createEventText}>Create a new event</Text>
            </TouchableOpacity>
          </View>
        )}
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
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  description: {
    marginTop: 5,
    fontSize: 14,
    paddingLeft: 10,
  },
  card: {
    backgroundColor: "#f8f9fa",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  timeContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  detailsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  emptyDate: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  createEventText: {
    marginTop: 10,
    color: "blue",
  },
});
